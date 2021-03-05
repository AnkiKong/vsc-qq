
const vscode = require('vscode');
const fs = require('fs');
const write = require('./write');
function getPID() {
    var path = vscode.workspace.rootPath + "/mirai/pid";
    return parseInt(fs.readFileSync(path).toString())
}

function writePID(pid) {
    var path = vscode.workspace.rootPath + "/mirai/pid";
    write.write_file(path, `${pid}`, "w");
}

function checkServer() {
    try {
        var pid = getPID();
        process.kill(pid, 0);
        return true;
    } catch(e) {
        return false;
    }
}

module.exports = {
    checkServer,
    writePID,
}
