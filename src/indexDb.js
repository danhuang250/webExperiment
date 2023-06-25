// 约定  id为0 就是所有文章的简易信息 其他的就是文章的详细信息
import { getCurrentTime } from './utils.js';

const dbName = 'webExperiment';
const storeName = 'article';
// 数据库版本号（自定义）
const dbVersion = 1;
// 数据库对象
let db;

// 添加文章详情
export function addArticle(article) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    // 获取可以进行数据增删改查的objectStore对象
    const objectStore = transaction.objectStore(storeName);
    objectStore.add(article);
    transaction.oncomplete = () => {
      resolve();
    };
  });
}

// 批量删除文章详情
export function deleteArticles(ids) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    // 获取可以进行数据增删改查的objectStore对象
    const objectStore = transaction.objectStore(storeName);
    ids.forEach((id) => {
      objectStore.delete(id);
    });
    transaction.oncomplete = () => {
      resolve();
    };
  });
}

// 更新文章列表数据
export function updateArticleListData(data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    // 获取可以进行数据增删改查的objectStore对象
    const objectStore = transaction.objectStore(storeName);
    const userRequest = objectStore.put({
      id: 0,
      data,
    });
    userRequest.onsuccess = (event) => {
      resolve();
    };
  });
}

// 获取文章详情
export function getArticle(id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    // 获取可以进行数据增删改查的objectStore对象
    const objectStore = transaction.objectStore(storeName);
    const userRequest = objectStore.get(id);
    userRequest.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
}

// 获取文章列表
export function getArticleList() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    // 获取可以进行数据增删改查的objectStore对象
    const objectStore = transaction.objectStore(storeName);
    const userRequest = objectStore.get(0);
    userRequest.onsuccess = (event) => {
      resolve(event.target.result.data);
    };
  });
}

// 初始化db
export function iniDB() {
  return new Promise((resolve, reject) => {
    // 打开数据库
    const request = indexedDB.open(dbName, dbVersion);
    // 打开数据库失败
    request.onerror = (e) => {
      reject(e);
    };
    // 打开数据库成功
    // onupgradeneeded 完成 这个才触发这个回调
    request.onsuccess = (e) => {
      db = e.target.result;

      const transaction = db.transaction(storeName, 'readwrite');
      // 获取可以进行数据增删改查的objectStore对象
      const objectStore = transaction.objectStore(storeName);
      const userRequest = objectStore.get(0);
      // 查询成功  数据不存在也是查询成功
      userRequest.onsuccess = (event) => {
        // 第一次初始化数据数据库
        if (!event.target.result) {
          let listData = [];
          for (let i = 1; i <= 20; i++) {
            listData.unshift({
              id: i,
              time: getCurrentTime(i),
              title: `文章${i}`,
              author: 'danhuang250',
            });
          }

          objectStore.add({
            id: 0,
            data: listData,
          });
          listData.forEach((item) => {
            objectStore.add({
              ...item,
              content: `<p>这是第${item.id}篇文章的内容</p>`,
            });
          });
        }
      };
      transaction.oncomplete = () => {
        resolve(e);
      };
    };
    request.onupgradeneeded = (event) => {
      // 数据库对象
      db = event.target.result;
      // 创建一个名为 storeName 数据库对象仓库（创建一个数据表）{ keyPath: "id" } 不用修改
      db.createObjectStore(storeName, { keyPath: 'id' });
    };
  });
}
