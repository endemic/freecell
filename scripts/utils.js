const wait = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const waitAsync = async ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const dist = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getPoint = event => {
  if (event.changedTouches && event.changedTouches.length > 0) {
    return {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY
    };
  }

  return {
    x: event.x,
    y: event.y
  };
}

const log = (...params) => {
  if (DEBUG) {
    console.log(params);
  }
};

const dialog = {
  init: () => {
    const dialog = document.querySelector('dialog#confirm');
    dialog.addEventListener('close', () => {
      if (dialog.returnValue !== 'yes') {
        // user clicked outside the dialog or pressed escape
        return;
      }
      this.onConfirm();
    });
  },
  onConfirm: () => {
    // default no-op
  },
  show: (message, onConfirmFunction) => {
    const dialog = document.querySelector('dialog#confirm');
    dialog.querySelector('#dialog-text').textContent = message;
    dialog.showModal();

    if (typeof onConfirmFunction === 'function') {
      this.onConfirm = onConfirmFunction;
    }
  },

  close: () => {
    const dialog = document.querySelector('dialog#confirm');
    dialog.close();
  }
};

dialog.init();
