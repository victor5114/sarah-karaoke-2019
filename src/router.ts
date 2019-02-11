import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/songs',
      name: 'songs',
      component: () =>
        import(/* webpackChunkName: "songs" */ './views/SongsComponent.vue'),
    },
    {
      path: '/users',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "users" */ './views/UsersComponent.vue'),
    },
    {
      path: '/track-listing',
      name: 'track-listing',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "track-listing" */ './views/TrackListingComponent.vue'),
    },
  ],
});
