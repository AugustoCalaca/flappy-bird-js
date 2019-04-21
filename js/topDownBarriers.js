import { Barrier } from './barrier.js';
import { newElement } from './newElement.js';

export const TopDownBarriers = function(height, spaceBetween, posX) {
  this.elem = newElement('div', 'top-down-barriers');

  this.top = new Barrier(true);
  this.bottom = new Barrier();

  this.elem.appendChild(this.top.elem);
  this.elem.appendChild(this.bottom.elem);

  this.gap = () => {
    const gapTop = Math.random() * (height - spaceBetween);
    const gapBottom = height - spaceBetween - gapTop;

    this.top.setHeight(gapTop);
    this.bottom.setHeight(gapBottom);
  }

  this.setX = x => {
    this.elem.style.left = `${x}px`
  }

  this.getX = () => {
    return parseInt(this.elem.style.left.split('px')[0]);
  }

  this.getWidth = () => {
    return this.elem.clientWidth;
  }

  this.gap();
  this.setX(posX);
}