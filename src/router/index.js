import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
// 空壳子 根据实际需求调整
router.beforeEach((to, from, next) => {
  if (to.path == '/user/login' || to.path == '/user/register') {
    next();
  } else {
    const token = localStorage.getItem('token');
    if (token === null || token === '') {
      next('/user/login');
    } else {
      next();
    }
  }
});
export default router