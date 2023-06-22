import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    path:'/' ,
    redirect:'/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
    redirect: '/home/list',
    children: [
      {
        path: 'list',
        component: () => import('@/views/home/component/list.vue'),
      },
      {
        path: 'add',
        component: () => import('@/views/home/component/add.vue'),
      },
      {
        path: 'article/:id',
        component: () => import('@/views/home/component/article.vue'),
      },
    ],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
