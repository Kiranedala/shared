import { EventEmitter, OnInit } from '@angular/core';
import { GridColorScheme } from '../models/grid/grid-color-scheme';
import { GridElement } from '../models/grid/grid-element';
import { GridLayout } from '../models/grid/grid-layout';
import { GridSquare } from '../models/grid/grid-square';
export declare class WinGridComponent implements OnInit {
    TOTAL_COLUMNS: number;
    TOTAL_ROWS: number;
    SQUARE_SIZE: number;
    LINE_SIZE: number;
    LINE_COLOR: string;
    GRID_COLOR: string;
    colorScheme: GridColorScheme;
    initialized: EventEmitter<boolean>;
    elementSelected: EventEmitter<GridElement>;
    layoutUpdated: EventEmitter<GridLayout>;
    private canvas;
    private ctx;
    private creating;
    private dragging;
    private elementInCreation;
    private draggingStartSquare;
    private gridLayout;
    private stylePaddingLeft;
    private stylePaddingTop;
    private styleBorderLeft;
    private styleBorderTop;
    squares: GridSquare[][];
    ngOnInit(): void;
    /**
     * Initialize the two dimensional array of square objects that represents the grid.
     */
    private initializeSquares();
    /**
     * Calculate which square is being clicked.
     *
     * @param {MouseEvent} e
     * @returns {GridSquare}
     */
    private calculateSquare(e);
    /**
     * Highlight a single square square.
     *
     * @param {GridSquare} square
     */
    private highlightSquare(square);
    /**
     * Highlight an entire rectangular range of squares.
     *
     * @param {GridSquare} startSquare
     * @param {GridSquare} endSquare
     */
    private highlightRange(startSquare, endSquare);
    /**
     * Create a new range on the grid.
     *
     * @param {GridSquare} startSquare
     * @param {GridSquare} endSquare
     */
    private createGridRange(startSquare, endSquare);
    /**
     * Create a range and add it to the current element in creation.
     *
     * @param {GridSquare} startSquare
     * @param {GridSquare} endSquare
     */
    private addRangeToElementInCreation(startSquare, endSquare);
    /**
     * Render the current grid layout.
     */
    renderGridLayout(layout: GridLayout): void;
    /**
     * Insert an element on the grid at page load.
     *
     * @param {GridElement} element
     */
    insertGridElement(element: GridElement): void;
    /**
     * Insert a rectangular range on the grid at page load.
     *
     * @param {GridRange} range
     * @param {string} color
     */
    private insertGridRange(range, color, skipStateUpdate);
    /**
     * Select a specific element and emit an event.
     *
     * @param {MouseEvent} e
     */
    private selectElement(e);
    /**
     * Determine the end pts of the range.
     *
     * @param {GridSquare} startSquare
     * @param {GridSquare} endSquare
     * @returns {{startColumn: number; startRow: number; endColumn: number; endRow: number}}
     */
    private determineEndPoints(startSquare, endSquare);
    /**
     * Clear all the squares with an unnecessary hover highlight.
     *
     * @param pts
     * @param {boolean} force
     */
    private clearUnnecessaryHighlights(pts, force);
    /**
     * Remove the border between all ranges in the same element.
     *
     * @param {GridElement} element
     */
    private removeBordersWithinElement(element);
    /**
     * Determine the range of squares that border each other between two ranges.
     *
     * @param {GridRange} range1
     * @param {GridRange} range2
     * @returns {GridRange}
     */
    private determineBorderBetweenRanges(range1, range2);
    /**
     * Fill the square with a color.
     *
     * @param {GridSquare} square
     * @param {string} color
     */
    private fillSquare(square, color);
    /**
     * Get the x, y coordinate location of the mouse.
     *
     * @param {MouseEvent} e
     * @returns {{x: any; y: any}}
     */
    private getMouse(e);
    /**
     * Draw the grid.
     */
    private drawGrid();
    /**
     * Clear the grid.
     */
    clearGrid(): void;
    /**
     * Switch the color on the element in creation.
     *
     * @param {string} color
     */
    switchElementColor(color: string): void;
    /**
     * Start the creation of an element.
     *
     * @param {string} name
     * @param {string} type
     */
    startElementCreation(name: string, type: string): void;
    /**
     * Finish the creation of an element.
     */
    finishElementCreation(): void;
}
