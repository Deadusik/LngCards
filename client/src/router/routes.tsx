import { ReactNode } from "react";
import { HOME, LEARNING, MATERIALS, NEW_CARD, PROFILE } from "./paths";
// pages
import Home from '../pages/Home'
import Error from "../pages/Error";
import Learning from "../pages/Learning";
import Materials from "../pages/Materials";
import Profile from "../pages/Profile";
import NewCard from "../pages/NewCard";

interface IRoute {
    path: string;
    element: ReactNode;
    errorElement: ReactNode;
}

export const routes: IRoute[] = [
    {
        path: HOME,
        element: <Home />,
        errorElement: <Error />
    },
    {
        path: LEARNING,
        element: <Learning />,
        errorElement: <Error />
    },
    {
        path: MATERIALS,
        element: <Materials />,
        errorElement: <Error />
    },
    {
        path: PROFILE,
        element: <Profile />,
        errorElement: <Error />
    },
    {
        path: NEW_CARD,
        element: <NewCard />,
        errorElement: <Error />
    },
]