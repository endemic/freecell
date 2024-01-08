class Card {
  faceUp = true;

  suit = null;
  rank = null;

  allRanks = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];

  parent = null;
  child = null;

  // created/assigned in constructor; represents DOM element
  element = null;

  // size/position variables; storing these as we're doing all movement/resizing thru transforms
  x = 0;
  y = 0;

  width = 75;
  height = 100;

  // when positioning child cards, this is how far they overlap
  offset = 25;

  // this value changes depending on where the card is dropped;
  // it affects behavior when card is clicked/dragged
  location = null;

  constructor(suit, rank) {
    // dynamically create DOM tree representing a card
    // the child elements need to be <img> tags, so that we can use the image
    // data to draw to a canvas background
    /*
      <div class="card">
        <img class="front">
        <img class="back">
      </div>
    */
   this.suit = suit;
   this.rank = rank;

   this.element = document.createElement('div');
   this.element.classList.add('card');

   const front = document.createElement('img');
   front.src = `https://ganbaru.games/solitaire/images/${this.suit}/${this.rank}.png`;
   front.classList.add('front');
   const back = document.createElement('img');
   back.src = `https://ganbaru.games/solitaire/images/backs/one.png`;
   back.classList.add('back');

   this.element.append(front, back);

   // needs to be face-down by default
  }

  toString() {
    return `${this.rank} ${this.suit}`;
  }

  // generator to easily loop thru all child cards
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
  *children() {
    let card = this.child;

    while (card) {
      yield card;
      card = card.child;
    }
  }

  addChild(card) {
    this.child = card;
    card.parent = this;

    // update z-index on all subsequent cards
    let index = this.zIndex;
    for (let card of this.children()) {
      index += 1;
      card.zIndex = index;
    }
  }

  setParent(newParent) {
    // remove old parent's reference to this card, if necessary
    if (this.parent) {
      this.parent.child = null;
    }

    newParent.child = this;
    this.parent = newParent;

    // update z-index to be above parent
    let index = this.parent.zIndex + 1;
    this.zIndex = index;

    // and on all subsequent cards
    for (let card of this.children()) {
      index += 1;
      card.zIndex = index;
    }
  }

  /**
   * @param {any} index
   */
  set zIndex(index) {
    this.element.style.zIndex = index;
  }

  get zIndex() {
    return parseInt(this.element.style.zIndex, 10);
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;

    this.element.style.transition = 'translate 0ms linear';
    this.element.style.translate = `${this.x}px ${this.y}px 0px`;
  }

  animateTo(x, y) {
    this.x = x;
    this.y = y;

    // https://www.cssportal.com/css-cubic-bezier-generator/
    this.element.style.transition = 'translate 250ms cubic-bezier( 0.175, 0.885, 0.32, 1.275 )';
    this.element.style.translate = `${this.x}px ${this.y}px 0px`;
    console.log(`animating to ${x}, ${y}`);
  }

  flip() {
    // timing for this flip transition is defined in CSS
    if (this.faceUp) {
      this.element.children[0].style.transform = 'rotateY(180deg)'; // front
      this.element.children[1].style.transform = 'rotateY(360deg)'; // back
    } else {
      this.element.children[0].style.transform = '';                // front
      this.element.children[1].style.transform = 'rotateY(180deg)'; // back
    }

    this.faceUp = !this.faceUp;
  }

  flash() {
    this.element.style.animation = '';
    this.element.style.animation = 'burst 400ms';
  }

  get size () {
    return {
      width: this.width,
      height: this.height
    };
  }

  set size({width, height}) {
    this.width = width;
    this.height = height;

    console.log(`setting card size: ${width}, ${height}`);

    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
  }

  get color() {
    if (this.suit === 'hearts' || this.suit === 'diamonds') {
      return 'red';
    }

    return 'black';
  }

  // returns this - b; e.g. 5 - 2 = 3
  // used to ensure sequential card placement
  diff(b) {
    return this.allRanks.indexOf(this.rank) - this.allRanks.indexOf(b.rank);
  }

  get childrenInSequence() {
    // if no children, there's a sequence by default
    if (!this.child) {
      return true;
    }

    // if card is same color as previous, or the rank difference is greater than 1,
    // then the subsequent cards are not in sequence
    for (let card of this.children()) {
      if (card.parent.color === card.color || card.diff(card.parent) !== -1) {
        return false;
      }
    }

    return true;
  }
}
