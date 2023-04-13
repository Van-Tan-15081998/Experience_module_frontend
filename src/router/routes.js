import { createWebHistory, createRouter } from "vue-router";

import { useAuthStore } from '@/store/System/AuthStore';

const routes = [
    {
        path: '/master',
        name: 'master',
        component: () => import('../pages/Master/Master.vue'),
        children: [
            // TODO: Favorite App Route Group
            {
                path: 'favorite-app',
                name: 'favorite-app',
                component: () => import('../pages/Master/FavoriteApp/FavoriteApp.vue'),
                children: [
                    {
                        path: 'book',
                        name: 'book',
                        component: () => import('../pages/Master/FavoriteApp/Book/BookList.vue'),
                        children: [
                            {
                                path: 'list',
                                name: 'book-list',
                                component: () => import('../pages/Master/FavoriteApp/Book/BookList.vue'),
                                meta: { requiresAuth: true }
                            },
                            {
                                path: 'detail/:id',
                                name: 'book-detail',
                                component: () => import('../pages/Master/FavoriteApp/Book/BookDetail.vue'),
                                meta: { requiresAuth: true }
                            }
                        ],
                        meta: { requiresAuth: true }
                    },
                    {
                        path: 'knowledge',
                        name: 'knowledge',
                        component: () => import('../pages/Master/FavoriteApp/Knowledge/KnowledgeList.vue'),
                        children: [
                            {
                                path: 'list',
                                name: 'knowledge-list',
                                component: () => import('../pages/Master/FavoriteApp/Knowledge/KnowledgeList.vue'),
                                meta: { requiresAuth: true }
                            },
                            {
                                path: 'detail/:id',
                                name: 'knowledge-detail',
                                component: () => import('../pages/Master/FavoriteApp/Knowledge/KnowledgeUnit.vue'),
                                meta: { requiresAuth: true }
                            }
                        ],
                        meta: { requiresAuth: true }
                    }
                ],
                meta: { requiresAuth: true }
            },

            // TODO: Laravel Research Route Group
            {
                path: 'laravel-research',
                name: 'laravel-research',
                component: () => import('../pages/Master/LaravelResearch/LaravelResearch.vue'),
            },

            // // TODO: Pattern Page Route Group
            {
                path: 'pattern-page',
                name: 'pattern-page',
                component: () => import('../pages/Master/PatternPage/PatternPage.vue'),
                children: [
                    {
                        path: 'pattern-01',
                        name: 'pattern-01',
                        component: () => import('../pages/Master/PatternPage/Pattern-01/Pattern-01.vue'),
                    },
                    {
                        path: 'pattern-02',
                        name: 'pattern-02',
                        component: () => import('../pages/Master/PatternPage/Pattern-02/Pattern-02.vue'),
                    },
                    {
                        path: 'pattern-04',
                        name: 'pattern-04',
                        component: () => import('../pages/Master/PatternPage/Pattern-04/Pattern-04.vue'),
                    }
                ]
            },

            // TODO: System Route Group
            {
                path: 'system',
                name: 'system',
                component: () => import('../pages/Master/System/SystemHomePage.vue'),
                children: [
                    /// TODO: Auth Route Group
                    {
                        path: 'auth/auth-login',
                        name: 'auth/auth-login',
                        component: () => import('../pages/Master/System/Auth/AuthLogin.vue'),
                    },
                    {
                        path: 'auth/auth-logged-in-user-info',
                        name: 'auth/auth-logged-in-user-info',
                        component: () => import('../pages/Master/System/Auth/AuthLoggedInUserInfo.vue'),
                        meta: { requiresAuth: true }
                    },
                    {
                        path: 'auth/auth-reset-password',
                        name: 'auth/auth-reset-password',
                        component: () => import('../pages/Master/System/Auth/AuthResetPassword.vue'),
                    },

                    // TODO:
                ]
            },
        ],
        // meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../pages/System/NotFoundPage.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {

    const store = useAuthStore();

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.checkLogin()) {
            next({
                path: '/master/system/auth/auth-login',
                // query: { redirect: to.fullPath }
            })
            return
        }
    }
    next()
})

export default router;