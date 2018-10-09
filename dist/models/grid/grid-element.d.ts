import { GridRange } from './grid-range';
export declare class GridElement {
    name: string;
    type: string;
    color: string;
    ranges: GridRange[];
    constructor(name: string, type: string, color: string, ranges?: GridRange[]);
    addRange(range: GridRange): void;
}
