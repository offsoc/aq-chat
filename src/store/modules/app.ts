/*
 * @Author: hhf 2251448458@qq.com
 * @Date: 2024-04-21 16:43:20
 * @Description: app相关持久化数据
 */

import { defineStore } from 'pinia'
import User from '../../class/User'
import Msg from '../../class/Msg'
import MsgStatusEnum from '../../enums/MsgStatusEnum'
import AQSender from '@/message/AQSender'
import * as AQChatMSg from '@/message/protocol/AQChatMsgProtocol_pb'
import CustomSnowflake from "@/utils/CustomSnowflake"
import MsgTypeEnum from "@/enums/MsgTypeEnum"
import AiTypeEnum from "@/enums/AiTypeEnum"
import { AssistantsList,AiWaitMsgInfo } from "@/utils/config"

interface RoomInfo {
    roomId:string,
    roomNo:string,
    roomName:string,
    ai:AiTypeEnum
}

interface AppState {
    // 主题
    theme:string,
    // websocket状态
    websocketStatus:boolean,
    // 用户信息
    userInfo:User,
    // 房间信息
    roomInfo:RoomInfo,
    // 消息列表
    msgList:Msg[],
    // 消息状态定时器
    msgStatusTimer:Object,
    // 房间成员
    memberList:User[],
    // 声音开启状态
    soundActive:boolean,
    // 声音dom
    soundDom:any,
    // 消息id，更新用于监听变化，判断是否需要消息触底
    otherUserMsgId:number|string,
    // ai消息更新，判断是否需要触底
    aiCode:number|string,
    // 强制触底标识
    forceBottom:number|string,
    // 输入框是否允许输入
    editorDisabled:boolean
}

const customSnowflake = new CustomSnowflake();


const useAppStore = defineStore('app', {
    state: ():AppState => ({
        theme:"light",
        websocketStatus:false,
        userInfo:{
            userId:'',
            userName:'',
            userAvatar:''
        },
        roomInfo:{
            roomId:'',
            roomNo:'',
            roomName:'',
            ai:AiTypeEnum.CLOSE
        },
        msgList:[],
        msgStatusTimer:{},
        memberList:[],
        soundActive:false,
        soundDom:null,
        otherUserMsgId:'',
        aiCode:'',
        forceBottom:'',
        editorDisabled:false
    }),
    getters: {},
    actions: {
        setMsgId(msgId:number|string){
            this.otherUserMsgId = msgId;
        },
        setAiCode(code:number|string){
            this.aiCode = code;
        },
        setForceBottom(code:number|string){
            this.forceBottom = code
        },
        setTheme(theme:string) {
            this.theme = theme
        },
        setUserInfo(userInfo:User) {
            this.userInfo = userInfo
        },
        setRoomInfo(roomInfo:RoomInfo) {
            this.roomInfo = roomInfo
        },
        setWebsocketStatus(status:boolean) {
            this.websocketStatus = status
        },
        sendInfo(msg:string,msgType:MsgTypeEnum,ext:undefined,callUserList:User[]){
            const msgId = customSnowflake.nextId();
            const msgInfo:Msg = {
                user:{
                    userId:this.userInfo.userId,
                    userAvatar:this.userInfo.userAvatar,
                    userName:this.userInfo.userName,
                },
                roomId:this.roomInfo.roomId,
                msgId:msgId,
                msgType:msgType,
                msg:msg,
                msgStatus:MsgStatusEnum.PENDING,
                ext:ext
            }
            this.sendInfoLocalFun(msgInfo)
            this.sendInfoNetWorkFun(msgInfo)
            if(this.roomInfo.ai === AiTypeEnum.AIZOOM){
              let aiAssistant = null
              if(callUserList.length == 1){
                aiAssistant = callUserList[0]
              }else{
                aiAssistant = AssistantsList[1]
              }
              const msgId = AiWaitMsgInfo.msgId;
              const tempMsg:Msg = {
                msgId:msgId,
                msg:AiWaitMsgInfo.msg,
                msgType:MsgTypeEnum.WAIT,
                roomId:this.roomInfo.roomId,
                user:{
                  userId:AiWaitMsgInfo.userId,
                  userAvatar:aiAssistant.userAvatar,
                  userName:aiAssistant.userName,
                }
              }
              this.editorDisabled = true;
              this.sendInfoLocalFun(tempMsg)
            }
        },
        sendInfoLocalFun(msg:Msg){
            this.msgList.push(msg)
            if(msg.user?.userId != this.userInfo.userId){
                this.setMsgId(msg.msgId as never)
            }
        },
        sendInfoNetWorkFun(msg:Msg){
            let sendMsg = new AQChatMSg.default.SendMsgCmd();
            sendMsg.setMsgid(msg.msgId);
            sendMsg.setMsgtype(msg.msgType);
            sendMsg.setMsg(msg.msg)
            sendMsg.setRoomid(this.roomInfo.roomId);
            sendMsg.setExt(msg.ext);
            AQSender.getInstance().sendMsg(
                AQChatMSg.default.MsgCommand.SEND_MSG_CMD,sendMsg
            )
            // 10s消息未发送成功，则设置消息为发送失败状态
            this.msgStatusTimer[msg.msgId] = setTimeout(()=>{
                msg.msgStatus = MsgStatusEnum.REJECTED
                for(let i = this.msgList.length - 1;i>=0;i--){
                    if(this.msgList[i].msgId === msg.msgId){
                        const newMsg = {...msg};
                        newMsg.msgStatus = MsgStatusEnum.REJECTED;
                        this.msgList.splice(i,1,newMsg)
                        break; 
                    }
                }
            },10000)
        },
        clearMsgStatusTimer(id:string){
            if(this.msgStatusTimer[id]){
                clearTimeout(this.msgStatusTimer[id]);
                delete this.msgStatusTimer[id]
            }
        },
        setMsgRecord(msg:Msg){
            if(!this.msgList.find(x=>x.msgId === msg.msgId)){
                this.msgList.unshift(msg)
            }
        },
        // 撤回聊天消息
        removeMsg(msgId:number|string,msg:any){
            for(let i=this.msgList.length-1;i>=0;i--){
                if(this.msgList[i].msgId == msgId){
                    this.msgList.splice(i,1,msg)
                    break;
                }
            }
        },
        resetAllInfo(){
            this.roomInfo = {
                roomId:'',
                roomNo:'',
                roomName:'',
                ai:AiTypeEnum.CLOSE
            }
            this.userInfo = {
                userId:'',
                userName:'',
                userAvatar:''
            }
            this.msgList = []
            this.editorDisabled = false;
        },
        resetRoomInfo(){
            this.roomInfo = {
                roomId:'',
                roomNo:'',
                roomName:'',
                ai:AiTypeEnum.CLOSE
            }
            this.msgList = []
        },
        // 新增聊天室成员
        addNumberList(user:User){
            const userObjet = this.memberList.find((x:User)=>x.userId == user.userId);
            if(!userObjet?.userId){
                this.memberList.push(user)
            }
        },
        // 删除聊天室成员
        deleteNumberList(user:User){
            this.memberList = this.memberList.filter((x:User)=>x.userId != user.userId);
        },
        // 修改声音开启状态
        setSoundActive(status:boolean){
            this.soundActive = status
        },
        // 设置消息状态
        setMsgStatus(index:number,status:MsgStatusEnum){
            this.msgList[index].msgStatus = status;
        },
        setEditorDisabled(status:boolean){
            this.editorDisabled = status;
        },
    },
    persist: {
        paths:['theme','userInfo','roomInfo']
    },
})

export default useAppStore
