class Grabbed extends Stack {
  type = 'grabbed';

  // record the offset where the card was picked up,
  // so clicking/touching the card doesn't cause it to "jump"
  pointerOffset = { x: 0, y: 0 };

  // ivars to tell us whether the user clicked
  // and moved cards far enough to actually show movement
  origin = { x: 0, y: 0 };
  moved = false;

  setOffset(point) {
    const card = this.child;

    this.origin = point;

    this.pointerOffset.x = point.x - card.x;
    this.pointerOffset.y = point.y - card.y;

    // sets the internal position representation, so it's not (0, 0)
    this.x = point.x - this.pointerOffset.x;
    this.y = point.y - this.pointerOffset.y;
  }

  moveTo(point) {
    // only move if distance is > some small wiggle room
    // to allow for easier double-click to play
    let d = dist(point, this.origin);
    if (d < 5) {
      console.log(`didn't move enough: ${d}`);
      return;
    }

    this.moved = true;
    document.body.style.cursor = 'grabbing';

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

    // animate child cards
    let offset = 0;
    let delay = 0;

    for (let card of this.children()) {
      ((card, point, offset, delay) => {
        wait(delay).then(() => card.animateTo(point.x, point.y + offset));
      })(card, point, offset, delay);

      offset += this.offset;
      delay += 50;
    }
  }

  get size() {
    return {
      width: this.width,
      height: this.height
    };
  }

  set size({width, height}) {
    this.width = width;
    this.height = height;

    console.log(`setting ${this.type} size: ${width}, ${height}`);
  }

  // returns true if the "grabbed" bounding box overlaps
  // the passed arg bounding box
  overlaps(target) {
    if (isNaN(target.size.width) ||
        isNaN(target.size.height) ||
        isNaN(this.size.height) ||
        isNaN(this.size.height)) {
          // cascades have NaN value for height?
      debugger;
    }
    // Calculate the sides of the boxes
    let left1 = target.x;
    let right1 = target.x + target.size.width;
    let top1 = target.y;
    let bottom1 = target.y + target.size.height;

    let left2 = this.x;
    let right2 = this.x + this.size.width;
    let top2 = this.y;
    let bottom2 = this.y + this.size.height;

    console.log(`comparing collision of ${target.size.width}x${target.size.height} @ (${target.x}, ${target.y}) vs. ${this.size.width}x${this.size.height}  @ (${this.x}, ${this.y})`);

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

  // Drop a series of cards on a target, setting the parent/etc. property, and animating them in place
  drop(target) {
    const card = this.child;
    // if no explicit target, assume we're dropping back
    // on the original parent
    target = target || card.parent;

    console.log(`dropping on ${target.type || 'another card'}`);

    if (this.moved) {
      // Don't add card overlap if dropping on base stack
      let offset = this.offset;
      if (['cascade', 'foundation', 'cell'].includes(target.type)) {
        offset = 0;
      }

      this.animateTo({
        x: target.x,
        y: target.y + offset
      });

      // this is kind of redundant if not setting a new parent,
      // but handles updating card z-indices correctly
      // the `wait` allows for the cards to finish animating so they don't
      // ease underneath neighboring cascades
      wait(250).then(() => card.setParent(target));
    } else {
      // if card hasn't moved at all, we can just reset the z-index
      card.setParent(target);
    }

    this.child = null;
    this.moved = false;

    document.body.style.cursor = 'grab';
  }
}
