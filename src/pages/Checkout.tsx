import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Minus, Plus } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../components/Navbar';

interface Product {
  name: string;
  imageUrl: string;
  price: number;
  points: number;
  quantity: number;
}

export const Checkout = () => {
  const storedCartItems = localStorage.getItem('cartItems');

  const [cartItems, setCartItems] = useState<Product[]>(
    storedCartItems ? JSON.parse(storedCartItems) : [],
  );

  const [convertedCurrency, setConvertedCurrency] = useState({
    USDBRL: { high: 0 },
  });

  const handleAddQuantity = (product: Product) => {
    const updatedCart = cartItems.map(item =>
      item.name === product.name
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleRemoveQuantity = (product: Product) => {
    const updatedCart = cartItems.map(item =>
      item.name === product.name
        ? { ...item, quantity: item.quantity === 0 ? 0 : item.quantity - 1 }
        : item,
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleRemoveProduct = (product: Product) => {
    const updatedCart = cartItems.filter(item => item.name !== product.name);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleUpdate = (
    event: React.ChangeEvent<HTMLInputElement>,
    product: Product,
  ) => {
    const updatedQuantity = parseInt(event.target.value);
    const quantity =
      isNaN(updatedQuantity) || updatedQuantity < 0 ? 0 : updatedQuantity;
    const updatedCart = cartItems.map(item =>
      item.name === product.name ? { ...item, quantity } : item,
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const convertCurrency = async () => {
      const request = await fetch(
        'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL',
      );

      const response = await request.json();
      setConvertedCurrency(response);
    };
    convertCurrency();
  });

  const brl = convertedCurrency.USDBRL.high;

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (total, item) => total + item.price * brl * item.quantity,
      0,
    );
    return total.toFixed(2);
  };

  const calculateTotalPoints = () => {
    return cartItems.reduce(
      (totalPoints, item) => totalPoints + item.points * item.quantity,
      0,
    );
  };

  const calculeteTotalProductPrice = (product: Product) => {
    const totalProductPrice = product.price * brl * product.quantity;
    return totalProductPrice.toFixed(2);
  };

  const notify = () =>
    toast.success('compra efetuada com sucesso', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  return (
    <div>
      <Navbar searchVisible={false} />
      <div className="mt-4 mx-4">
        <div className="grid gap-12 grid-cols-1 lg:grid-cols-2  place-items-center">
          <div>
            <h1 className="font-extrabold text-lg">Cart</h1>
            <div>
              <div className="flex  gap-12 justify-around">
                <h1>Produto</h1>
                <h1 className="pl-16">Quantidade</h1>
                <h1>Preço</h1>
              </div>
              {cartItems.map((product, index: number) => (
                <div className="pt-4" key={index}>
                  <div className="flex justify-between items-center gap-20">
                    <div className="flex flex-wrap items-center gap-4">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 object-cover h-20 rounded-lg"
                      />
                      <div className="text-sm text-justify text-slate-700 break-words w-20">
                        {product.name}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className=" w-20 border rounded bg-slate-100 flex justify-between">
                        <button
                          className="text-slate-400 cursor-pointer"
                          onClick={() => handleRemoveQuantity(product)}
                        >
                          <Minus />
                        </button>
                        <input
                          type="text"
                          className="w-4 text-center bg-transparent outline-0 text-slate-400 text-xs font-bold"
                          value={product.quantity}
                          onChange={e => handleUpdate(e, product)}
                        />
                        <button
                          className="text-slate-400 cursor-pointer"
                          onClick={() => handleAddQuantity(product)}
                        >
                          <Plus />
                        </button>
                      </div>
                      <span
                        onClick={() => handleRemoveProduct(product)}
                        className="text-red-700 cursor-pointer"
                      >
                        remover
                      </span>
                    </div>
                    <div>
                      <h1>R$ {calculeteTotalProductPrice(product)}</h1>
                      <span>{product.points * product.quantity} Pontos</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border rounded-md p-4">
            <div className="grid grid-flow-row gap-12 grid-rows-3 grid-cols-2">
              <h2 className="font-extrabold text-lg">Total</h2>
              <h2>R$ {calculateTotal()}</h2>
              <span className="font-extrabold text-lg">Pontos</span>
              <span>{calculateTotalPoints()}</span>
            </div>
            <button
              className="bg-slate-900 w-full text-white rounded-md px-2.5 py-1.5 mt-auto transition-colors hover:bg-slate-700"
              onClick={notify}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
      {calculateTotalPoints() >= 300 ? (
        <div className="flex justify-center pt-3 pb-4">
          <span>
            Parabéns por ter acumulado mais de 300 pontos,
            <br /> voce levará para casa um <strong> super </strong> Boné de
            brinde!
          </span>
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
};
