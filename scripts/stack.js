class Stack {
  child = null;

  // position/size values are set externally by
  // a method that inspects viewport dimensions
  x = 0;
  y = 0;

  width = 75;
  height = 100;

  element = null;

  constructor(type) {
    this.type = type;
  }

  get hasCards() {
    return this.child !== null;
  }

  get lastCard() {
    let last = this;
    let count = 0;

    while (last?.child) {
      last = last.child;

      // TODO: remove this eventually
      if (count++ > 50) {
        throw new Error('Invalid parent/child card link.');
      }
    }

    return last;
  }

  toString() {
    return `${this.type} stack`;
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

  moveTo(x, y) {
    this.x = x;
    this.y = y;

    // if a visible component in the DOM exists, move it
    if (this.element) {
      this.element.style.transition = 'translate 0ms linear';
      this.element.style.translate = `${this.x}px ${this.y}px 0px`;
    }
  }

  get size() {
    let height = this.height;
    let width = this.width;
    let card = this.child;

    // Add vertical size if there is more than one card in the stack
    while (card && card.child) {
      // if cards in play piles are still face down, draw them closer together
      let offset = card.faceUp ? this.cardOffset : this.cardOffset / 4;

      height += offset;

      card = card.child;
    }

    return { width, height };
  }

  contains(point) {
    return point.x > this.x &&
        point.x < this.x + this.width &&
        point.y > this.y &&
        point.y < this.y + this.height;
  }

  // increment all z-indices for cards in this stack
  // such that they overlap correctly
  alignZIndex(startIndex) {
    startIndex ||= 0;
    let card = this.child;

    while (card) {
      card.zIndex = startIndex;
      startIndex += 1;
      card = card.child;
    }
  }
}
