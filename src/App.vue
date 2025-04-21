<script setup>
// 导入 RouterView 组件，用于渲染匹配的路由组件
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- 根元素，包裹整个应用 -->
  <div id="app">
    <!-- 头部区域，包含应用标题 -->
    <header>
      <h1>Vue + SpringBoot 整合示例</h1>
    </header>
    <!-- 主要内容区域，用于展示路由组件 -->
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
/* 应用整体样式 */
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>