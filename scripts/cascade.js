class Cascade extends Stack {
  type = 'cascade';

  get size() {
    if (!this.child) {
      return {
        width: this.width,
        height: this.height
      };
    }

    const width = this.child.width; // all cards are the same width
    let height = this.child.height;

    let last = this.child;
    let count = 0;

    // TODO: use `this.children()` generator
    while (last?.child) {
      height += this.overlapOffset;
      last = last.child;

      // TODO: remove this eventually
      if (count++ > 50) {
        throw new Error('Invalid parent/child card link.');
      }
    }

    return { width, height };
  }

  validPlay (card) {
    const lastCard = this.lastCard;

    // if no other cards in the cascade, any card is allowed
    if (!lastCard.parent) {
      return true;
    }

    // if there are cards already played, ensure they are
    // alternating suits and the card rank is one lower than
    // the last card (and the last card has to be face up, too)
    if (card.color !== lastCard.color && card.diff(lastCard) === -1 && lastCard.faceUp) {
      return true;
    }

    // your situation is unfortunate!
    return false;
  }
}
