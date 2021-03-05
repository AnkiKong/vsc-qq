
const { default: axios } = require('axios');
const request = require('request');
const vscode = require('vscode')
const fs = require('fs');
const child_process = require('child_process');
const { write_default_config } = require('./config');




function isWindows() {
    return (process.platform === "win32");
}

function isLinux() {
    return (process.platform == "linux");
}

function isMacOS() {
    return (process.platform == "darwin");
}

function exeName() {
    if (isLinux()) {
        return "miraigo";
    } else if (isWindows()) {
        return "miraigo.exe";
    } else if (isMacOS()) {
        return "miraigo";
    }
}

function exePath() {
    var path = vscode.workspace.rootPath;
    return path + "/mirai/" + exeName();
}

async function deploy() {
    vscode.window.showInformationMessage("部署中，请稍后")
    var url = "";
    var md5 = "";
    if (isLinux()) {
        url = "https://github.com/Mrs4s/go-cqhttp/releases/download/v0.9.40-fix2/go-cqhttp-v0.9.40-fix2-linux-386";
        md5 = "https://github.com/Mrs4s/go-cqhttp/releases/download/v0.9.40-fix2/go-cqhttp-v0.9.40-fix2-linux-386.md5"
    } else if (isWindows()) {
        url = "https://github.com/Mrs4s/go-cqhttp/releases/download/v0.9.40-fix2/go-cqhttp-v0.9.40-fix2-windows-386.exe";
        md5 = "https://github.com/Mrs4s/go-cqhttp/releases/download/v0.9.40-fix2/go-cqhttp-v0.9.40-fix2-windows-386.exe.md5";
    } else if (isMacOS()) {
        url = "https://github.com/Mrs4s/go-cqhttp/releases/download/v0.9.40-fix2/go-cqhttp-v0.9.40-fix2-darwin-amd64";
        md5 = "https://github.com/Mrs4s/go-cqhttp/releases/download/v0.9.40-fix2/go-cqhttp-v0.9.40-fix2-darwin-amd64.md5";
    }
    var path = vscode.workspace.rootPath;
    try {
        fs.mkdirSync(path + "/mirai");
    } catch (e) {
    }
    
    request.get({
        url: url,
        // proxy: "http://127.0.0.1:10809"
    }).pipe(
        fs.createWriteStream(path + "/mirai/" + exeName())
    ).on('finish', function () {
        var process = child_process.exec(path + "/mirai/" + exeName(), { cwd: path + "/mirai/" });
        process.stdout.on('data', function (data) {
            console.log(data.toString());
        });
        process.on("exit", function (code) {
            console.log("code: ", code);
        })
        setTimeout(function () {
            vscode.window.showInformationMessage("部署成功")
            console.log(process.kill('SIGINT'));
            write_default_config();
        }, 5000)
    })

    // axios.get(url).then(res => {
    //     var fd = fs.openSync(path + "/mirai/" + exeName(), "w")
    //     fs.writeFileSync(fd, Buffer.from(res.data))
    //     fs.closeSync(fd);

    //     // var process = child_process.exec(path + "/mirai/" + exeName(), {cwd: path + "/mirai/"});
    //     var process = child_process.exec("ping baidu.com", {cwd: path + "/mirai/"});

    //     // var process = child_process.spawn(path + "/mirai/" + exeName());
    //     process.stdout.on('data', function (data){
    //         console.log(data.toString());
    //     });
    //     process.on("exit", function(code) {
    //         console.log("code: ", code);
    //         console.log("path: ", __dirname);
    //     })

    //     setTimeout(function() {
    //         vscode.window.showInformationMessage("部署成功")
    //         console.log(process.kill('SIGINT'));
    //     }, 5000)

    //     return 
    // })
}

module.exports = {
    deploy,
    exePath
}