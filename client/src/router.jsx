import {createBrowserRouter, Navigate} from 'react-router-dom'
import LoginPage from './pages/login-page'
import ErrorPage from './pages/error-page'
import RegisterPage from './pages/register-page'
import OverviewPage from './pages/overview-page'
import ProtectedRoute from './components/protected-route'
import AnalyticsPage from './pages/analytics-page'
import HistoryPage from './pages/history-page'
import OrderPage from './pages/order-page'
import CategoriesPage from './pages/categories-page'
import CategoryPage from './pages/category-page'

export default createBrowserRouter([
    {path: '/', element: <Navigate to="/login" replace={true}/>, errorElement: <ErrorPage/>},
    {path: '/login', element: <LoginPage/>},
    {path: '/register', element: <RegisterPage/>},
    {path: '/overview', element: (<ProtectedRoute><OverviewPage/></ProtectedRoute>)},
    {path: '/analytics', element: (<ProtectedRoute><AnalyticsPage/></ProtectedRoute>)},
    {path: '/history', element: (<ProtectedRoute><HistoryPage/></ProtectedRoute>)},
    {path: '/order', element: (<ProtectedRoute><OrderPage/></ProtectedRoute>)},
    {path: '/order/create/:categoryId', element: (<ProtectedRoute><OrderPage/></ProtectedRoute>)},
    {path: '/categories', element: (<ProtectedRoute><CategoriesPage/></ProtectedRoute>)},
    {path: '/categories/new', element: (<ProtectedRoute><CategoryPage/></ProtectedRoute>)},
    {path: '/categories/:id', element: (<ProtectedRoute><CategoryPage/></ProtectedRoute>)},
])
