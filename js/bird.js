import { newElement } from './newElement.js';

export const Bird = function(heightGame) {
  this.elem = newElement('img', 'bird');
  this.elem.src = 'img/bird.png';

  this.getY = () => {
    return parseInt(this.elem.style.bottom.split('px')[0]);
  }
  
  this.setY = y => {
    this.elem.style.bottom = `${y}px`
  }
  
  this.setY(heightGame / 2);
  
  let fly = true;
  window.onkeydown = (evt) => {
    if(evt.code === 'Space')
      fly = false;
  }
  
  window.onkeyup = (evt) => {
    if(evt.code === 'Space')
      fly = true;
  }
  
  this.animation = () => {
    const newY = this.getY() + (fly ? -3 : 4);
    const maxHeight = heightGame - this.elem.clientHeight;
    
    if(newY <= 0) 
      this.setY(0);
    else if(newY >= maxHeight)
      this.setY(maxHeight);
    else  
      this.setY(newY);
  }
}