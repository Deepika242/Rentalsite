import React from "react";
import { Payment } from "../../components/Payment/Payment";
import { useCatalogue, findProduct, computeTotalPrice } from "../../lib/store";
import { useQuery, getOrder } from "../../lib/db";
import { useParams } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { Link } from "react-router-dom";
import { IoMdPricetag } from "react-icons/io";
import "./style.css";

export const OrderDetail = () => {
  const catalogue = useCatalogue();
  const { orderId } = useParams();
  const [loading, data, error] = useQuery(async () => await getOrder(orderId));

  return (
    <>
      <section className="order-section">
        <div className="order-number">
          <h2>Order number {orderId}</h2>
        </div>

        {loading && <Loading />}
        {error && <p>The order could not be loaded.</p>}

        {data && (
          <div className="order-items-detail">
            <ul>
              {data[0].items.map((item) => {
                const product = findProduct(item, catalogue);
                return (
                  <li key={item.productId + "_" + item.size}>
                    <Link to={`/category/${item.categoryId}/${item.productId}`}>
                      <h3 className="item-name">
                        <IoMdPricetag />
                        {product.name}
                      </h3>
                    </Link>
                    <p className="item-size">Size: {item.size}</p>
                    <p className="item-quantity">Amount: {item.quantity}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {data && (
          <Payment
            accountnumber="2202326673/2010"
            variableSymbol={orderId}
            amount={computeTotalPrice(data[0].items, catalogue)}
            message="Thank you for your support"
          />
        )}
      </section>
    </>
  );
};
