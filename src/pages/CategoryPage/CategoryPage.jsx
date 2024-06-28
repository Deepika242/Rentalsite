import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./style.css";
import { useCatalogue } from "../../lib/store";
import { Loading } from "../Loading/Loading";

export const CategoryPage = () => {
  const catalogue = useCatalogue();
  const { categoryId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!catalogue) {
    return (
      <section className="category-section align-center-content">
        <div>
          <Loading />
        </div>
      </section>
    );
  }

  const categoryData = catalogue[categoryId];

  if (!categoryData) {
    return <p>category not found.</p>;
  }

  return (
    <section className="category-section align-center-content">
      <div>
        <h2 className="section-title">{categoryData.title}</h2>
        <div className="category-image-container">
          {categoryData &&
            Object.entries(categoryData.products).map(
              ([productId, product]) => (
                <div className="category-image-detail" key={productId}>
                  <Link to={`/category/${categoryId}/${productId}`}>
                    <img
                      src={`/img/products/${product.url}`}
                      alt={product.name}
                    />
                  </Link>

                  <h3>{product.name}</h3>
                  <p className="image-caption">
                    {product.price} {product.currency}/month
                  </p>
                </div>
              )
            )}
        </div>
      </div>
    </section>
  );
};
