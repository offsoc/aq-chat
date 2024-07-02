<!--
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:08:20
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-07-02 22:24:44
 * @Description: 
-->
<template>
  <div class="app-container">
    <el-switch
      class="theme-btn"
      size="large"
      style="--el-switch-on-color: #4D5FFF;"
      v-model="themeActive"
      @change="changeThemeFun"
    >
      <template #active-action>
        <i class="iconfont icon-light"></i>
      </template>
      <template #inactive-action>
        <i class="iconfont icon-dark"></i>
      </template>
    </el-switch>
    <div v-if="currentUrl != 'IM'" class="menu-list">
      <div :class="['menu-item',currentUrl == 'Index' && 'menu-active']" @click="toLink('Index')">
        <i class="iconfont icon-home"></i>主页
      </div>
      <span :class="['menu-item',currentUrl == item.url && 'menu-active']" v-for="item in menuList" :key="item.title" @click="toLink(item.url)">{{  item.title }}</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref,h, watch } from "vue";
import useAppStore from "./store/modules/app"
import useSocket from "./hooks/useSocket"
import { useRouter,useRoute } from "vue-router";
import CnNotify from "@/components/CnNotify.vue";
import { ElNotification } from 'element-plus'

const themeActive = ref(false);
const appStore = useAppStore()
const {
  initSocketFun
} = useSocket()
const menuList = [
  {
    title:'特别鸣谢',
    url:'Thanks'
  }
]
const router = useRouter();
const route = useRoute();
const currentUrl = ref('')

watch(() => route.name, (newV) => {
  currentUrl.value = newV
}, { immediate:true })

const toLink = (path)=>{
  router.push({
    name:path
  })
}
// 切换主题
const changeThemeFun = ()=> {
  if (themeActive.value) {
    document.documentElement.className = "theme-light";
    appStore.setTheme("light");
  } else {
    document.documentElement.className = "theme-dark";
    appStore.setTheme("dark");
  }
};
const starTip = () => {
  ElNotification.closeAll();
  setTimeout(()=>{
    ElNotification({
      title: '',
      duration: 10000,
      position: "top-right",
      dangerouslyUseHTMLString: true,
      message: h(CnNotify)
    })
  },1000)
}

onMounted(() => {
  themeActive.value = appStore.theme === "light" ? true : false
  changeThemeFun()
  initSocketFun();
  starTip()
  currentUrl.value = route.name
});
</script>

<style lang="less" scoped>
.app-container{
  height: 100%;
  width: 100%;
  min-width: 1000px;
  position: relative;
  .menu-list{
    position: absolute;
    top: 120px;
    left: 30px;
    z-index: 10;
    ::v-deep .el-link{
      color: var(--txt-color);
    }
    .menu-active{
      color: @im-primary!important;
    }
    .menu-item{
      color: var(--txt-color);
      cursor: pointer;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      &:hover{
        color: @im-primary!important;
      }
      .iconfont {
        font-size: 18px;
      }
    }
  }
  .theme-btn{
    display: flex;
    position: absolute;
    top: 50px;
    left: 30px;
    z-index: 10;
    .iconfont{
      font-size: 14px;
    }
  }
}
</style>
