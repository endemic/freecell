const CardWaterfall = {
  fallingCard: null,
  canvas: document.querySelector('canvas'),

  start(callback) {
    // set callback function to run when waterfall is finished
    this.callback = callback || (() => {});

    // get the first card
    this.fallingCard = this.nextCard();

    // put canvas in front of DOM elements
    this.canvas.style.zIndex = 52;

    // cancel animation on user interaction
    this.canvas.addEventListener('click', this.stop.bind(this));

    // kick off animation loop
    this.interval = window.setInterval(() => this.update(), 16);
  },

  get randomSign() {
    return Math.random() > 0.5 ? 1 : -1;
  },

  get randomVelocity() {
    const scaledCanvasWidth = parseInt(this.canvas.style.width, 10);
    const scaledCanvasHeight = parseInt(this.canvas.style.height, 10);

    let x = scaledCanvasWidth * 0.003;
    let y = scaledCanvasHeight * 0.005;

    let v = {
      x: ((Math.random() * x) + x) * this.randomSign,
      y: ((Math.random() * y) + y) * -1
    };

    console.log(v);

    return v;
  },

  nextCard() {
    // randomly choose foundation & pick top card off it
    let randomFoundationIndex = Math.floor(Math.random() * foundations.length);
    let f = foundations[randomFoundationIndex];

    while (!f.hasCards) {
      randomFoundationIndex = Math.floor(Math.random() * foundations.length);
      f = foundations[randomFoundationIndex];

      // if no more cards left, return a falsy value
      if (!this.hasCards) {
        return;
      }
    }

    let card = f.lastCard;

    // detatch card
    card.parent.child = null;
    card.parent = null;

    // give random speed; `card` is an Object, so can assign arbitrary properties
    card.velocity = this.randomVelocity;

    return card;
  },

  update() {
    const scaledCanvasWidth = parseInt(this.canvas.style.width, 10);
    const scaledCanvasHeight = parseInt(this.canvas.style.height, 10);
    const context = this.canvas.getContext('2d');

    // pick next card if the existing one goes off screen
    if (this.fallingCard.x + this.fallingCard.width < 0 ||
        this.fallingCard.x > scaledCanvasWidth) {
      this.fallingCard = this.nextCard();
    }

    let fallingCard = this.fallingCard;

    // If we can't get the next card, that means we're out
    if (!fallingCard) {
      this.stop();

      return;
    }

    context.drawImage(fallingCard.element.children[0], fallingCard.x, fallingCard.y, fallingCard.width, fallingCard.height);

    const nextPosition = {
      x: fallingCard.x + fallingCard.velocity.x,
      y: fallingCard.y + fallingCard.velocity.y
    };

    // don't let the card go below the bottom edge of the screen
    // TODO: this currently is broken for hidpi screens; canvas is actually 3x
    if (nextPosition.y + fallingCard.height > scaledCanvasHeight) {
      nextPosition.y = scaledCanvasHeight - fallingCard.height;

      // "bounce" the card
      fallingCard.velocity.y = -fallingCard.velocity.y * 0.85;
    }

    // Move card DOM element
    fallingCard.moveTo(nextPosition.x, nextPosition.y);

    // update card velocity w/ "gravity" acceleration
    fallingCard.velocity.y += scaledCanvasHeight * 0.001; // 0.1%
  },

  get hasCards() {
    return foundations.some(f => f.hasCards);
  },

  stop() {
    // stop listening for interaction
    this.canvas.removeEventListener('click', this.stop.bind(this));

    // stop animation loop
    window.clearInterval(this.interval);

    // put canvas back "behind" DOM elements
    this.canvas.style.zIndex = 0;

    // erase drawn card trails
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    console.log('running waterfall callback');
    this.callback();
  }
};
