function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      __loadTag = __helpers.t,
      layout_placeholder = __loadTag(require("marko/taglibs/layout/placeholder-tag"));

  return function render(data, out) {
    out.w("<!doctype html> <html lang=\"en\"> <head> <meta charset=\"UTF-8\"> <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> <title>");

    layout_placeholder({
        name: "title",
        content: data.layoutContent
      }, out);

    out.w("</title> <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin=\"anonymous\"> <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css\" integrity=\"sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp\" crossorigin=\"anonymous\"> <!--[if lt IE 9]>\r\n      <script src=\"https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js\"></script>\r\n      <script src=\"https://oss.maxcdn.com/respond/1.4.2/respond.min.js\"></script>\r\n    <![endif]--> <link rel=\"stylesheet\" href=\"/public/styles/classic.css\"> </head> <body> <script src=\"/socket.io/socket.io.js\"></script> <script src=\"/public/scripts/connector.js\"></script> <script src=\"/public/scripts/web_connector.js\"></script> <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js\"></script> <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\" integrity=\"sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa\" crossorigin=\"anonymous\"></script> <h1 if=\"data.showHeader !== false\"> ");

    layout_placeholder({
        name: "title",
        content: data.layoutContent
      }, out);

    out.w(" </h1> <p> ");

    layout_placeholder({
        name: "body",
        content: data.layoutContent
      }, out);

    out.w(" </p> <div> ");

    layout_placeholder({
        name: "footer",
        content: data.layoutContent,
        renderBody: function renderBody(out) {
          out.w(" Default Footer ");
        }
      }, out);

    out.w(" </div> </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
