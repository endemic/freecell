class Grabbed extends Stack {
  // record the offset where the card was picked up,
  // so clicking/touching the card doesn't cause it to "jump"
  pointerOffset = { x: 0, y: 0 };

  // offset between cards in a stack, so we can see the rank/suit
  overlapOffset = 25;

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
    let last = this.child;
    let offset = 0;

    // TODO: update to use `children()` generator
    do {
      last.moveTo(this.x, this.y + offset);

      offset += this.overlapOffset;
      last = last.child;
    } while (last);
  }

  animateTo(point) {
    if (!this.child) {
      return;
    }

    // move child cards
    let card = this.child;
    let offset = 0;
    let delay = 0;

    // TODO: update to use `children()` generator
    do {
      // some freaking JS garbage
      // https://reactgo.com/javascript-settimeout-for-loop/
      ((card, point, offset) => {
        setTimeout(() => card.animateTo(point.x, point.y + offset), delay);
      })(card, point, offset);

      offset += this.overlapOffset;
      delay += 50;
      card = card.child;
    } while (card);
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
      card.zIndex = index;
      index += 1;
    }
  }
}
