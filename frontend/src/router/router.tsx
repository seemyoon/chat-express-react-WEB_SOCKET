import { createBrowserRouter, RouteObject } from "react-router-dom";
import ChatMainLayout from "../layout/ChatMainLayout";
import ChatPage from "../page/ChatPage";
import ChatDetailsPage from "../page/ChatDetailsPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <ChatMainLayout />,
        children: [
            { index: true, element: <ChatPage /> },
            { path: ":id", element: <ChatDetailsPage /> },
        ],
    },
];

export const router = createBrowserRouter(routes);
export default router;
