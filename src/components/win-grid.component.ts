import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GridColorScheme} from '../models/grid/grid-color-scheme';
import {GridElement} from '../models/grid/grid-element';
import {GridLayout} from '../models/grid/grid-layout';
import {GridRange} from '../models/grid/grid-range';
import {GridSquare} from '../models/grid/grid-square';

@Component({
  selector: 'win-grid',
  templateUrl: './win-grid.component.html',
  styleUrls: ['./win-grid.component.css']
})
export class WinGridComponent implements OnInit {

  @Input('columns') TOTAL_COLUMNS: number = 1;
  @Input('rows') TOTAL_ROWS: number = 1;
  @Input('squareSize') SQUARE_SIZE: number = 20;
  @Input('lineSize') LINE_SIZE: number = 1;
  @Input('lineColor') LINE_COLOR: string = '#CCCCCC';
  @Input('gridColor') GRID_COLOR: string = '#FFFFFF';
  @Input('colorScheme') colorScheme: GridColorScheme;

  @Output() initialized: EventEmitter<boolean> = new EventEmitter();
  @Output() elementSelected: EventEmitter<GridElement> = new EventEmitter();
  @Output() layoutUpdated: EventEmitter<GridLayout> = new EventEmitter();

  private canvas;
  private ctx;

  private creating: boolean = false;
  private dragging: boolean = false;

  private elementInCreation: GridElement;
  private draggingStartSquare: GridSquare;
  private gridLayout: GridLayout;

  private stylePaddingLeft: number;
  private stylePaddingTop: number;
  private styleBorderLeft: number;
  private styleBorderTop: number;

  public squares: GridSquare[][] = [];

  ngOnInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById('grid-canvas');
    this.ctx = this.canvas.getContext('2d');

    if (document.defaultView && document.defaultView.getComputedStyle) {
      this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['paddingLeft'], 10) || 0;
      this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['paddingTop'], 10) || 0;
      this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['borderLeftWidth'], 10) || 0;
      this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['borderTopWidth'], 10) || 0;
    }

    this.canvas.width = this.TOTAL_COLUMNS * this.SQUARE_SIZE;
    this.canvas.height = this.TOTAL_ROWS * this.SQUARE_SIZE;

    this.initializeSquares();
    this.drawGrid();

    let currentState = this;

    /**
     * When the user clicks, either start dragging to hover highlight squares or fill
     * a range of selected squares.
     */
    this.canvas.addEventListener('mousedown', function (e) {
      if(!currentState.creating) {
        return;
      }

      let square: GridSquare = currentState.calculateSquare(e);

      if (currentState.dragging) {
        let square: GridSquare = currentState.calculateSquare(e);

        if (square.highlightState === GridSquare.FULL_HIGHLIGHT) {
          let pts = currentState.determineEndPoints(square, currentState.draggingStartSquare);

          currentState.clearUnnecessaryHighlights(pts, true);
        }
        else {
          currentState.addRangeToElementInCreation(currentState.draggingStartSquare, square);
        }

        currentState.dragging = false;
        currentState.draggingStartSquare = null;
      }
      else if (square.highlightState !== GridSquare.FULL_HIGHLIGHT) {
        currentState.highlightSquare(square);
        currentState.dragging = true;
        currentState.draggingStartSquare = square;
      }
    }, true);

    /**
     * If dragging, highlight additional squares when the mouse moves.
     */
    this.canvas.addEventListener('mousemove', function (e) {
      if (currentState.dragging) {
        let square: GridSquare = currentState.calculateSquare(e);
        currentState.highlightRange(currentState.draggingStartSquare, square);
      }
    }, true);

    /**
     * If a user double clicks on a range, emit an event so an action can be taken.
     */
    this.canvas.addEventListener('dblclick', function (e) {
      if (!currentState.dragging) {
        let square: GridSquare = currentState.calculateSquare(e);

        if (square.highlightState === GridSquare.FULL_HIGHLIGHT) {
          currentState.selectElement(e);
        }
      }
    }, true);

    /**
     * Clear the selection if the user is dragging but hits the escape key.
     */
    this.canvas.addEventListener('keydown', function (e) {
      if (e.keyCode === 27) {
        currentState.dragging = false;
        currentState.draggingStartSquare = null;
        currentState.clearUnnecessaryHighlights({
          startColumn: 1,
          startRow: 1,
          endColumn: currentState.TOTAL_COLUMNS,
          endRow: currentState.TOTAL_ROWS
        }, true);
      }
    }, true);

    this.initialized.emit(true);
  }

  /**
   * Initialize the two dimensional array of square objects that represents the grid.
   */
  private initializeSquares(): void {
    for (let col = 1; col <= this.TOTAL_COLUMNS; col++) {
      this.squares[col - 1] = [];

      for (let row = 1; row <= this.TOTAL_ROWS; row++) {
        let square = new GridSquare(col, row, this.SQUARE_SIZE);
        this.squares[col - 1].push(square);
      }
    }
  }

  /**
   * Calculate which square is being clicked.
   *
   * @param {MouseEvent} e
   * @returns {GridSquare}
   */
  private calculateSquare(e: MouseEvent): GridSquare {
    let mouse = this.getMouse(e);
    let column = Math.ceil(mouse.x / this.SQUARE_SIZE);
    let row = Math.ceil(mouse.y / this.SQUARE_SIZE);

    return this.squares[column - 1][row - 1];
  }

  /**
   * Highlight a single square square.
   *
   * @param {GridSquare} square
   */
  private highlightSquare(square: GridSquare): void {
    let highlightColor: string = this.colorScheme.hoverColor;

    if (square.highlightState === GridSquare.FULL_HIGHLIGHT) {
      return;
    }

    if (square.highlightState === GridSquare.HOVER_HIGHLIGHT) {
      highlightColor = this.GRID_COLOR;
      square.highlightState = GridSquare.NO_HIGHLIGHT;
    }
    else {
      square.highlightState = GridSquare.HOVER_HIGHLIGHT;
    }

    this.fillSquare(square, highlightColor);
  }

  /**
   * Highlight an entire rectangular range of squares.
   *
   * @param {GridSquare} startSquare
   * @param {GridSquare} endSquare
   */
  private highlightRange(startSquare: GridSquare, endSquare: GridSquare): void {
    let pts = this.determineEndPoints(startSquare, endSquare);

    this.clearUnnecessaryHighlights(pts, false);

    for (let column = pts.startColumn; column <= pts.endColumn; column++) {
      for (let row = pts.startRow; row <= pts.endRow; row++) {
        let square: GridSquare = this.squares[column - 1][row - 1];

        if (square !== this.draggingStartSquare && square.highlightState !== GridSquare.HOVER_HIGHLIGHT) {
          this.highlightSquare(square);
        }
      }
    }
  }

  /**
   * Create a new range on the grid.
   *
   * @param {GridSquare} startSquare
   * @param {GridSquare} endSquare
   */
  private createGridRange(startSquare: GridSquare, endSquare: GridSquare): GridRange {
    let pts = this.determineEndPoints(startSquare, endSquare);

    for (let column = pts.startColumn; column <= pts.endColumn; column++) {
      for (let row = pts.startRow; row <= pts.endRow; row++) {
        let square: GridSquare = this.squares[column - 1][row - 1];

        if (square.highlightState === GridSquare.FULL_HIGHLIGHT) {
          this.dragging = false;
          this.draggingStartSquare = null;
          this.clearUnnecessaryHighlights(pts, true);
          return;
        }
      }
    }

    let square: GridSquare = this.squares[pts.startColumn - 1][pts.startRow - 1];

    let x: number = square.x + this.LINE_SIZE;
    let y: number = square.y + this.LINE_SIZE;
    let w: number = ((pts.endColumn - pts.startColumn + 1) * this.SQUARE_SIZE) - this.LINE_SIZE * 2;
    let h: number = ((pts.endRow - pts.startRow + 1) * this.SQUARE_SIZE) - this.LINE_SIZE * 2;

    this.ctx.fillStyle = this.colorScheme.highlightColor;
    this.ctx.fillRect(x, y, w, h);

    for (let column = pts.startColumn; column <= pts.endColumn; column++) {
      for (let row = pts.startRow; row <= pts.endRow; row++) {
        let square: GridSquare = this.squares[column - 1][row - 1];

        square.highlightState = GridSquare.FULL_HIGHLIGHT;
      }
    }

    return new GridRange(pts.startColumn, pts.startRow, pts.endColumn - pts.startColumn + 1, pts.endRow - pts.startRow + 1);
  }

  /**
   * Create a range and add it to the current element in creation.
   *
   * @param {GridSquare} startSquare
   * @param {GridSquare} endSquare
   */
  private addRangeToElementInCreation(startSquare: GridSquare, endSquare: GridSquare): void {
    let range: GridRange = this.createGridRange(startSquare, endSquare);

    this.elementInCreation.ranges.push(range);
  }

  /**
   * Render the current grid layout.
   */
  public renderGridLayout(layout: GridLayout): void {
    this.clearGrid();
    this.gridLayout = layout;

    for(let element of this.gridLayout.elements) {
      this.insertGridElement(element);
    }
  }

  /**
   * Insert an element on the grid at page load.
   *
   * @param {GridElement} element
   */
  public insertGridElement(element: GridElement): void {
    for (let range of element.ranges) {
      this.insertGridRange(range, element.color, false);
    }

    this.removeBordersWithinElement(element);
  }

  /**
   * Insert a rectangular range on the grid at page load.
   *
   * @param {GridRange} range
   * @param {string} color
   */
  private insertGridRange(range: GridRange, color: string, skipStateUpdate: boolean) {
    let endColumn = range.columnsWide + range.startColumn - 1;
    let endRow = range.columnsHigh + range.startRow - 1;
    let square: GridSquare = this.squares[range.startColumn - 1][range.startRow - 1];

    let x: number = square.x + this.LINE_SIZE;
    let y: number = square.y + this.LINE_SIZE;
    let w: number = ((endColumn - range.startColumn + 1) * this.SQUARE_SIZE) - this.LINE_SIZE * 2;
    let h: number = ((endRow - range.startRow + 1) * this.SQUARE_SIZE) - this.LINE_SIZE * 2;

    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);

    if(skipStateUpdate) {
      return;
    }

    for (let column = range.startColumn; column <= endColumn; column++) {
      for (let row = range.startRow; row <= endRow; row++) {
        let square: GridSquare = this.squares[column - 1][row - 1];

        square.highlightState = GridSquare.FULL_HIGHLIGHT;
      }
    }
  }

  /**
   * Select a specific element and emit an event.
   *
   * @param {MouseEvent} e
   */
  private selectElement(e: MouseEvent): void {
    let mouse = this.getMouse(e);
    let column = Math.ceil(mouse.x / this.SQUARE_SIZE);
    let row = Math.ceil(mouse.y / this.SQUARE_SIZE);

    for (let element of this.gridLayout.elements) {
      for (let range of element.ranges) {
        let endColumn = range.columnsWide + range.startColumn - 1;
        let endRow = range.columnsHigh + range.startRow - 1;

        if (range.startColumn <= column && column <= endColumn && range.startRow <= row && row <= endRow) {
          this.elementSelected.emit(element);
          break;
        }
      }
    }
  }

  /**
   * Determine the end pts of the range.
   *
   * @param {GridSquare} startSquare
   * @param {GridSquare} endSquare
   * @returns {{startColumn: number; startRow: number; endColumn: number; endRow: number}}
   */
  private determineEndPoints(startSquare: GridSquare, endSquare: GridSquare) {
    let startColumn = startSquare.column < endSquare.column ? startSquare.column : endSquare.column;
    let startRow = startSquare.row < endSquare.row ? startSquare.row : endSquare.row;
    let endColumn = startSquare.column < endSquare.column ? endSquare.column : startSquare.column;
    let endRow = startSquare.row < endSquare.row ? endSquare.row : startSquare.row;

    return {startColumn: startColumn, startRow: startRow, endColumn: endColumn, endRow: endRow};
  }

  /**
   * Clear all the squares with an unnecessary hover highlight.
   *
   * @param pts
   * @param {boolean} force
   */
  private clearUnnecessaryHighlights(pts, force: boolean): void {
    for (let i = 1; i <= this.squares.length; i++) {
      for (let j = 1; j <= this.squares[i - 1].length; j++) {

        if (!force && pts.startColumn <= i && i <= pts.endColumn && pts.startRow <= j && j <= pts.endRow) {
          continue;
        }

        let square = this.squares[i - 1][j - 1];

        if (square.highlightState === GridSquare.HOVER_HIGHLIGHT) {
          this.highlightSquare(square);
        }
      }
    }
  }

  /**
   * Remove the border between all ranges in the same element.
   *
   * @param {GridElement} element
   */
  private removeBordersWithinElement(element: GridElement): void {
    if (element.ranges.length <= 1) {
      return;
    }

    for (let range1 of element.ranges) {
      for(let range2 of element.ranges) {
        if(range1 === range2) {
          continue;
        }

        let borderRange: GridRange = this.determineBorderBetweenRanges(range1, range2);

        if(borderRange) {
          this.insertGridRange(borderRange, element.color, false);
        }
      }
    }
  }

  /**
   * Determine the range of squares that border each other between two ranges.
   *
   * @param {GridRange} range1
   * @param {GridRange} range2
   * @returns {GridRange}
   */
  private determineBorderBetweenRanges(range1: GridRange, range2: GridRange): GridRange {
    let startColumn1 = range1.startColumn;
    let startRow1 = range1.startRow;
    let endColumn1 = range1.columnsWide + range1.startColumn - 1;
    let endRow1 = range1.columnsHigh + range1.startRow - 1;

    let startColumn2 = range2.startColumn;
    let startRow2 = range2.startRow;
    let endColumn2 = range2.columnsWide + range2.startColumn - 1;
    let endRow2 = range2.columnsHigh + range2.startRow - 1;

    let borderRange: GridRange = new GridRange(-1, -1, -1, -1);

    if (startColumn1 === endColumn2 + 1) {
      borderRange.startColumn = endColumn2;
      borderRange.columnsWide = 2;
    }
    else if (startColumn2 === endColumn1 + 1) {
      borderRange.startColumn = endColumn1;
      borderRange.columnsWide = 2;
    }
    else if (startRow1 === endRow2 + 1) {
      borderRange.startRow = endRow2;
      borderRange.columnsHigh = 2;
    }
    else if (startRow2 === endRow1 + 1) {
      borderRange.startRow = endRow1;
      borderRange.columnsHigh = 2;
    }
    else {
      return null;
    }

    if (borderRange.startColumn === -1) {
      let firstSharedColumn = startColumn1 >= startColumn2 ? startColumn1 : startColumn2;
      let lastSharedColumn = endColumn1 <= endColumn2 ? endColumn1 : endColumn2;

      borderRange.startColumn = firstSharedColumn;
      borderRange.columnsWide = lastSharedColumn - firstSharedColumn + 1;
    }
    else if (borderRange.startRow === -1) {
      let firstSharedRow = startRow1 >= startRow2 ? startRow1 : startRow2;
      let lastSharedRow = endRow1 <= endRow2 ? endRow1 : endRow2;

      borderRange.startRow = firstSharedRow;
      borderRange.columnsHigh = lastSharedRow - firstSharedRow + 1;
    }

    return borderRange;
  }

  /**
   * Fill the square with a color.
   *
   * @param {GridSquare} square
   * @param {string} color
   */
  private fillSquare(square: GridSquare, color: string): void {
    let x: number = square.x + this.LINE_SIZE;
    let y: number = square.y + this.LINE_SIZE;
    let size: number = square.size - this.LINE_SIZE * 2;

    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, size, size);
  }

  /**
   * Get the x, y coordinate location of the mouse.
   *
   * @param {MouseEvent} e
   * @returns {{x: any; y: any}}
   */
  private getMouse(e: MouseEvent) {
    let element = this.canvas, offsetX = 0, offsetY = 0, mouseX, mouseY;

    if (element.offsetParent) {
      do {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
      } while ((element = element.offsetParent));
    }

    offsetX += this.stylePaddingLeft + this.styleBorderLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop;

    mouseX = e.pageX - offsetX;
    mouseY = e.pageY - offsetY;

    return {x: mouseX, y: mouseY};
  }

  /**
   * Draw the grid.
   */
  private drawGrid(): void {
    let x = 0;
    let y = 0;

    this.ctx.strokeStyle = this.LINE_COLOR;
    this.ctx.lineWidth = this.LINE_SIZE;

    while (y <= this.canvas.height) {
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
      y += this.SQUARE_SIZE;
    }

    y = 0;

    while (x <= this.canvas.width) {
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
      x += this.SQUARE_SIZE;
    }
  }

  /**
   * Clear the grid.
   */
  public clearGrid(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
    this.initializeSquares();
    this.dragging = false;
    this.draggingStartSquare = null;
  }

  /**
   * Switch the color on the element in creation.
   *
   * @param {string} color
   */
  public switchElementColor(color: string) {
    if(this.elementInCreation) {
      this.elementInCreation.color = color;

      for(let range of this.elementInCreation.ranges) {
        this.insertGridRange(range, color, true);
      }
    }
  }

  /**
   * Start the creation of an element.
   *
   * @param {string} name
   * @param {string} type
   */
  public startElementCreation(name: string, type: string): void {
    this.creating = true;
    this.elementInCreation = new GridElement(name, type, this.colorScheme.highlightColor, []);
  }

  /**
   * Finish the creation of an element.
   */
  public finishElementCreation(): void {
    this.creating = false;
    this.removeBordersWithinElement(this.elementInCreation);
    this.gridLayout.elements.push(this.elementInCreation);
    this.elementInCreation = null;

    this.layoutUpdated.emit(this.gridLayout);
  }
}
