import {createBrowserRouter, RouteObject} from 'react-router-dom';

const routes: RouteObject[] = [{
    // path: '/', element: <MainLayout />, children: [
    //     {
    //         index: true, element: <Page />,
    //     },
    //     {
    //         path: '/:id', element: <PageId />,
    //     },
    // ],
}];

export const router = createBrowserRouter(routes);
export default router;