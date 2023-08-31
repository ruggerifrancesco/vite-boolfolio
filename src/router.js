import { createRouter, createWebHistory } from "vue-router";

import Homepage from './pages/Homepage.vue';
import ProjectsIndex from './pages/ProjectsIndex.vue';


const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path: '/',
            name : 'homepage',
            component : Homepage,
        },
        {
            path: '/projects',
            name : 'projects.index',
            component : ProjectsIndex,
        },
    ]
})

export { router };