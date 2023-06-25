import { getArticleList } from '@/indexDb.js';

// 表格简易的数据  只有id time title author
export const list = reactive([]);

// list 初始化从indexDB中获取

export const getList = () => {
 return getArticleList().then((data) => {
    list.length = 0;
    list.push(...data);
  });
};
