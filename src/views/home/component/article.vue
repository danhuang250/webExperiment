<script setup>
import router from '@/router';
import { onMounted } from 'vue';
import { getArticle } from '@/indexDb'
const id = router.currentRoute.value.params.id;
const content = ref('')
const title = ref('')
onMounted(() => {
    // 获取文章详情
    getArticle(Number(id)).then(res => {
        content.value = res.content;
        title.value = res.title;
    })
})
</script>

<template>
    <h1 class="mb-2">标题:{{ title }}</h1>
    <div v-html="content">
    </div>
</template>

<style lang='scss' scoped></style>
