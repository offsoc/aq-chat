<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-06-29 22:56:58
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-07-01 00:41:58
 * @Description: 
-->
<template>
  <div class="cn-notify">
    <div class="content">
      <div class="lottie-star">
        <lottie-ani :src="lottieStar" />
      </div>
      您的<span class="origin">Star</span>是我们更新的动力，期待您的⭐
    </div>
    <div class="flex">
      <span>后 端仓库：去</span>
      <span class="star" @click="toStar('https://gitee.com/howcode/aq-chat-server')">⭐</span>
      <!-- <img @click="toStar('https://gitee.com/howcode/aq-chat-server')" class="pointer" src='https://gitee.com/howcode/aq-chat/badge/star.svg?theme=dark' alt='star' /> -->
    </div>
    <div class="flex">
      <span>PC端仓库：去</span>
      <span class="star" @click="toStar('https://gitee.com/howcode/aq-chat')">⭐</span>
      <!-- <img @click="toStar('https://gitee.com/howcode/aq-chat')" class="pointer" src='https://gitee.com/howcode/aq-chat-server/badge/star.svg?theme=dark' alt='star' /> -->
    </div>
    <div class="flex">
      <span>H5端仓库：去</span>
      <span class="star" @click="toStar('https://gitee.com/ghosthhf/aqchat-mobile')">⭐</span>
      <!-- <img @click="toStar('https://gitee.com/ghosthhf/aqchat-mobile')" class="pointer" src='https://gitee.com/ghosthhf/aqchat-mobile/badge/star.svg?theme=dark' alt='star' /> -->
    </div>
  </div>
</template>
<script setup>
import LottieAni from "@/components/Lottie.vue";
import lottieStar from "@/assets/json/lottie-star.json";
const toStar = (href)=>{
  window.open(href)
}
</script>
<style lang='less' scoped>
.cn-notify {
  .flex{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
  }
  .origin {
    color: #ECB00D;
  }
  .star{
    font-size: 24px;
    cursor: pointer;
    transition: all .5s;
    margin-left: 5px;
    &:hover{
      transform: scale(1.4) rotate(360deg);
    }
  }
  .content {
    padding: 20px 0;
    .lottie-star{
      height: 200px!important;
    }
  }
}
</style>

