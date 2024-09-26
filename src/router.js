// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import ProfilePage from './views/ProfilePage.vue';
import RecipePage from './views/RecipePage.vue';
import { auth } from './firebase';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
  { path: '/recipe/:id', name: 'Recipe', component: RecipePage, props: true },
  // Catch-all route for 404 Not Found
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('./views/NotFound.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = auth.currentUser;

  if (requiresAuth && !user) {
    next('/');
  } else {
    next();
  }
});

export default router;
