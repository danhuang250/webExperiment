
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { getList, list } from './listHook'
import { getCurrentTime } from '@/utils'
import { form } from '@/views/login/loginHook'
import { addArticle,updateArticleListData } from '@/indexDb'
import router from '@/router'
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const titleData = ref('')
// 内容 HTML
const valueHtml = ref('')
const toolbarConfig = {}
const editorConfig = {
    placeholder: '请输入内容...',
     MENU_CONF: {
        uploadImage: {
            // 小于50kb  base64
            base64LimitSize: 50 * 1024
        }
    },
    maxLength:100
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

watch(valueHtml, (val) => {
    console.log(val)
})

async function handleSave() {
    const time = getCurrentTime(),
        title = titleData.value.trim(),
        id = list[0].id + 1,
        author = form.username,
        lists = toRaw(list),
        content = valueHtml.value;
    const article = { id, title, time, author, content }
    lists.unshift({ id, title, time, author })
    await Promise.all([updateArticleListData(lists), addArticle(article)]);
    ElMessage.success('添加成功');
    router.push('/home/list')
    valueHtml.value = ''
    titleData.value = ''

}
</script>

<template>
    <el-button type="primary" class="mb-2" @click="handleSave">保存</el-button>
    <el-input v-model="titleData" placeholder="请输入标题(最长十个字)" class="mb-2" maxlength="10"></el-input>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
            @onCreated="handleCreated" />
    </div>
</template>

<style lang='scss' scoped></style>
