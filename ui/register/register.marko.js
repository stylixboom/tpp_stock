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
                out.w(" User registration ");
              }
            }, out);

          out.w(" ");

          layout_put_tag({
              into: "body",
              layout: __layoutHelper,
              renderBody: function renderBody(out) {
                out.w(" <button class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#regist-modal\">Register</button> <div class=\"modal fade\" id=\"regist-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" style=\"display: none;\"> <div class=\"modal-dialog\"> <div class=\"inputmodal-container\"> <h1>Register a new account</h1><br> <form action=\"/api/register\" method=\"post\"> <input type=\"text\" name=\"name\" placeholder=\"Full name\"> <input type=\"email\" name=\"email\" placeholder=\"Email\"> <input type=\"text\" name=\"username\" placeholder=\"Username\"> <input type=\"password\" name=\"password\" placeholder=\"Password\"> <input type=\"text\" name=\"identity\" placeholder=\"ID card number\"> <input type=\"text\" name=\"address\" placeholder=\"Address\"> <input type=\"submit\" name=\"register\" class=\"login inputmodal-submit\" value=\"Register\"> </form> </div> </div> </div> ");
              }
            }, out);

          out.w(" ");
        }
      }, out);
  };
}

(module.exports = require("marko").c(__filename)).c(create);
