import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home";
import Products from "../../Pages/Products/Products";
import ProductDetails from "../../Pages/Products/ProductDetails/ProductDetails";
import Cart from "../../Pages/Cart/Cart";
import Login from "../../Pages/Login/Login";
import Registration from "../../Pages/Registration/Registration";
import Profile from "../../Pages/Profile/Profile";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/products/:productId',
                element: <ProductDetails />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/registration',
                element: <Registration />
            },
            {
                path: '/profile',
                element: <Profile />
            }
        ]
    }
])
export default router;