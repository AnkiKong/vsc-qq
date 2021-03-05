const vscode = require('vscode');
const deploy = require("../util/deploy");
const WebSocket = require('ws');



module.exports = vscode.commands.registerCommand("qq-vsc.deploy", function () {
    deploy.deploy();
})