
const fs = require("fs");
// const moment = require('moment');
const vscode = require('vscode');
const api = require('./api');


function write_file(filePath, data, mode="a+") {
    var fd = fs.openSync(filePath, mode)
    fs.writeFileSync(fd, data);
    fs.closeSync(fd);
}

async function write_file_group(gid, data) {
    const path = `${vscode.workspace.rootPath}/${gid},g,${await api.get_group_name(gid)}.qq`
    write_file(path, data)
}

async function write_file_group_temp(uid, data, name="") {
    const path = `${vscode.workspace.rootPath}/${uid},gt,${name}.qq`
    write_file(path, data)
}

function write_file_private(uid, data) {
    const path = `${vscode.workspace.rootPath}/${uid},f,${api.get_friend_name(uid)}.qq`
    write_file(path, data);
}

module.exports = {
    write_file,
    write_file_group,
    write_file_group_temp,
    write_file_private,
}