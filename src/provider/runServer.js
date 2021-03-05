const child_process = require('child_process');
const deploy = require('../util/deploy');
const vscode = require('vscode');
const check = require('../util/checkServer')

module.exports = vscode.commands.registerCommand("qq-vsc.runServer", function() {
    if (check.checkServer()) {
        vscode.window.showErrorMessage("服务器已启动");
        return;
    }
    var path = vscode.workspace.rootPath;
    var process = child_process.exec(deploy.exePath() + " faststart", { cwd: path + "/mirai/" });
    process.stdout.on('data', function (data) {
        console.log(data.toString());
    });
    process.on("exit", function (code) {
        console.log("code: ", code);
        vscode.window.showErrorMessage("MiraiGo 掉线了，重新run Server");
    })
    check.writePID(process.pid);
    
    setTimeout(function () {
        if (check.checkServer()) {
            vscode.window.showInformationMessage("服务器启动成功")
        } else {
            vscode.window.showErrorMessage("服务器启动失败");
        }
    }, 5000)
})