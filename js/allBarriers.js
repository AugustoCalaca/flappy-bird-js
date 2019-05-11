import { TopDownBarriers } from './topDownBarriers.js';

export const AllBarriers = function(height, topDownSpace, posX, barrierSpace, isCenter) {
  this.all = [
    new TopDownBarriers(height, topDownSpace, posX),
    new TopDownBarriers(height, topDownSpace, posX + barrierSpace),
    new TopDownBarriers(height, topDownSpace, posX + barrierSpace * 2),
    new TopDownBarriers(height, topDownSpace, posX + barrierSpace * 3)
  ];

  const deslc = 3;
  this.animation = () => {
    this.all.forEach(topDown => {
      topDown.setX(topDown.getX() - deslc);
      // barrier out game
      if(topDown.getX() < -topDown.getWidth()) {
        topDown.setX(topDown.getX() + barrierSpace * this.all.length);
        topDown.gap();
      }

      const half = posX / 2;
      const isHalf = topDown.getX() + deslc >= half && topDown.getX() < half;
      if(isHalf)
        isCenter();
    })
  }
}