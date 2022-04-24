export const getDirectionOffset = (w, s, d, a) => {
  let directionOffset = 0; // w

  if (w) {
    //pula
  } else if (s) {
    directionOffset = Math.PI; // s
  } else if (a) {
    directionOffset = Math.PI / 2; // a
  } else if (d) {
    directionOffset = -Math.PI / 2; // d
  }
  return directionOffset;
};
