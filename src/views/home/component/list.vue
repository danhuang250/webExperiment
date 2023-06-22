<script setup>
import { list as tableData } from './listHook'
</script>

<template>
    <!-- 帖子前面有个复选框很奇怪的需求  他奇怪我也奇怪，简单点搞个表格 -->
    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" min-width="10%" />
        <el-table-column property="time" label="发布时间" min-width="30%" />

        <el-table-column label="标题" min-width="45%">
            <template #default="{ row }">
                <div>
                    <router-link :to="`/home/article/${row.id}`">{{ row.title }}</router-link>
                </div>
            </template>
        </el-table-column>
        <el-table-column property="author" label="author" min-width='15%' />
    </el-table>
</template>

<style lang='scss' scoped></style>
