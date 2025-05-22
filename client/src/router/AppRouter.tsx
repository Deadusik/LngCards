import Error from "../pages/Error"
import { routes } from "./routes"
import { Routes, Route } from 'react-router-dom'

const AppRouter = () => {
    return (
        <>
            <Routes>
                {
                    routes.map(route =>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                            errorElement={route.errorElement} />
                    )
                }
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    )
}

export default AppRouter