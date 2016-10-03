function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<!DOCTYPE html> <html lang=\"en\"><head><title>Marko Templating Engine </title></head><body><h1>Hello " +
      escapeXml(data.title) +
      "!!Hahaha</h1></body></html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
