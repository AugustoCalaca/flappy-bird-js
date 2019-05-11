import { newElement } from "./newElement.js";

export const Barrier = function(reverse = false) {
  this.elem = newElement('div', 'barrier');
  const barrierBorder = newElement('div', 'barrier-border');
  const barrierBody = newElement('div', 'barrier-body');

  this.elem.appendChild(reverse ? barrierBody : barrierBorder);
  this.elem.appendChild(reverse ? barrierBorder : barrierBody);
  this.setHeight = height => barrierBody.style.height = `${height}px`;
}