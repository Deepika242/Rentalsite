import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import { Button } from "../../components/Button/Button";
import { useCatalogue, useShoppingCart } from "../../lib/store";
import { Loading } from "../Loading/Loading";

const minQuantity = 1;
const maxQuantity = 10;

export const ProductDetail = () => {
  const { categoryId, productId } = useParams();
  const catalogue = useCatalogue();
  const { addToCart, getProduct } = useShoppingCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [buttonText, setButtonText] = useState("Add To Basket");

  if (!catalogue) {
    return (
      <section className="product-section">
        <div className="product-page">
          <Loading />
        </div>
      </section>
    );
  }

  const product = catalogue[categoryId].products[productId];

  const [size, setSize] = useState(() => {
    const cartItem = getProduct({ categoryId, productId });

    if (cartItem) {
      return cartItem.size;
    }
    return product.sizes[0];
  });

  const [quantity, setQuantity] = useState(() => {
    const product = getProduct({ categoryId, productId, size });

    if (product) {
      return product.quantity;
    }
    return 1;
  });

  const handleDecrementQuantity = () => {
    setQuantity((quantity) =>
      quantity > minQuantity ? quantity - 1 : quantity
    );

    setAddedToCart(false);
    setButtonText("Add To Basket");
  };

  const handleIncrementQuantity = () => {
    setQuantity((quantity) =>
      quantity < maxQuantity ? quantity + 1 : quantity
    );

    setAddedToCart(false);
    setButtonText("Add To Basket");
  };

  const handleQuantityChange = (e) => {
    const valueData = Number(e.target.value);

    if (isNaN(valueData)) {
      setQuantity(minQuantity);
    } else if (valueData >= maxQuantity) {
      setQuantity(maxQuantity);
    } else if (valueData <= minQuantity) {
      setQuantity(minQuantity);
    } else {
      setQuantity(valueData);
    }

    setAddedToCart(false);
    setButtonText("Add To Basket");
  };

  const handleChangeSize = (e) => {
    const newSize = e.target.value;
    setSize(newSize);
    const product = getProduct({ categoryId, productId, size: newSize });

    if (product) {
      setQuantity(product.quantity);
    }

    setAddedToCart(false);
    setButtonText("Add To Basket");
  };

  const handleAddToCart = () => {
    addToCart({ categoryId, productId, size, quantity });
    setAddedToCart(true);
    setButtonText("Added");
  };

  return (
    <section className="product-section">
      <div className="product-page">
        <div className="product-image">
          <img src={`/img/products/${product.url}`} alt={product.name} />
        </div>
        <div className="product-content">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-price">
            {product.price} {product.currency}/month
          </p>
          <p className="product-description">{product.description}</p>
          <div className="product-sizes">
            <h3>Size</h3>
            <div className="select-container">
              <select
                value={size}
                className="custom-select"
                onChange={handleChangeSize}
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="product-quantity">
            <h3>Amount</h3>
            <div className="quantity-input">
              <button
                className="decrement-button"
                onClick={handleDecrementQuantity}
              >
                -
              </button>
              <input
                type="text"
                pattern="\d{1,2}"
                inputMode="numeric"
                value={quantity}
                onChange={handleQuantityChange}
              />

              <button
                className="increment-button"
                onClick={handleIncrementQuantity}
              >
                +
              </button>
            </div>
          </div>
          <Button text={buttonText} onClick={handleAddToCart} />
        </div>
      </div>
    </section>
  );
};
