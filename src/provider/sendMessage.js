const vscode = require('vscode');
const api = require('../util/api');
const fs = require('fs')
const path = require('path')
const tool = require('../util/tool')


function send_message_common(msg) {
    if (!msg || msg.length <= 0) {
        return;
    }
    if (!vscode.window.activeTextEditor.document.uri.fsPath.endsWith(".qq")) {
        console.log("error, not a qq file")
        return;
    }
    var path = vscode.window.activeTextEditor.document.uri.fsPath.replace(/\\/g, "/").split("/")
    if (path.length < 2) {
        console.log("error")
        return;
    }
    var params = path[path.length-1].split(",");

    var id = params[0];
    var type = params[1];
    var func = null;
    if (type == "g") {
        func = api.send_group_msg;
    }

    if (func) {
        func(id, msg);
    }
}

const send_group_msg = vscode.commands.registerCommand("qq-vsc.send_group_msg", function () {
    var inp = vscode.window.createInputBox();
    // var func = null;
    inp.ignoreFocusOut = true;
    inp.show();
    inp.onDidAccept(() => {
        var res = inp.value;
        send_message_common(res);
        inp.hide();
        inp.dispose()
    })
})

const send_image = vscode.commands.registerCommand("qq-vsc.send_image", function() {
    vscode.window.showOpenDialog({
        canSelectFolders: false,
        canSelectMany: true,
        filters: {
            image: ["jpg", "jpeg", "gif", "png"]
        }
    }).then((res) => {
        if (!res || res.length <= 0) {
            return;
        }
        var img_path = vscode.workspace.rootPath + "/mirai/data/images/";
        var data = "";
        for (var i=0; i<res.length; i++) {
            var filename = tool.get_string_md5(res[i].toString()) + path.extname(res[i].toString())
            fs.copyFileSync(res[i].fsPath, img_path + filename)
            data += `[CQ:image,file=${filename}]\n`
        }
        send_message_common(data);
    })
})

module.exports = {
    send_group_msg,
    send_image,
}