
const api = require('../util/api');
const vscode = require('vscode')

function recall() {
    const edit = vscode.window.activeTextEditor; 
    var sel = edit.selection;
    var text = edit.document.getText(sel);
    try {
        var msg_id = parseInt(text);
        api.recall_msg(msg_id);
    } catch (error) {
        vscode.window.showErrorMessage("未选中消息id")
    }
}

module.exports = {
    recall,
}