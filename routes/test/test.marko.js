function create(__helpers) {
  var loadTemplate = __helpers.l,
      ___default_layout = loadTemplate(require.resolve("../default-layout.marko")),
      str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      layout_use = __loadTag(require("marko/taglibs/layout/use-tag")),
      layout_put = __loadTag(require("marko/taglibs/layout/put-tag"));

  return function render(data, out) {
    layout_use({
        "*": {
            showHeader: true
          },
        __template: ___default_layout,
        getContent: function getContent(__layoutHelper) {
          out.w(" ");

          layout_put({
              into: "title",
              layout: __layoutHelper,
              renderBody: function renderBody(out) {
                out.w("Marko Templating Engine");
              }
            }, out);

          out.w(" ");

          layout_put({
              into: "body",
              layout: __layoutHelper,
              renderBody: function renderBody(out) {
                out.w(" h1 - Hello " +
                  escapeXml(data.title) +
                  "!!Hahahass ");
              }
            }, out);

          out.w(" ");
        }
      }, out);
  };
}

(module.exports = require("marko").c(__filename)).c(create);
