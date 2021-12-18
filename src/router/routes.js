const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Index.vue'), name: "Home", meta: {
          showMenu: true, statusBarStyle: { color: '#5455e5' }
        }
      },
      {
        path: 'materials', component: () => import('pages/materials.vue'), name: "Materials", meta: {
          showMenu: true, statusBarStyle: { color: '#5455e5' }
        }
      },
      {
        path: 'syllabus', component: () => import('pages/syllabus.vue'), name: "syllabus",
        meta: {
          showMenu: true, statusBarStyle: { color: '#5455e5' }
        }
      },
      {
        path: 'calender', component: () => import('pages/calender.vue'), name: "Calender",
        meta: {
          showMenu: true, statusBarStyle: { color: '#5455e5' }
        }
      },
      {
        path: 'share', component: () => import('pages/share.vue'), name: "Share App",
        meta: {
          showMenu: true, statusBarStyle: { color: '#5455e5' }
        }
      },
      {
        path: 'timeTable', component: () => import('pages/timeTable.vue'), name: "Time Table",
        meta: {
          showMenu: true, statusBarStyle: { color: '#5455e5' }
        }
      },
      {
        path: 'forum', component: () => import('pages/forum.vue'), name: "Forum",
        meta: {
          showMenu: false, statusBarStyle: { color: '#5455e5' }
        }
      },
      {
        path: 'login', component: () => import('pages/login.vue'), name: "Log in",
        meta: {
          showMenu: false, statusBarStyle: { color: '#5455e5' }
        }
      },
      {
        path: 'signup', component: () => import('pages/signup.vue'), name: "Sign up",
        meta: {
          showMenu: false, statusBarStyle: { color: '#5455e5' }
        }
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'), name: "404",
    meta: {
      showMenu: false, statusBarStyle: { color: 'blue' }
    },
  }
]

export default routes
