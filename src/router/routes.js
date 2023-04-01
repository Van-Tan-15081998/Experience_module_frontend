import { createWebHistory, createRouter } from "vue-router";

const routes = [
    // {
    //     path: "/master/favorite_app/knowledge/list",
    //     name: "KnowledgeList",
    //     component: () => import('../pages/Master/FavoriteApp/Knowledge/KnowledgeList.vue'),
    // },
    // {
    //     path: "/learning-language",
    //     name: "LearningLanguage",
    //     component: () => import('../pages/LearningLanguage/LearningLanguage.vue'),
    // },

    {
        path: '/master',
        name: 'master',
        component: () => import('../pages/Master/Master.vue'),
        children: [
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
                            },
                            {
                                path: 'detail/:id',
                                name: 'book-detail',
                                component: () => import('../pages/Master/FavoriteApp/Book/BookDetail.vue'),
                            }
                        ]
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
                            },
                            {
                                path: 'detail/:id',
                                name: 'knowledge-detail',
                                component: () => import('../pages/Master/FavoriteApp/Knowledge/KnowledgeUnit.vue'),
                            }
                        ]
                    }
                ]
            },

            {
                path: 'laravel-research',
                name: 'laravel-research',
                component: () => import('../pages/Master/LaravelResearch/LaravelResearch.vue'),
            },

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
                    }
                ]
            },
        ]
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

export default router;