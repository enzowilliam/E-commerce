import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Product, products } from '../store/products';

export function Home() {
  const [search, setSearch] = useState('');
  const [cartItems, setCartItems] = useState(() => {
    const cartItemsFromStorage = localStorage.getItem('cartItems');
    return cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : [];
  });

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const filteredProducts = products.filter((product: Product) => {
    return product.name.toLowerCase().includes(search.toLowerCase());
  });

  const addToCart = (productToAdd: Product): void => {
    setCartItems((prevCartItems: Product[]) => {
      const updatedCart = prevCartItems.map(item =>
        item.name === productToAdd.name
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

      const productExists = prevCartItems.some(
        item => item.name === productToAdd.name,
      );

      if (!productExists) {
        // If the product does not exist in the cart, add it as a new item
        updatedCart.push({ ...productToAdd, quantity: 1 });
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <>
      <Navbar
        productsInCart={cartItems.length > 0 ? true : false}
        setSearch={setSearch}
        cartItems={cartItems}
        searchVisible={true}
      />
      <div className="mt-4 mx-4 pb-4 md:mx-24 lg:mx-40 xl:mx-96 ">
        <div
          className="grid grid-flow-row gap-12
            sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProducts.map((product: Product, index: number) => (
            <div key={index} className="flex flex-col">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full object-cover h-72 rounded-lg"
              />
              <div className="flex justify-between mt-2">
                <span className="mt-1 text-sm max-w-[7rem] text-slate-700 ">
                  {product.name}
                </span>
                <span className="mr-8 text-sm text-slate-500 ">
                  {product.description}
                </span>
                <div className="flex gap-2 items-center">
                  <span className="text-lg font-semibold">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
              <span className="font-light">REF: {product.id}</span>
              <span className="text-xs mb-4 text-slate-500">
                {product.points} pontos
              </span>
              <button
                className="bg-slate-900 w-full text-white rounded-md px-2.5 py-1.5 mt-auto transition-colors hover:bg-slate-700"
                onClick={() => addToCart(product)}
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
