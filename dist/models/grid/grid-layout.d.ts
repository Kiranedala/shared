import { GridElement } from './grid-element';
export declare class GridLayout {
    name: string;
    elements: GridElement[];
    constructor(name: string, elements?: GridElement[]);
    addElement(element: GridElement): void;
}
