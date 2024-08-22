import React from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StoreProvider } from "./Store.tsx";
import CartPage from "./pages/CartPage.tsx";
import SigninPage from "./pages/SigninPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ShippingAddressPage from "./components/ShippingAddressPage.tsx";
import PaymentMethodPage from "./pages/PaymentMethodPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.tsx";
import OrderPage from "./pages/OrderPage.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderHistoryPage from "./pages/OrderHistoryPage.tsx";
import AdminPanel from "./admin/pages/AdminPanel.tsx";
import PersonalProfile from "./components/PersonalProfile.tsx";
import TodayDeal from "./components/TodayDeal.tsx";
import Gifts from "./components/Gifts.tsx";
import OnSale from "./components/OnSale.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="Todays Deal" element={<TodayDeal />} />
      <Route path="Gifts" element={<Gifts />} />
      <Route path="On Sale" element={<OnSale />} />
      <Route path="admin/*" element={<AdminPanel />} />
      <Route path="profile" element={<PersonalProfile />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="shipping" element={<ShippingAddressPage />} />
        <Route path="payment" element={<PaymentMethodPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/orderhistory" element={<OrderHistoryPage />} />
      </Route>

      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <PayPalScriptProvider options={{ clientId: "sb" }} deferLoading={true}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>
);
