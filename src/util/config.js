
const fs = require("fs");
const uuid = require('uuid');
const vscode = require('vscode')
const hjson = require('hjson')

const default_config = `
{
    // 这里填账号，数字，非字符串
    uin: 0
    // 这里填密码
    password: ""
    encrypt_password: false
    password_encrypted: ""
    enable_db: true
    access_token: "${uuid.v4()}"
    relogin: {
        enabled: true
        relogin_delay: 3
        max_relogin_times: 0
    }
    _rate_limit: {
        enabled: false
        frequency: 1
        bucket_size: 1
    }
    ignore_invalid_cqcode: false
    force_fragmented: false
    fix_url: false
    proxy_rewrite: ""
    heartbeat_interval: 0
    http_config: {
        enabled: true
        host: 127.0.0.1
        port: 5700
        timeout: 0
        post_urls: {}
    }
    ws_config: {
        enabled: true
        host: 127.0.0.1
        port: 6700
    }
    ws_reverse_servers: [
        {
            enabled: false
            reverse_url: ws://you_websocket_universal.server
            reverse_api_url: ws://you_websocket_api.server
            reverse_event_url: ws://you_websocket_event.server
            reverse_reconnect_interval: 3000
        }
    ]
    post_message_format: string
    use_sso_address: false
    debug: false
    log_level: info
    web_ui: {
        enabled: true
        host: 127.0.0.1
        web_ui_port: 9999
        web_input: false
    }
}
`

function write_default_config() {
    var path = vscode.workspace.rootPath + "/mirai/config.hjson";
    var fd = fs.openSync(path, "w")
    fs.writeFileSync(fd, default_config);
    fs.closeSync(fd);
    vscode.window.showInformationMessage("配置初始化完成，修改mirai/config.hjson里面的账号密码")
}

function get_config() {
    var path = vscode.workspace.rootPath + "/mirai/config.hjson";
    return hjson.parse(fs.readFileSync(path).toString());
}

module.exports = {
    write_default_config,
    get_config,
}

