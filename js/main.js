import { newElement } from './newElement.js';
import { Barrier } from './barrier.js';
import { TopDownBarriers } from './topDownBarriers.js';
import { AllBarriers } from './allBarriers.js';
import { Bird } from './bird.js';
import { overlap } from './overlap.js';
import { collision } from './collision.js';
import { Progress } from './progress.js';

const fp = document.querySelector('[flappy]');
const bird = new Bird(fp.clientHeight);

const progress = new Progress();

const barriers = new AllBarriers(fp.clientHeight, 200, fp.clientWidth, 400, () => {
  const progressValue = parseInt(document.querySelector('.progress').innerHTML);
  progress.pointUpdate(progressValue + 1);
});

fp.appendChild(progress.elem);  
fp.appendChild(bird.elem);
barriers.all.forEach(topDown => {
  fp.appendChild(topDown.elem);
});


const temp = setInterval(() => {
  barriers.animation();
  bird.animation();

  if(collision(bird, barriers)) {
    clearInterval(temp);
  }
}, 20);