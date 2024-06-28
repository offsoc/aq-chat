<template>
  <div class="cn_notify">
    <div class="content">
      <i class="el-icon-message-solid"></i>
      您的Star是我们更新的动力，期待您的⭐
    </div>
    <el-row justify="end">
      <el-col :span="7">
        <el-button type="warning" @click="onSubmit">去Star</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
const onSubmit = ()=>{
  window.open('https://gitee.com/howcode/aq-chat-server')
}
</script>
<style lang='less' scoped>
.cn_notify {
  .content {
    padding: 20px 0;
  }
  .footer {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>

