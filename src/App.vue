<script setup>
import { iniDB } from '@/indexDb'

// 数据库初始化完成
var init = ref(false)
onMounted(async () => {
  await iniDB();
  console.log('数据库初始化完成')
  init.value = true
})
</script>

<template>
  <router-view  :loading="!init"/>
</template>

<style scoped>
</style>
