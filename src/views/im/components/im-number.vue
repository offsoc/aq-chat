<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-05-23 11:33:03
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-06-12 14:47:49
 * @Description: 
-->
<template>
  <div class="chat-number ">
    <div class="room-txt">{{appStore.roomInfo.ai === AiTypeEnum.AIZOOM ? 'AI助手列表':'房间成员'}}({{ appStore.memberList.length }})</div>
    <div class="number-list scroll_container">
      <div class="number-item" v-for="item in appStore.memberList" :key="item.userId">
        <img v-if="item.userAvatar.indexOf('png') != -1" class="ai-avatar" :src="item.userAvatar" />
        <div v-else class="user-avatar" v-html="item.userAvatar"></div>
        <div class="user-name text-ellipsis" :title="item.userName">{{ item.userName }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AiTypeEnum from '@/enums/AiTypeEnum'
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()


</script>

<style lang="less" scoped>
.chat-number {
  width: 20%;
  height: 100%;
  border-left: 1px solid var(--member-boder);
  padding: 20px;
  .room-txt{
    width: 100%;
    text-align: center;
    color: var(--txt-color);
    font-size: 14px;
  }
  .number-list{
    height: calc(100% - 20px);
  }
  .number-item {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .user-name{
      width: calc(100% - 30px - 10px);
      text-align: left;
      color: var(--txt-color);
    }
    .ai-avatar{
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 6px;
      margin-left: -4px;
    }
    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>