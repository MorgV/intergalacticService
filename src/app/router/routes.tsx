import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../../ui/layout/Layout/Layout";
import { GenerationPage } from "../../ui/pages/GenerationPage/GenerationPage";
import { HistoryPage } from "../../ui/pages/HistoryPage/HistoryPage";
import { AnalyticsPage } from "../../ui/pages/AnalyticsPage/AnalyticsPage";

export const routes = createBrowserRouter([
  {
    path: "/", // основной маршрут
    element: <Layout />, // 👈 общий layout
    children: [
      {
        index: true,
        element: <AnalyticsPage />,
      },
      {
        path: "generation",
        element: <GenerationPage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
    ],
  },
]);
