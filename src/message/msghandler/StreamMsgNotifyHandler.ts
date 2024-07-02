/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-06-13 17:06:23
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-07-02 11:11:27
 * @Description: 
 */
import * as AQChatMSg from '../protocol/AQChatMsgProtocol_pb';

export default class AIMsgHandler {

    handle(msgAck: AQChatMSg.default.StreamMsgNotify) {
        if(msgAck == null){
            return;
        }
        return {
            roomId:msgAck.getRoomid(),
            msg:msgAck.getContent(),
            msgId:msgAck.getMsgid(),
            streamType:msgAck.getStreamtype(),
            userAvatar:msgAck.getUser()?.getUseravatar(),
            userId:msgAck.getUser()?.getUserid(),
            userName:msgAck.getUser()?.getUsername(),
        }
    }
}