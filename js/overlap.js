export const overlap = function (elemA, elemB) {
  const a = elemA.getBoundingClientRect();
  const b = elemB.getBoundingClientRect();

  const axisX = a.left + a.width >= b.left &&
                b.left + b.width >= a.left;
  const axisY = a.top + a.height >= b.top && 
                b.top + b.height >= a.top;
  return axisX && axisY;
}