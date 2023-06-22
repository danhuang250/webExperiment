<script setup>
import { form } from './loginHook.js'
import router from '@/router/index.js'
var loading = ref(false)
function onLogin() {
  loading.value = true;
  // 模拟登录 不做任何校验 且也不阻止浏览器后退(有bug  但简单点)
  setTimeout(() => {
    loading.value = false;
    router.push({ path: '/home' })
    ElMessage.success('登录成功')
  }, 1000)
}


</script>

<template>
  <div class="flex items-center justify-center flex-wrap w-f mt-[10%]">
    <div class="w-full text-center mb-10">简易论坛</div>
    <el-form :model="form" class="w-2/5">
      <el-form-item prop="username">
        <el-input clearable v-model="form.username" placeholder="用户名">
          <template #prefix>
            <i-ep-user />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input clearable v-model="form.password" placeholder="密码" show-password>
          <template #prefix>
            <i-ep-lock />
          </template>
        </el-input>
      </el-form-item>
      <el-button class="w-full mt-4" size="default" type="primary" :loading="loading" @click="onLogin()">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<style lang='scss' scoped></style>
