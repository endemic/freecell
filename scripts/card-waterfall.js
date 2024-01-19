const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

// TEST
// let card = cards[0];
// let img = card.element.children[0];
// context.drawImage(img, 0, 0, card.width, card.height);

// local variables used to hold reference to moving card,
// as well as its speed (cards normally only store their (x,y) position)
let movingCard;

// not truly "random" -- weighted to negative, so cards have a
// tendancy to fall to the left (where they can be visible for longer)
const getRandomSign = () => Math.random() > 0.7 ? 1 : -1;

// assign a random speed to a falling card
const getRandomVelocity = () => {
  let v = {
    x: (Math.random() * 4 + 1) * getRandomSign(),
    y: -Math.random() * 4 + 3
  };

  // TODO: figure out best velocity range
  console.log(v);

  return v;
};

const getNextFallingCard = () => {
  // randomly choose foundation & pick top card off it
  let f = foundations[Math.floor(Math.random() * foundations.length)];

  let card = f.lastCard;

  // detatch card
  card.parent.child = null;
  card.parent = null;

  // `card` is an Object, so can assign arbitrary properties
  card.velocity = getRandomVelocity();

  return card;
};

const animate = () => {
  // start a new card if one hasn't been set
  // start a new card if the existing one goes off screen
  if (!movingCard || movingCard.x + movingCard.width < 0 || movingCard.x > canvas.width) {
    movingCard = getNextFallingCard();
  }

  context.drawImage(movingCard.element.children[0], movingCard.x, movingCard.y, movingCard.width, movingCard.height);

  let nextPosition = {
    x: movingCard.x + movingCard.velocity.x,
    y: movingCard.y + movingCard.velocity.y
  };

  // don't let the card go below the bottom edge of the screen
  if (nextPosition.y + movingCard.height > canvas.height) {
    nextPosition.y = canvas.height - movingCard.height;

    // "bounce" the card
    movingCard.velocity.y = -movingCard.velocity.y * 0.8;
  }

  movingCard.moveTo(nextPosition.x, nextPosition.y);

  // update card velocity w/ "gravity" acceleration
  movingCard.velocity.y += 0.75;
};

if (DEBUG) {
  // set canvas on top of all the other cards
  canvas.style.zIndex = 100;

  // TODO: store the interval ID in a variable, so it can be cancelled
  window.setInterval(animate, 16);
}
