# qq-vsc README

上半摸鱼必备

## 运行方法

1. 找一个空文件夹，作为项目目录，等等聊天记录都会丢在这个文件夹里
2. 执行 deploy env, 部署一下环境
3. 部署完毕，进去mirai/config.hjson，把账号密码填进去
4. 执行run MiraiGo server，这就开始登录账号
5. 执行 start load message, 开始接收信息并写在当前目录

### 发送消息

命令 send_message,默认发送到当前窗口的qq/群

### 发送图片

命令 send_images

### 撤回消息

以下是一条信息的头构成

``` text
伊蕾娜(1715000000) 2021-03-04 19:28:45 -675593674 
    xxxxx
```

依次为昵称，qq号，发送日期，发送时间，信息id（可能为负数）。

撤回消息需要先选中信息id，然后右键recall message

## Requirements

## Extension Settings

## Known Issues

## Release Notes

### 0.0.1

初始化项目
