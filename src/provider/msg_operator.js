
const op = require('../message/operate');
const vscode = require('vscode');

const recall = vscode.commands.registerCommand("qq-vsc.recall_message", function() {
    op.recall();
})

module.exports = {
    recall,
}