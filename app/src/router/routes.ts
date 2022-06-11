import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'pricing',
        name: 'Pricing',
        component: () => import('pages/Pricing.vue')
      },
      {
        path: 'faq',
        name: 'Faq',
        component: () => import('pages/Faq.vue')
      },
      {
        path: 'blog/:slug',
        name: 'BlogArticle',
        component: () => import('pages/BlogArticle.vue')
      },
      {
        path: 'blog',
        name: 'Blog',
        component: () => import('pages/Blog.vue')
      },
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
      }
    ]
  }
]

export default routes
