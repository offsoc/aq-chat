<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-25 09:15:08
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-07-02 20:05:48
 * @Description: 
-->

<p align="center">
	<img alt="logo" height="50" src="https://docs.aqchat.run/aqchat.svg">
</p>
<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">AQChat</h1>
<h4 align="center">一个已接入AI✨的极速、便捷的匿名在线即时AI聊天室。</h4>
<p align="center">
	<a href="https://gitee.com/howcode/aq-chat"><img src="https://gitee.com/howcode/aq-chat/badge/star.svg"></a>
    <a href="https://gitee.com/howcode/aq-chat"><img src="https://gitee.com/howcode/aq-chat/badge/fork.svg"></a>
    <a href="https://gitee.com/howcode/aq-chat"><img src="https://img.shields.io/badge/License-Apache--2.0-brightgreen.svg"></a>
</p>


[官网文档](https://docs.aqchat.run/)

# 项目说明

AQChat 一个极速、便捷的匿名在线即时聊天室。

对标游戏后端开发，采用Netty作为通讯框架，支持高并发，高性能的即时通讯。全程无需HTTP协议，支持文本、图片、文件、音频、视频的发送和接收。

## 其他仓库
- 移动端：<a href="https://gitee.com/ghosthhf/aqchat-mobile">AQChat-Mobile</a>
- 后端服务：<a href="https://gitee.com/howcode/aq-chat-server">AQChat-Server</a>

## 项目预览
[AQChat在线预览](https://aqchat.run) 
> 注意：pc端访问默认访问WEB端地址,移动端访问跳转移动端地址

## 项目截图
<img src="https://typora-record.oss-cn-shenzhen.aliyuncs.com/img/20240613_203832.gif">
<img src="https://typora-record.oss-cn-shenzhen.aliyuncs.com/img/image-20240703155628479.png">
<img src="https://typora-record.oss-cn-shenzhen.aliyuncs.com/img/image-20240703155711371.png">
<img src="https://aqchat.oss-cn-shenzhen.aliyuncs.com/demo/1715433594150.png" width="500">
<img src="https://aqchat.oss-cn-shenzhen.aliyuncs.com/demo/1715433812218.png">
<img src="https://aqchat.oss-cn-shenzhen.aliyuncs.com/demo/20240511212748.jpg" height="500">
<img src="https://aqchat.oss-cn-shenzhen.aliyuncs.com/demo/20240511212801.jpg" height="500">

## 交流群

添加`howcoder`微信进群（关于项目解答、技术/行业/兴趣交流）

## 免责声明

- 通用性：本项目是作为一个开源项目提供的，开发者在法律允许的范围内不对软件的功能性、安全性或适用性提供任何形式的明示或暗示的保证
- 无担保：用户明确理解并同意，使用本软件的风险完全由用户自己承担，软件以"现状"和"现有"基础提供。开发者不提供任何形式的担保，无论是明示还是暗示的，包括但不限于适销性、特定用途的适用性和非侵权的担保
- 风险承担：在任何情况下，开发者或其供应商都不对任何直接的、间接的、偶然的、特殊的、惩罚性的或后果性的损害承担责任，包括但不限于使用本软件产生的利润损失、业务中断、个人信息泄露或其他商业损害或损失
- 合法性：所有在本项目上进行二次开发的用户，都需承诺将本软件用于合法目的，并自行负责遵守当地的法律和法规
- 修改和版本：开发者有权在任何时间修改软件的功能或特性，以及本免责声明的任何部分，并且这些修改可能会以软件更新的形式体现

最终解释权：本免责声明的最终解释权归开发者所有

## 更新日志

### 2024.07.02

- ✨ AI响应等待动画
- ✨ AI空间发送频率限制

### 2024.07.01

- ✅ AI空间-小T助手：接入自然语言处理（NLP）模型，支持多轮问答
- ✅ AI空间-小M助手：接入计算机视觉（CV）模型，支持文本生成图片
- ✅ AI空间-小V助手：接入音频处理模型，支持文本生成真人语音

### 2024.06.20

- ✨ markdown文档解析AI回答
- ✨ 复制AI回答功能

### 2024.06.19

- ✨ 优化输入框聚焦点击范围
- ✨ 生成用户名称为中文名
- ✨ 用户表单开启校验规则

### 2024.06.18

- 🩹 修复MAC下无法输入中文的问题
- 🩹 修复空格内容发送的问题
- ✨ 优化AI回答时触发触底
- ✨ 艾特用户高亮显示
- ✨ 优化全部触底方案
- ✨ 艾特用户列表展示用户头像

### 2024.06.13

- ✅ 艾特用户，消息卡片提醒功能
- ✅ 艾特小Q，ai消息功能对接

### 2024.06.03

- ✅ 消息撤回
- ✨ 撤回消息重新编辑

### 2024.05.24

- ✅ 消息提示音
- ✅ 失败消息重发功能
- ✅ 浏览消息时，接收新消息禁止触底，提示新消息按钮
- ✨ 房间成员离线通知
- ✨ 优化发送消息失败的计时逻辑
- ✨ 解决同个浏览器登录多个账号的问题 

### 2024.05.23

- ✅ 房间成员列表
- ✨ 刷新页面仅同步加入房间后的消息
- 🩹 修复房间号输入偶尔失效的问题

### 2024.05.22

- ✅ 发送/下载文件功能
- ✨ 优化发送文件功能
- ✨ 表单自动聚焦输入

### 2024.05.21

- ✨ 取消grid布局
- ✨ 服务器关闭逻辑优化

### 2024.05.18

- ✨ 成员退出房间通知

### 2024.05.17

- ✨ 点击图片消息查看大图
- ✨ 点击表情包以外的地方隐藏表情包

### 2024.05.16

- ✅ 发送图片消息功能
- ✨ 接收新消息时，消息触底

### 2024.05.11

- ✅ 刷新页面恢复用户登录
- ✅ 刷新页面同步聊天信息
- ✅ 消息发送中、发送成功、发送失败的状态修改
- ✨ 退出登录

### 2024.05.10

- ✅ 接收/展示消息
- ✨ 成员加入房间通知

### 2024.05.07

- ✅ 发送消息
- ✅ 高亮/黑暗主题

### 更前

- ✅ 生成用户头像/姓名
- ✅ 表情包+文本的富文本功能
