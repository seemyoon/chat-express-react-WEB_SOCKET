import {createBrowserRouter, RouteObject} from "react-router-dom";
import ChatMainLayout from "../layout/ChatMainLayout";
import ChatsPage from "../page/ChatsPage";
import ChatPage from "../page/ChatPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <ChatMainLayout />,
        children: [
            { index: true, element: <ChatsPage /> },
            { path: ":id", element: <ChatPage /> },
        ],
    },
];

export const router = createBrowserRouter(routes);
export default router;
