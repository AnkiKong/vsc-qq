// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const imageHover = require('./provider/imageHover');
const message = require("./provider/message");
const send = require("./provider/sendMessage");
const deploy = require("./provider/deploy");
const runServer = require("./provider/runServer");
const msgOp = require("./provider/msg_operator");


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "qq-vsc" is now active!');

	context.subscriptions.push(message);
	context.subscriptions.push(imageHover);
	context.subscriptions.push(send.send_group_msg);
	context.subscriptions.push(deploy);
	context.subscriptions.push(runServer);
	context.subscriptions.push(send.send_image);
	context.subscriptions.push(msgOp.recall);
	
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
