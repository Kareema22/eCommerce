
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Brands from './Components/Brands/Brands';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Checkout from './Components/Checkout/Checkout';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';
import Orders from './Components/Orders/Orders';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import RecentProducts from './Components/RecentProducts/RecentProducts';
import Register from './Components/Register/Register';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import VerifyCode from './Components/VerifyCode/VerifyCode';
import Wishlist from './Components/Wishlist/Wishlist';
import CartContextProvider from './Context/CartContext';
import { UserContextProvider } from './Context/UserContext';
import WishListContextProvider from './Context/WishListContext';

const query = new QueryClient();

let x = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute > <Brands /> </ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /> </ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /> </ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><RecentProducts /></ProtectedRoute> },
      { path: 'product-details/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'wishList', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: 'checkout/:id', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forget-password', element: <ForgetPassword /> },
      { path: 'verify-code', element: <VerifyCode /> },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: '*', element: <Notfound /> },



    ]
  }
])

function App() {
  return (
    <QueryClientProvider client={query}>
      <UserContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <ToastContainer position="top-right" />
            <RouterProvider router={x}>  </RouterProvider>
            <ReactQueryDevtools></ReactQueryDevtools>
          </WishListContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>

  )
}

export default App
