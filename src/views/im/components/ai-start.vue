<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-06-29 22:56:58
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-07-01 19:30:27
 * @Description: 
-->
<template>
  <div class="cn-notify">
    AI Space是与
    <el-link type="danger" style="color: #E20316;" @click="link('https://ai.gitee.com/serverless-api')">Gitee AI</el-link>
    联合推出的新型房间，意为用户提供智能问答、图像生成、语音处理等多种服务，是否开启AI空间体验？
  </div>
</template>
<script setup>
const link = (href)=>{
  window.open(href)
}
</script>
<style lang='less' scoped>
.cn-notify {
  
}
</style>

