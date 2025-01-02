import {createBrowserRouter, RouteObject} from 'react-router-dom';
import ChatMainLayout from "../layout/ChatMainLayout";

const routes: RouteObject[] = [{
    path: '/', element: <ChatMainLayout />, children: [
        // {
        //     index: true, element: <ChatPage />,
        // },
        // {
        //     path: '/:id', element: <PageId />,
        // },
    ],
}];

export const router = createBrowserRouter(routes);
export default router;