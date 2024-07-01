<template>
  <div class="im-domain transition-effect">
    <div class="option-list">
      <div class="option" @click="createRoomFun">
        <i class="iconfont icon-create"></i>
        <div class="txt">创建</div>
      </div>
      <div class="option" @click="joinRoomFun">
        <i class="iconfont icon-join"></i>
        <div class="txt">加入</div>
      </div>
      <div class="option" @click="createAiFun">
        <lottie-ani class="icon-ai" :src="lottieAi" />
        <div class="txt">AI空间</div>
      </div>
    </div>
    <div class="lottie-box">
      <lottie-ani :src="lottieContent" />
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    width="580px"
    class="pop-start"
  >
    <div class="tip-content">
      <div class="form-info">
        <el-form :model="roomForm" label-width="160px" ref="roomFormRef" :rules="rules">
          <el-form-item :inline-message="true" class="form-item" prop="roomNo" label="房间号">
            <el-input ref="roomNoRef" placeholder="请输入房间号" v-integer clearable v-model="roomForm.roomNo" />
          </el-form-item>
          <template v-if="step == 1">
            <el-form-item :inline-message="true" class="form-item" label="房间名" prop="roomName">
              <el-input style="height: 40px;" placeholder="请输入房间名" clearable v-model="roomForm.roomName" />
            </el-form-item>
            <el-row>
              <el-col :span="10">
                <el-form-item :inline-message="true" class="form-item" label="开启AI" prop="ai">
                  <el-switch
                    v-model="roomForm.ai"
                    inline-prompt
                    active-text="是"
                    inactive-text="否"
                    :active-value="1"
                    :inactive-value="0"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :inline-message="true" class="form-item" label="允许查看全部聊天信息" prop="history">
                  <el-switch
                    v-model="roomForm.history"
                    inline-prompt
                    active-text="是"
                    inactive-text="否"
                    :active-value="1"
                    :inactive-value="0"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </template>
        </el-form>
      </div>
      
      <button :class="['next-btn',,!appStore.websocketStatus && 'init-fail']" @click="enterRoomFun">
        {{ step == 1 ? '创建' : '加入' }}
        <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
          <path
            clip-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref,nextTick,reactive,h } from "vue"
import useAppStore from "@/store/modules/app"
import LottieAni from "@/components/Lottie.vue";
import lottieContent from "@/assets/json/lottie-content.json";
import lottieAi from "@/assets/json/lottie-ai.json";
import { ElMessageBox,FormRules  } from 'element-plus'
import AQSender from '@/message/AQSender'
import * as AQChatMSg from '@/message/protocol/AQChatMsgProtocol_pb'
import { useRouter } from "vue-router";
import AiTypeEnum from "@/enums/AiTypeEnum"
import aiStart from "./ai-start.vue"

interface RoomForm {
  roomNo:string,
  roomName?:string,
  history?:number,
  ai?:AiTypeEnum.CLOSE,
}
const appStore = useAppStore()
const step = ref(0);
const dialogVisible = ref(false)
const roomForm = ref<RoomForm>({
  roomNo:'',
  roomName:'',
  history:1,
  ai:AiTypeEnum.CLOSE
})
const router = useRouter();
const roomNoRef = ref()
const rules =  reactive<FormRules<RoomForm>>({
  roomNo: [
    { required: true, message: '请输入房间号', trigger: 'change' },
    { min: 4, max: 8, message: '长度在4~8之间', trigger: 'change' },
  ],
  roomName: [
    { required: true, message: '请输入房间名', trigger: 'change' },
    { min: 2, max: 10, message: '长度在2~10之间', trigger: 'change' },
  ],
})
const roomFormRef = ref();

// v-integer指令
const vInteger = {
  mounted: (el: any) => {
    el.addEventListener('input', event => {
      const value = event.target.value;
      roomForm.value.roomNo = value.replace(/\D/g, ''); // 只保留数字
      event.target.value = value.replace(/\D/g, ''); // 只保留数字
    });
  }
}

// 创建ai空间
const createAiFun = ()=>{
  if(!appStore.websocketStatus){
    ElMessageBox.confirm("服务已关闭，是否重新登录", "系统提示", {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: "warning",
    }).then(res=>{
      router.replace({
        name:'Index'
      })
      appStore.resetAllInfo();
    })
    return
  }
  ElMessageBox({
    title: '准备起飞',
    message:h(aiStart),
    showCancelButton: true,
    confirmButtonText: 'AI空间，启动！',
    cancelButtonText: '我再想想',
  }).then(res=>{
    let msg = new AQChatMSg.default.OpenAiRoomCmd();
    msg.setUserid(appStore.userInfo.userId);
    AQSender.getInstance().sendMsg(
      AQChatMSg.default.MsgCommand.OPEN_AI_ROOM_CMD,msg
    )
  })
  // ElMessageBox.confirm("AI空间是基于 Gitee AI 研发的 Serverless 推理引擎，为用户提供文本生成、图像生成、语音处理等多种主流模型，是否开启AI空间体验？", "系统提示", {
  //   confirmButtonText: 'AI空间，启动！',
  //   cancelButtonText: '我再想想',
  // }).then(res=>{
  //   let msg = new AQChatMSg.default.OpenAiRoomCmd();
  //   msg.setUserid(appStore.userInfo.userId);
  //   AQSender.getInstance().sendMsg(
  //     AQChatMSg.default.MsgCommand.OPEN_AI_ROOM_CMD,msg
  //   )
  // })
}
// 创建房间
const createRoomFun = ()=>{
  if(!appStore.websocketStatus){
    ElMessageBox.confirm("服务已关闭，是否重新登录", "系统提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: "warning",
      }).then(res=>{
        router.replace({
          name:'Index'
        })
        appStore.resetAllInfo();
      })
    return
  }
  
  step.value = 1;
  initForm();
}
// 初始化表单
const initForm = ()=>{
  dialogVisible.value = true
  roomForm.value.roomName = '';
  roomForm.value.roomNo = '';
  roomForm.value.ai = 0;
  roomForm.value.history = 1;
  nextTick(()=>{
    roomFormRef.value.resetFields()
    setTimeout(()=>{
      roomNoRef.value.focus();
    },500)
  })
}
// 加入房间
const joinRoomFun = ()=>{
  if(!appStore.websocketStatus){
    ElMessageBox.confirm("服务已关闭，是否重新登录", "系统提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: "warning",
      }).then(res=>{
        router.replace({
          name:'Index'
        })
        appStore.resetAllInfo();
      })
    return
  }
  step.value = 2;
  initForm();
}
// 进入聊天室
const enterRoomFun = async ()=>{
  if(!appStore.websocketStatus){
    ElMessageBox.confirm("服务已关闭，是否重新登录", "系统提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: "warning",
      }).then(res=>{
        router.replace({
          name:'Index'
        })
        appStore.resetAllInfo();
      })
    return
  }
  if(step.value == 1){
    if (!roomFormRef.value) return
    await roomFormRef.value.validate((valid:any, fields:any) => {
      if (valid) {
        let msg = new AQChatMSg.default.CreateRoomCmd();
        msg.setRoomno(roomForm.value.roomNo.toString());
        if(roomForm.value.roomName){
          msg.setRoomname(roomForm.value.roomName.trim());
        }
        msg.setHistory(roomForm.value.history);
        msg.setAi(roomForm.value.ai);
        AQSender.getInstance().sendMsg(AQChatMSg.default.MsgCommand.CREATE_ROOM_CMD,msg)
      } else {
        console.log('error submit!', fields)
      }
    })
  }else if(step.value == 2){
    if (!roomFormRef.value) return
    await roomFormRef.value.validate((valid:any, fields:any) => {
      if (valid) {
        let msg = new AQChatMSg.default.JoinRoomCmd();
        msg.setRoomno(roomForm.value.roomNo);
        AQSender.getInstance().sendMsg(
          AQChatMSg.default.MsgCommand.JOIN_ROOM_CMD,msg
        )
      } else {
        console.log('error submit!', fields)
      }
    })
  }
}
</script>
<style>
.pop-start {
  background: var(--bg-color);
  border-radius: 10px;
}
</style>
<style lang="less" scoped>
.pop-start{
  .tip-content {
    box-shadow: none;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    position: relative;
    &::after {
      content: "";
      display: table;
      clear: both;
    }
   
    .next-btn {
      float: right;
      position: relative;
      transition: all 0.3s ease-in-out;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
      padding-block: 0.5rem;
      padding-inline: 1.25rem;
      background-color: @im-primary;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #ffff;
      gap: 10px;
      font-weight: bold;
      border: 3px solid #ffffff4d;
      outline: none;
      overflow: hidden;
      font-size: 15px;
      margin-top: 40px;
      &:hover {
        transform: scale(1.05);
        border-color: #fff9;
      }
      &:hover .icon {
        transform: translate(4px);
      }
      &:hover::before {
        animation: shine 1.5s ease-out infinite;
      }
      &::before {
        content: "";
        position: absolute;
        width: 100px;
        height: 100%;
        background-image: linear-gradient(
          120deg,
          rgba(255, 255, 255, 0) 30%,
          rgba(255, 255, 255, 0.8),
          rgba(255, 255, 255, 0) 70%
        );
        top: 0;
        left: -100px;
        opacity: 0.6;
      }
      .icon {
        width: 24px;
        height: 24px;
        transition: all 0.3s ease-in-out;
      }
    }

    @keyframes shine {
      0% {
        left: -100px;
      }

      60% {
        left: 100%;
      }

      to {
        left: 100%;
      }
    }

    .form-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-form{
        width: 100%;
      }
      .form-item{
        position: relative;
        display: flex;
        align-items: center;
        color: var(--txt-color);
        margin-top: 40px;
        margin-bottom:0;
        width: 100%;
        .el-input{
          outline: none;
          border: none;
          height: 40px;
          width: 255px;
          border-radius: 17px;
          background: #ffffff;
          box-shadow: inset 6px 6px 8px #cfcfcf,
                      inset -6px -6px 8px #ffffff;
          padding: 0 10px;
          text-align: center;
          
        }
        /deep/ .el-input__wrapper{
          background-color: transparent;
          box-shadow:none;
          outline: none;
          border: none;
        }
      }
    }
    .popup-header {
      height: 100px;
      width: 60%;
      transform: scale(2);
      position: absolute;
      top: -80px;
      left: 0%;
      transform: translateX(-50%);
    }
  }
}
.im-domain {
  height: 100%;
  width: 100%;
  border-radius: 30px;
  background: var(--im-list-bg);
  display:flex;
  flex-direction: column-reverse;
  align-items: end;
  position: relative;
  .lottie-box{
    width: 60%;
    height: 80%;
    transition: all 0.5s;
    margin-left: 80px;
    margin-bottom: 60px;
    display: flex;
    align-items: center;
    &:hover {
      transform: scale(1.1);
    }
  }
  .option-list{
    display:flex;
    align-items: center;
    justify-content: space-around;
    width: 400px;
    position: absolute;
    top: 100px;
    left: 20px;
    .option{
      height: 100px;
      width: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      justify-items: center;
      background-color: @im-primary;
      border-radius: 16px;
      color: #fff;
      cursor: pointer;
      transition: 500ms;
      position: relative;
      transition: all .5s;
      &:active {
        transform: translate(3px , 3px);
        transition-duration: .3s;
        box-shadow: 2px 2px 0px @im-primary;
      }
      .txt{
        transition: all .6s;
      }
      &:hover {
        .txt{
          color: transparent;
        }
        .iconfont {
          transform: translateY(10px);
          font-size: 50px;
        }
        .icon-ai{
          // transform: translateY(10px) scale(1.5);
          transform: translateY(10px);
          height: 55%!important;
          .txt{
            transform: translateY(10px)
          }
        }
      }
      .iconfont {
        fill: white;
        transition-duration: .3s;
      }
      .icon-create {
        font-size: 34px;
        margin-bottom: 6px;
      }
      .icon-join {
        font-size: 34px;
        margin-bottom: 10px;
      }
      .icon-ai{
        transform: translateY(-5px);
        height: 45%!important;
        transition: all .5s;
      }
    }
  }
  
}
</style>