import {GridElement} from './grid-element';

export class GridLayout {
  constructor(public name: string, public elements?: GridElement[]) {
    if(!this.elements) {
      this.elements = [];
    }
  }

  addElement(element: GridElement) {
    this.elements.push(element);
  }
}
