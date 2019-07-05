const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

let konamiCodePosition = 0;

export default callback => {
  if (callback === undefined) {
    return;
  }
  document.addEventListener("keydown", e => {
    if (e.keyCode == konamiCode[konamiCodePosition]) {
      konamiCodePosition++;

      if (konamiCodePosition == konamiCode.length) {
        konamiCodePosition = 0;
        callback();
      }
    } else {
      konamiCodePosition = 0;
    }
  });
};
