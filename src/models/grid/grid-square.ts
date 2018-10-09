export class GridSquare {
  public x: number;
  public y: number;
  public highlightState: number = GridSquare.NO_HIGHLIGHT;

  public static readonly NO_HIGHLIGHT: number = 0;
  public static readonly HOVER_HIGHLIGHT: number = 1;
  public static readonly FULL_HIGHLIGHT: number = 2;

  constructor(public column: number, public row: number, public size: number) {
    this.x = (column - 1) * this.size;
    this.y = (row - 1) * this.size;
  }
}
