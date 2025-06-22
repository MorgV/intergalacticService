import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'

export const AppRouter = () => {
    return <RouterProvider router={routes} />
}
