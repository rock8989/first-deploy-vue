import Vue from 'vue'
import VueRouter from 'vue-router'
import PopupRegister from '@/views/popup/PopupRegister.vue'
import Layout from '@/components/Layout.vue'
import NotFound from '@/404.vue'

Vue.use(VueRouter)

const routes = [

   { path: '/login', component: () => import('@/views/login/index.vue'), hidden: true },

   {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'registration',
        name: 'Registration',
        component: () => import('@/views/registraion/Registration')
      },
    ]
  },
   
   {
    path: '/',
    component: Layout,
    redirect: '/helloWorld',
    name: 'HelloWorld',
    hidden: true,
    children: [{
      path: 'helloworld',
      component: () => import('@/views/HelloWorld')
    }]
  },
  {
    path: '/notice',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'NoticeList',
        component: () => import('@/views/notice/NoticeList.vue'),
      },
      {
        hidden: true,
        path: 'register',
        name: 'NoticeRegister',
        component: () => import('@/views/notice/NoticeRegister.vue')
      },
      {
        hidden: true,
        path: 'detail',
        name: 'NoticeDetail',
        component: () => import('@/views/notice/NoticeDetail.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'popupRegister',
        name: 'PopupRegister',
        component: () => import('@/views/popup/PopupRegister')
      },
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '*',
        name: 'NotFound',
        component: () => import('@/404')
      },
    ]
  },
]

export default new VueRouter({
  routes
})





