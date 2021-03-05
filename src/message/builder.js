//

const moment = require('moment');
const write = require('../util/write');
const api = require('../util/api');



function ts_to_date(ts) {
    return moment.unix(ts).format('YYYY-MM-DD HH:mm:ss')
}

function group_msg(msg) {
    if (msg.message_type != "group") return;
    var name = (msg.sender.card.length > 0 ? msg.sender.card : msg.sender.nickname) + `(${msg.sender.user_id})`;
    var data = name + " " + ts_to_date(msg.time) + ` ${msg.message_id} ` + "\n    " +
        msg.raw_message.replaceAll("\n", "\n    ") + "\n";

    write.write_file_group(msg.group_id, data);
}

async function group_recall(msg) {
    if (msg.notice_type != "group_recall") return;
    var data = ">>>> 系统消息 " + ts_to_date(msg.time) + "\n    " +
        `(${await api.get_group_member_name(msg.group_id, msg.operator_id)})撤回了` +
        `(${await api.get_group_member_name(msg.group_id, msg.user_id)})的消息(${msg.message_id})\n`

    write.write_file_group(msg.group_id, data);
}

async function group_poke(msg) {
    if (msg.sub_type != "poke") return;
    var data = ">>>> 系统消息 " + ts_to_date(msg.time) + "\n    " +
        `(${await api.get_group_member_name(msg.group_id, msg.sender_id)})戳了戳` +
        `(${await api.get_group_member_name(msg.group_id, msg.target_id)})\n`

    write.write_file_group(msg.group_id, data);
}

async function group_card_change(msg) {
    if (msg.notice_type != 'group_card') return;
    var data = ">>>> 系统消息 " + ts_to_date(msg.time) + "\n    " +
        `(${msg.card_old})更改名片为(${msg.card_new})\n`

    write.write_file_group(msg.group_id, data);
}

async function friend_message(msg) {
    if (msg.sub_type != 'friend') return;
    
}

async function group_message_tmp(msg) {
    var name = `${msg.nickname}(${msg.user_id})`
    var data = name + " " + ts_to_date(msg.time) + ` ${msg.message_id} ` + "\n    " +
        msg.raw_message.replaceAll("\n", "\n    ") + "\n";
    write.write_file_group_temp()
}

module.exports = {
    group_msg,
    group_recall,
    group_poke,
    group_card_change,
}