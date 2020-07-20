export default [
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "Home" */ './pages/Home'),
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "About"  *//* webpackPrefetch: true */  './pages/About'),
  },
  {
    path: '/monitor/:projectId',
    component: () => import(/* webpackChunkName: "Monitor" */ './pages/Monitor'),
  }
]
