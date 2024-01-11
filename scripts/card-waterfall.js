// TODO: set canvas width/height in resize function
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// front of first card
let card = cards[0];
let img = card.element.children[0];

// context.drawImage(img, 0, 0, card.width, card.height);