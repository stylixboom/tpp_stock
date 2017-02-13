function create(__helpers) {
  var loadTemplate = __helpers.l,
      default_layout_template = loadTemplate(require.resolve("../default-layout.marko")),
      str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      layout_use_tag = __loadTag(require("marko/taglibs/layout/use-tag")),
      layout_put_tag = __loadTag(require("marko/taglibs/layout/put-tag"));

  return function render(data, out) {
    layout_use_tag({
        "*": {
            showHeader: true
          },
        __template: default_layout_template,
        getContent: function getContent(__layoutHelper) {
          out.w(" ");

          layout_put_tag({
              into: "title",
              layout: __layoutHelper,
              renderBody: function renderBody(out) {
                out.w("Marko Templating Engine");
              }
            }, out);

          out.w(" ");

          layout_put_tag({
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
