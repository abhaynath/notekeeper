const getRandomId = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
const getRandomColor = function () {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
export { getRandomId, getRandomColor };
