
const axios = require('axios');
const vscode = require('vscode');
const conf = require('./config');


function send(path, data={}) {
    var config = conf.get_config();
    data['access_token'] = config.access_token;
    path = `http://${config.http_config.host}:${config.http_config.port}` + path;
    return axios.get(path, {
        params: data
    })
}

function send_private_msg(id, msg) {
    
}

function send_group_msg(id, msg) {
    send("/send_group_msg", {
        group_id: id,
        message: msg,
        echo: msg
    }).then(res => {
        if (res.data.retcode != 0) {
            vscode.window.showErrorMessage(`消息发送失败${res.data.echo},ret=${res.data.retcode}`)            
        }
        // console.log(res.data);
    })
}

function get_group_member_name(gid, uid) {
    return send("/get_group_member_info", {
        group_id: gid,
        user_id: uid
    }).then(res => {
        if (res.data.data.card && res.data.data.card.length > 0) {
            return res.data.data.card;
        }
        return res.data.data.nickname;
    })
}

function get_friend_name(uid) {
    return send("/get_friend_list").then(res => {
        var data=res.data.data;
        for (var i=0; i<data.length; i++) {
            if (data[i].user_id == uid) {
                if (data[i].remark && data[i].remark.length > 0) {
                    return data[i].remark;
                }
                return data[i].nickname;
            }
        }
        return "is_not_friend"
    })
}

function get_group_name(gid) {
    return send("/get_group_info", {
        group_id: gid
    }).then(res => {
        return res.data.data.group_name;
    })
}

function recall_msg(msg_id) {
    return send("/delete_msg", {
        message_id: msg_id
    }).then(res => {
        return res;
    })
    
}

module.exports = {
    send_private_msg,
    send_group_msg,
    get_group_member_name,
    get_group_name,
    get_friend_name,
    recall_msg,
}


