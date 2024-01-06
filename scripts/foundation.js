class Foundation extends Stack {
  constructor() {
    super();

    this.element = document.createElement('img');
    this.element.classList.add('foundation');
    this.element.src = 'https://ganbaru.games/solitaire/images/backs/target.png';
  }

  validPlay(card) {
    // no other cards in the foundation, so (any suit) ace is allowed
    if (!this.hasCards && card.rank === 'ace') {
      return true;
    }

    const lastCard = this.lastCard;
    // if there are cards already played, ensure they are the same suit
    // and the card rank is one higher than the lastCard
    if (card.suit === lastCard.suit && card.diff(lastCard) === 1) {
      return true;
    }

    return false;
  }

  get size() {
    return {
      width: this.width,
      height: this.height
    };
  }
}
