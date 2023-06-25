<script setup>
import { list } from './listHook'
import { updateArticleListData, deleteArticles, getArticleList } from '@/indexDb'
import {getList} from './listHook'
import router from '@/router';
import { onMounted } from 'vue';
const currentPage = ref(1),
    pageSize = ref(5);
function sizeChange(size) {
    pageSize.value = size;
    currentPage.value = 1;
}
function currentChange(page) {
    currentPage.value = page;
}
const deleteData = ref([])
function handleSelectionChange(val) {
    deleteData.value = val
}
async function deleteArticle() {
    // 过滤list中存在deleteData的数据
    const afterList = list.filter(item => {
        return !deleteData.value.some((value) => {
            return value.id === item.id;
        });
    }).map(item => {
        return toRaw(item)
    })
    await Promise.all([updateArticleListData(afterList), deleteArticles(deleteData.value.map((item) => item.id))]);
    getList()
    ElMessage.success('删除成功');
}
const showData = computed(() => {
    return list.slice(pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value);
});

onMounted(() => {
   getList()
})
</script>

<template>
    <el-button type="danger" class="mb-3" @click="deleteArticle"> 删除</el-button>
    <!-- 帖子前面有个复选框很奇怪的需求  他奇怪我也奇怪，简单点搞个表格 -->
    <el-table ref="multipleTableRef" :data="list.slice(pageSize * (currentPage - 1), pageSize * currentPage)"
        style="width: 100%" @selection-change="handleSelectionChange" row-key="id">
        <el-table-column type="selection" min-width="10%" />
        <el-table-column property="time" label="发布时间" min-width="30%" />
        <!-- 傻逼 bug  不要在list页面刷新 -->
        <el-table-column label="标题" min-width="45%">
            <template #default="scope">
                <div @click="() => {
                    router.push(`/home/article/${scope.row.id}`)
                }" class="cursor-pointer">
                    {{ scope.row.title }}
                </div>
            </template>
        </el-table-column>
        <el-table-column property="author" label="author" min-width='15%' />
    </el-table>
    <el-pagination class="justify-center mt-3" :current-page="currentPage" :page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :total="list.length"
        @size-change="sizeChange" @current-change="currentChange" />
</template>

<style lang='scss' scoped></style>
