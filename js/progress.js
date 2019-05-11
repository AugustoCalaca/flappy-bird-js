import { newElement } from './newElement.js';

export const Progress = function() {
  this.elem = newElement('span', 'progress');
  this.pointUpdate = point => {
    this.elem.innerHTML = point;
  }

  this.pointUpdate(0);
}