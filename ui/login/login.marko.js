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
                out.w(" Login page ");
              }
            }, out);

          out.w(" ");

          layout_put_tag({
              into: "body",
              layout: __layoutHelper,
              renderBody: function renderBody(out) {
                out.w(" <button class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#login-modal\">Login</button> <div class=\"modal fade\" id=\"login-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" style=\"display: none;\"> <div class=\"modal-dialog\"> <div class=\"inputmodal-container\"> <h1>Login to Your Account</h1><br> <form action=\"/login\" method=\"post\"> <input type=\"text\" name=\"username\" placeholder=\"Username\"> <input type=\"password\" name=\"password\" placeholder=\"Password\"> <input type=\"submit\" name=\"login\" class=\"login inputmodal-submit\" value=\"Login\"> </form> <div class=\"login-help\"> <a href=\"#\">Register</a> - <a href=\"#\">Forgot Password</a> </div> </div> </div> </div> ");
              }
            }, out);

          out.w(" ");
        }
      }, out);
  };
}

(module.exports = require("marko").c(__filename)).c(create);
