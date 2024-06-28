import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { MainPage } from "../MainPage/MainPage";
import { HowItWorks } from "../HowItWorks/HowItWorks";
import { CategoryView } from "../CategoryView/CategoryView";
import { CategoryPage } from "../CategoryPage/CategoryPage";
import { ProductDetail } from "../ProductDetail/ProductDetail";
import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
import { UserLayout } from "../UserLayout/UserLayout";
import { Orders } from "../Orders/Orders";
import { UserDetail } from "../UserDetails/UserDetails";
import { OrderDetail } from "../OrderDetail/OrderDetail";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { Footer } from "../../components/Footer/Footer";
import { AboutUs } from "../AboutUs/AboutUs";
import User from "../../User";

export const App = () => {
  return (
    <div className="container">
      <Navbar />

      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/" element={<User />} /> */}
        <Route path="/howItWorks" element={<HowItWorks />} />
        <Route path="/category" element={<CategoryView />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route
          path="/category/:categoryId/:productId"
          element={<ProductDetail />}
        />
        <Route path="/basket" element={<ShoppingCart />} />
        <Route path="/order/:orderId" element={<OrderDetail />} />
        <Route path="/My account" element={<UserLayout />}>
          <Route path="" element={<UserDetail />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/about us" element={<AboutUs />} />
      </Routes>
      <Footer />
    </div>
  );
};
