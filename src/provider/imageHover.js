const vscode = require('vscode');

module.exports = vscode.languages.registerHoverProvider('qq', {
    provideHover(document, position, token) {

        const text = document.lineAt(position.line).text;
        //   console.log(4, '获得', text);
        if (text.indexOf("CQ:image") < 0) {
            //   console.log("no image");
            return;
        }
        const exp = /file=[^.]+/
        var res = text.match(exp)
        if (res.length < 1) {
            return;
        }
        var id = res[0].substr(5).toUpperCase();
        return new vscode.Hover(
            `[浏览器中打开](https://gchat.qpic.cn/gchatpic_new/0/0-0-${id}/0?term=3)\n\n` + 
            `![](https://gchat.qpic.cn/gchatpic_new/0/0-0-${id}/0?term=3)`);
    }
}
);