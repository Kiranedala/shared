export declare class GridSquare {
    column: number;
    row: number;
    size: number;
    x: number;
    y: number;
    highlightState: number;
    static readonly NO_HIGHLIGHT: number;
    static readonly HOVER_HIGHLIGHT: number;
    static readonly FULL_HIGHLIGHT: number;
    constructor(column: number, row: number, size: number);
}
