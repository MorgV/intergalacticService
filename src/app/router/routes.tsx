import { createBrowserRouter } from 'react-router-dom'
import { GenerationPage } from '../pages/GenerationPage/GenerationPage'
import { HistoryPage } from '../pages/HistoryPage/HistoryPage'
import { AnalyticsPage } from '../pages/AnalyticsPage/AnalyticsPage'


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <AnalyticsPage />
    },
    {
        path: '/generation',
        element: <GenerationPage />
    },
    {
        path: '/history',
        element: <HistoryPage />
    },
])