import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { getSession, login, logout } from './db';

const findCartItem = (cartItems, categoryId, productId, size) =>
  cartItems.find(
    (item) =>
      item.categoryId === categoryId &&
      item.productId === productId &&
      (!size || item.size === size),
  );

const findCartItemIndex = (cartItems, categoryId, productId, size) =>
  cartItems.findIndex(
    (item) =>
      item.categoryId === categoryId &&
      item.productId === productId &&
      item.size === size,
  );

export const findProduct = ({ categoryId, productId }, catalogue) =>
  catalogue[categoryId].products[productId];

export const computeTotalPrice = (cartItems, catalogue) =>
  cartItems.reduce(
    (totalPrice, item) =>
      totalPrice + item.quantity * findProduct(item, catalogue).price,
    0,
  );

export const useCatalogue = create((set) => {
  fetch('/api/categories.json')
    .then((response) => response.json())
    .then((jsonData) => {
      set(jsonData);
    });
});

export const useShoppingCart = create(
  persist(
    devtools((set, get) => ({
      cartItems: [],
      addToCart: ({ categoryId, productId, size, quantity }) =>
        set((prevState) => {
          const newCartItems = [...prevState.cartItems];
          const productIndex = findCartItemIndex(
            prevState.cartItems,
            categoryId,
            productId,
            size,
          );

          if (productIndex === -1) {
            newCartItems.push({ categoryId, productId, size, quantity });
          } else {
            newCartItems.splice(productIndex, 1, {
              categoryId,
              productId,
              size,
              quantity,
            });
          }

          return { ...prevState, cartItems: newCartItems };
        }),
      removeFromCart: ({ categoryId, productId, size, quantity }) =>
        set((prevState) => {
          const newCartItems = [...prevState.cartItems];
          const productIndex = findCartItemIndex(
            prevState.cartItems,
            categoryId,
            productId,
            size,
          );

          if (productIndex >= 0) {
            const product = newCartItems[productIndex];

            if (product.quantity <= quantity) {
              newCartItems.splice(productIndex, 1);
            } else {
              newCartItems.splice(productIndex, 1, {
                categoryId,
                productId,
                size,
                quantity: product.quantity - quantity,
              });
            }
          }

          return { ...prevState, cartItems: newCartItems };
        }),
      clearShoppingCart: () =>
        set((prevState) => ({ ...prevState, cartItems: [] })),
      getProduct: ({ categoryId, productId, size }) =>
        findCartItem(get().cartItems, categoryId, productId, size),
      getProductsAmount: () => get().cartItems.length,
    })),
    { name: 'shopping-cart' },
  ),
);

export const useSession = create((set) => {
  (async () => {
    const { session, error } = await getSession();
    if (error || !session) {
      set((prevState) => ({
        ...prevState,
        sessionLoading: false,
        session: null,
      }));
    } else {
      set((prevState) => ({
        ...prevState,
        sessionLoading: false,
        session: session,
      }));
    }
  })();

  return {
    sessionLoading: true,
    session: null,
    login,
    logout: () => {
      logout();
      set((prevState) => ({
        ...prevState,
        sessionLoading: false,
        session: null,
      }));
    },
  };
});
