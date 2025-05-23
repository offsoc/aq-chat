<template>
  <div :height="135" class="edit-box">
    <div class="editor">
      <div ref="chatElm" class="input-editor"></div>
    </div>
    <el-tooltip :visible="showPopover" placement="bottom">
      <template #content>
        <span> {{ msgTip }} </span>
      </template>
      <el-button type="primary" :disabled="appStore.editorDisabled" class="send-btn" title="按enter键发送，按ctrl+enter键换行"
          @click="sendVerify">发送(S)</el-button>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount,watch } from 'vue'
import ChatArea from 'chatarea'
import 'chatarea/lib/ChatArea.css'
import MsgTypeEnum from "@/enums/MsgTypeEnum"
import useAppStore from "@/store/modules/app"
import User from '@/class/User'
import AiTypeEnum from '@/enums/AiTypeEnum'
import { ElMessage } from 'element-plus'

const chat = ref();
const appStore = useAppStore()
const showPopover = ref(false)
const chatElm = ref()
let memberList:Array<User> = [];
const initChat = () => {
  // 实例chat对象
  chat.value = new ChatArea({
    elm: chatElm.value,
    placeholder: '',
    needCallEvery:false,
    userProps: {
        id: 'userId',
        name: 'userName',
        avatar:'userAvatar',
        pinyin:'pinyin'
    },
    userList: []
  })
  const title = appStore.roomInfo.ai === AiTypeEnum.AIZOOM ? 'AI助手':'房间成员'
  chat.value.revisePCPointDialogLabel({
      title: title,
      checkLabel: ''
  })
  // 绑定键盘发送事件（默认配置为回车发送）
  chat.value.enterSend = sendVerify
}
const msgTip = ref('')

const initUserList = ()=>{
  let list = memberList.map(x=>{
    return {
      userId:x.userId,
      userName:x.userName,
      userAvatar:x.userAvatar.indexOf('png') != -1 ? x.userAvatar : svgToDataURL(x.userAvatar)
    }
  })
  setTimeout(()=>{
    if (!chat.value) return
    chat.value.updateUserList(list)
  },500)
}

const svgToDataURL = (html:any)=> {
  const toolElm = document.createElement('div')
  toolElm.innerHTML = html
  const svgElement = toolElm.firstChild
  if(!svgElement) return null
  return 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(svgElement))
}

// 发送校验
const sendVerify = ()=> {
  if (!chat.value) return
  if(appStore.editorDisabled){
    ElMessage.warning("正在生成中..")
    return
  }
  if(chat.value.isEmpty(true)){
    showPopover.value = true;
    msgTip.value = '不能发送空白消息'
    setTimeout(() => {
      showPopover.value = false;
    }, 1000);
    return;
  }
  const sendContent = chat.value.getHtml({needUserId: true})
  if(!sendContent) return
  // 获取聊天框中@人员
  const callUserList = chat.value.getCallUserList()
  let extArray = callUserList.map((x:any)=>x.userId);
  extArray = extArray.map((element:string) => "@"+element);
  let ext = extArray.join(',');
  // 获取聊天框text内容，使用&拼接，用于给ai分析纯文本内容
  const textMsg = chat.value.getText()
  ext+=`&${textMsg}`
  appStore.setForceBottom(+new Date())
  appStore.sendInfo(sendContent,MsgTypeEnum.TEXT,ext,callUserList);
  // 清空聊天框
  chat.value.clear()
}

// 更新消息列表
watch(() => appStore.memberList, (newV:any) => {
  memberList = newV.filter((x:User)=>x.userId != appStore.userInfo.userId);
  if(memberList.length > 0){
    initUserList();
  }
}, { immediate:true,deep: true })

// watch(() => appStore.editorDisabled, (newV:any) => {
//   if(newV){
//     chat.value.disabled()
//   }else{
//     chat.value.enable()
//   }
// },)

onMounted(() => {
  initChat()
})

onBeforeUnmount(() => {
  // 释放实例
  chat.value && chat.value.dispose()
})


defineExpose({
  chat
})
</script>

<style scoped lang="less">
.edit-box {
  position: relative;
  width: 100%;
  height: 70%;
  border: 1px solid var(--member-boder);
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
  .editor {
    text-align: left;
    height: 66%;
    .input-editor{
      height: 100%;
      overflow-y: auto;
      /deep/ .chat-rich-text {
        color: #000;
      }
    }
  }
  /deep/ .chat-rich-text{
    height: 100%;
  }
  /deep/ .w-e-text p{
    margin:0;
    line-height: 22px;
  }
  /deep/ .w-e-text-container .placeholder{
    line-height: 0;
  }

  /deep/ .w-e-toolbar{
    border-bottom:none!important;
    border:none!important;
  }

  /deep/ .w-e-text-container {
    border: none !important;
    height: 100% !important;
    z-index: 10 !important;
    >div {
      // min-height: 120px;
    }
  }

  .send-btn {
    position: absolute;
    bottom: 5px;
    right: 10px;
    background-color: @im-primary;
  }
}
</style>