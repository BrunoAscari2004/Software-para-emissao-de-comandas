import { lazy } from 'react';

const nlConfig = [
    {
        path: '/home',
        component: lazy(() => import('./Home')),
    },
    {
        path: '/listNlBaseUsuarios',
        component: lazy(() => import('./NlBaseUsuarios/ListaNlBaseUsuarios')),
    },
    {
        path: ['/formNlBaseUsuarios/:idUsuario/', '/formNlBaseUsuarios/'],
        component: lazy(() => import('./NlBaseUsuarios/FormNlBaseUsuarios')),
    },
    {
        path: '/nlApresentacao',
        component: lazy(() => import('./NlApresentacao')),
    },
];

export default nlConfig;
