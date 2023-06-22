import { getArticleList } from '@/indexDb.js';

// 表格简易的数据  只有id time title author
export const list = reactive([]);

// list 初始化从indexDB中获取
getArticleList().then((data) => {
  list.push(...data);
});

