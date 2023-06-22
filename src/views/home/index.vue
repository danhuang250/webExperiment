<script setup>
import { form } from '@/views/login/loginHook.js'
import router from '@/router/index.js'
</script>

<template>
    <header class="sticky z-50 h-6 top-0 bg-white">
        <div class="flex items-end justify-end">
            {{ form.username }}
            <router-link to="/home/add" class="mx-10 text-blue-600" v-if="router.currentRoute.value.path==='/home/list'">发帖</router-link>
            <router-link to="/home/list" class="mx-10 text-blue-600" v-else>返回</router-link>
        </div>
    </header>
    <main class="w-[80%] mx-auto">
        <router-view />

    </main>
</template>

<style lang='scss' scoped></style>
