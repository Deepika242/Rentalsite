import React, { useEffect } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import {
  useShoppingCart,
  useCatalogue,
  findProduct,
  computeTotalPrice,
  useSession,
} from "../../lib/store";
import { insertOrders } from "../../lib/db";

export const ShoppingCart = () => {
  const { cartItems, removeFromCart, clearShoppingCart } = useShoppingCart();
  const { session } = useSession();

  const catalogue = useCatalogue();
  const navigate = useNavigate();

  const totalPrice = computeTotalPrice(cartItems, catalogue);

  const handleSetOrder = async () => {
    const { data, error } = await insertOrders(cartItems);

    if (!session) {
      navigate("/My account");
      return;
    }

    if (error) {
      alert("The order could not be saved. Please try again later.");
      return;
    }

    clearShoppingCart();
    navigate(`/order/${data[0].id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="section">
      <div className="cart-section">
        <h2 className="cart-title">Shopping Cart</h2>

        {cartItems.length === 0 && (
          <p className="empty-cart">
            The shopping cart is empty. Choose from our wide selection of
            clothes and fill it with stylish pieces .{" "}
          </p>
        )}

        {cartItems && (
          <ul className="cart-items">
            {cartItems.map((item) => {
              const product = findProduct(item, catalogue);

              return (
                <li
                  className="cart-item"
                  key={item.productId + "_" + item.size}
                >
                  <Link to={`/category/${item.categoryId}/${item.productId}`}>
                    <div className="item-image">
                      <img
                        src={`/img/products/${product.url}`}
                        alt={product.name}
                      />
                    </div>
                  </Link>
                  <div className="item-details">
                    <Link to={`/category/${item.categoryId}/${item.productId}`}>
                      <h3 className="item-name">{product.name}</h3>
                    </Link>
                    <p className="item-size">Size: {item.size}</p>
                    <p className="item-quantity">Amount: {item.quantity}</p>
                    <p className="item-price">
                      Price Per Piece: {product.price} {product.currency}/month
                    </p>
                    <p className="item-price">
                      Total Price: {product.price * item.quantity}{" "}
                      {product.currency}/month
                    </p>
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="cart-summary">
          <h3 className="summary-title">Order Summary</h3>
          <p className="summary-total">
            Total cost per month: {totalPrice} USD
          </p>
        </div>

        <div className="cart-actions">
          <Link to="/category">
            <Button text="Continue Shopping" />
          </Link>
          <Button
            text="Send an order"
            onClick={handleSetOrder}
            disabled={cartItems.length === 0}
          />
        </div>
      </div>
    </section>
  );
};
