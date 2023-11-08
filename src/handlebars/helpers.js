const handlebars = require('handlebars');

handlebars.registerHelper('image', function (path) {
  // Вставляем путь к изображению в директории dist/assets
  return `assets/${path}`;
});