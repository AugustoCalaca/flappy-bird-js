export const newElement = (tagName, className) => {
  const elem = document.createElement(tagName);
  elem.className = className;

  return elem;
}