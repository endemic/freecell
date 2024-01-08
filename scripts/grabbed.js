class Grabbed extends Stack {
  type = 'grabbed';

  // record the offset where the card was picked up,
  // so clicking/touching the card doesn't cause it to "jump"
  pointerOffset = { x: 0, y: 0 };

  // offset between cards in a stack, so we can see the rank/suit
  offset = 25;

  // position of the card(s)
  x = 0;
  y = 0;

  // pointer to the card(s) being moved
  child = null;

  get hasCards() {
    return this.child !== null;
  }

  setOffset(point) {
    const card = this.child;

    this.pointerOffset.x = point.x - card.x;
    this.pointerOffset.y = point.y - card.y;
  }

  moveTo(point) {
    this.x = point.x - this.pointerOffset.x;
    this.y = point.y - this.pointerOffset.y;

    if (!this.child) {
      return;
    }

    // move child cards
    let offset = 0;

    for (let card of this.children()) {
      card.moveTo(this.x, this.y + offset);
      offset += this.offset;
    }
  }

  animateTo(point) {
    if (!this.child) {
      return;
    }

    // move child cards
    let offset = 0;
    let delay = 0;

    for (let card of this.children()) {
      ((card, point, offset, delay) => {
        // this isn't wokriong
        // wait(delay).then(() => card.animateTo(point.x, point.y + offset));
        setTimeout(() => {
          card.animateTo(point.x, point.y + offset);
        }, delay);
      })(card, point, offset, delay);

      offset += this.offset;
      delay += 50;
    }
  }

  get size() {
    return this.child.size;
  }

  // returns true if the "grabbed" bounding box overlaps
  // the passed arg bounding box
  overlaps(target) {
    // Calculate the sides of the boxes
    let left1 = target.x;
    let right1 = target.x + target.size.width;
    let top1 = target.y;
    let bottom1 = target.y + target.size.height;

    let left2 = this.x;
    let right2 = this.x + this.size.width;
    let top2 = this.y;
    let bottom2 = this.y + this.size.height;

    // Check for collisions
    if (bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2) {
      return false; // No collision
    }

    return true; // Collision detected
  }

  // sets the `child` prop of the `grabbed` object, and adjusts each card's z-index
  grab(card) {
    this.child = card;

    let index = 52; // highest possible z-index for a 52 card deck
    for (let card of this.children()) {
      console.log(`setting z-index of grabbed card ${card} to be ${index}`);
      card.zIndex = index;
      index += 1;
    }
  }
}
