function newElement(tagName, className) {
  const elem = document.createElement(tagName);
  elem.className = className;
  return elem;
}

function Barrer(reverse = false) {
  this.elem = newElement('div', 'barrer');
  const barrerBorder = newElement('div', 'barrer-border');
  const barrerBody = newElement('div', 'barrer-body');

  this.elem.appendChild(reverse ? barrerBody : barrerBorder);
  this.elem.appendChild(reverse ? barrerBorder : barrerBody); 
  this.setHeight = height => barrerBody.style.height = `${height}px`; 
}

function BothBarrers(height, spaceBetween, x) {
  this.elem = newElement('div', 'both-barrers');

  this.top = new Barrer(true);
  this.bottom = new Barrer();

  this.elem.appendChild(this.top.elem);
  this.elem.appendChild(this.bottom.elem);

  this.gap = () => {
    const gapTop = Math.random() * (height - spaceBetween);
    const gapBottom = height - spaceBetween - gapTop;
    this.top.setHeight(gapTop);
    this.bottom.setHeight(gapBottom);
  }

  this.getX = () => {
    return parseInt(this.elem.style.left.split('px')[0]);
  }
  this.setX = x => {
    this.elem.style.left = `${x}px`;
  }
  this.getWidth = () => {
    return this.elem.clientWidth;
  }

  this.gap();
  this.setX(x);
}

function Bird(heightGame) {
  let fly = true;

  this.elem = newElement('img', 'bird');
  this.elem.src = 'img/bird.png';

  this.getY = () => {
    return parseInt(this.elem.style.bottom.split('px')[0]);
  }

  this.setY = (y) => {
    this.elem.style.bottom = `${y}px`;
  }

  window.onkeydown = (event) => {
    if(event.code === 'Space')
      fly = false;
  }

  window.onkeyup = (event) => {
    if(event.code === 'Space')
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

  this.setY(heightGame / 2);
}

function Barrers(height, spaceBetween, x, spaceBarrer, isCenter) {
  this.pairs = [
    new BothBarrers(height, spaceBetween, x),
    new BothBarrers(height, spaceBetween, x + spaceBarrer),
    new BothBarrers(height, spaceBetween, x + spaceBarrer * 2),
    new BothBarrers(height, spaceBetween, x + spaceBarrer * 3)
  ]
  
  const desloc = 3;
  this.pro = new Progress();
  this.animation = () => {
    this.pairs.forEach(pair => {
      pair.setX(pair.getX() - desloc);
      // element out game
      if(pair.getX() < -pair.getWidth()) {
        // put on begin again
        pair.setX(pair.getX() + spaceBarrer * this.pairs.length);
        pair.gap();
      }

      const half = x / 2;
      const isHalf = pair.getX() + desloc >= half && pair.getX() < half;
      if(isHalf)
        isCenter();
    })
  }
}

function Progress() {
  this.elem = newElement('span', 'progress');
  this.pointUpdate = point => {
    this.elem.innerHTML = point;
  }

  this.pointUpdate(0);
}

function overlap(elemA, elemB) {
  const a = elemA.getBoundingClientRect();
  const b = elemB.getBoundingClientRect();

  const axisX = a.left + a.width >= b.left  
             && b.left + b.width >= a.left;
  const axisY = a.top + a.height >= b.top
             && b.top + b.height >= a.top;
  return axisX && axisY;
}

function colision(bird, barrers) {
  let colider = false;
  barrers.pairs.forEach(pair => {
    if(!colider) {
      const top = pair.top.elem;
      const bottom = pair.bottom.elem;
      colider = overlap(bird.elem, top) || overlap(bird.elem, bottom);
    }
  })

  return colider;
}

function FlappyBird() {
  const gameArea = document.querySelector('[flappy]');
  const height = gameArea.clientHeight;
  const width = gameArea.clientWidth;
  const progress = new Progress();
  const barrers = new Barrers(height, 200, width, 400, () => { 
    const progressValue = parseInt(document.querySelector('.progress').innerHTML);
    progress.pointUpdate(progressValue + 1);
  });
  const bird = new Bird(height);

  gameArea.appendChild(progress.elem);
  gameArea.appendChild(bird.elem);
  barrers.pairs.forEach(pair => {
    gameArea.appendChild(pair.elem);
  });

  this.start = () => {
    const temp = setInterval(() => {
      barrers.animation();
      bird.animation();

      if(colision(bird, barrers))
        clearInterval(temp);
    }, 20);
  }
}

new FlappyBird().start();