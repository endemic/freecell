let savedData = {
  playedGames: null,
  wonGames: null,
  fastestGame: null
};

const prefixed = key => `freecell_${key}`;

// Load any saved data
Object.keys(savedData).forEach(key => {
  savedData[key] = localStorage.getItem(prefixed(key)) || 0;

  // write stats to page
  document.querySelector(`#${key}`).textContent = savedData[key];
});

// reset statistics
document.querySelector('#reset').addEventListener('click', e => {
  e.preventDefault();

  if (!confirm('Reset statistics?')) {
    return;
  }

  Object.keys(savedData).forEach(key => {
    localStorage.setItem(prefixed(key), 0);

    document.querySelector(`#${key}`).textContent = '0';
  });
});

document.querySelector('#return').addEventListener('click', e => {
  e.preventDefault();

  document.querySelector('#about').style.display = 'none';
});
