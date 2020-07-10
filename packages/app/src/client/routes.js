export default [
  {
    path: '/home',
    component: () => import('./pages/Home'),
  },
  {
    path: '/about',
    component: () => import('./pages/About'),
  }
]
