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
<div :loading="!init">
  <router-view/>
</div>
</template>

<style scoped>
</style>
