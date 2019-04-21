import { newElement } from './newElement.js';
import { Barrier } from './barrier.js';
import { TopDownBarriers } from './topDownBarriers.js';
import { AllBarriers } from './allBarriers.js';
import { Bird } from './bird.js';

const fp = document.querySelector('[flappy]');
const bird = new Bird(fp.clientHeight);
fp.appendChild(bird.elem);

const barriers = new AllBarriers(fp.clientHeight, 200, fp.clientWidth, 400);
barriers.all.forEach(topDown => {
  fp.appendChild(topDown.elem);
})

setInterval(() => {
  barriers.animation();
  bird.animation();
}, 20)