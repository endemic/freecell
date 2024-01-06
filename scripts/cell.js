class Cell extends Stack {
  constructor() {
    super();

    this.element = document.createElement('img');
    this.element.classList.add('cell');
    this.element.src = 'https://ganbaru.games/solitaire/images/backs/target.png';
  }
}
