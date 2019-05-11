import { overlap } from './overlap.js';

export const collision = function(bird, barriers) {
  let colli = false;
  barriers.all.forEach(topDown => {
    if(!colli) {
      const top = topDown.top.elem;
      const bottom = topDown.bottom.elem;
      colli = overlap(bird.elem, top) || overlap(bird.elem, bottom);
    }
  })

  return colli;
}