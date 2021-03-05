const vscode = require('vscode');
const message = require("../message/builder");
const WebSocket = require('ws');
const conf = require("../util/config");

function connect() {
    var config = conf.get_config(); 
    var ws = new WebSocket(`ws://${config.ws_config.host}:${config.ws_config.port}?access_token=${config.access_token}`)
    ws.onopen = function() {
        vscode.window.showInformationMessage("连接成功");
    }
    // ws.onerror = function() {
    //     vscode.window.showErrorMessage("连接丢失，重新连接中")
    //     setTimeout(function() {
    //         connect()
    //     }, 2000)
    // }
    ws.onmessage = function (msg) {
        var data = JSON.parse(msg.data.toString());
        if (data.post_type == "message") {
            if (data.message_type == "group") {
                message.group_msg(data);
            } else if (data.message_type == "private") {
                console.log(JSON.stringify(data));
            } else {
                console.log(data);
            }
        } else if (data.post_type == "notice") {
            if (data.sub_type == "poke") {
                message.group_poke(data);
            } else if (data.notice_type == "group_recall") {
                message.group_recall(data);
            } else if (data.notice_type == "group_card") {
                message.group_card_change(data);
            }
            else {
                console.log(data);
            }
        } else if (data.post_type == "message_sent") {
            message.group_msg(data);
        } else if (data.post_type != "meta_event") {
            console.log(data);
        }
        // console.log(msg.data);
    };
    ws.onclose = function() {
        vscode.window.showErrorMessage("连接丢失，重新连接中")
        setTimeout(function() {
            connect()
        }, 2000)
    };
}


module.exports = vscode.commands.registerCommand("qq-vsc.start", connect)