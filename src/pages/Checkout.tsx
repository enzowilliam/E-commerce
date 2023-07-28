import { Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
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

  const handleAddItem = (product: Product) => {
    const updatedCart = cartItems.map(item =>
      item.name === product.name
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (product: Product) => {
    const updatedCart = cartItems.map(item =>
      item.name === product.name
        ? { ...item, quantity: item.quantity === 0 ? 0 : item.quantity - 1 }
        : item,
    );
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

  const calculateSubtotal = () => {
    const subtotal = cartItems.reduce(
      (subtotal, item) => subtotal + item.price * brl * item.quantity,
      0,
    );
    return subtotal.toFixed(2);
  };

  const calculateTotalPoints = () => {
    return cartItems.reduce(
      (totalPoints, item) => totalPoints + item.points * item.quantity,
      0,
    );
  };

  return (
    <div>
      <Navbar searchVisible={false} />
      <div className="mt-4 mx-4">
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2  place-items-center">
          <div>
            <h1 className="font-extrabold text-lg">Cart</h1>
            <div className="flex flex-row md:flex-col">
              <div className="flex flex-col md:flex-row gap-20 items-center justify-between">
                <h1>Produto</h1>
                <h1>Quantidade</h1>
                <h1>Preço</h1>
              </div>
              {cartItems.map((product, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-center gap-20">
                    <div>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-auto object-cover h-20 rounded-lg"
                      />
                      <h1>{product.name}</h1>
                    </div>
                    <div className="border rounded bg-slate-100 flex items-center justify-between">
                      <button
                        className="text-slate-400 cursor-pointer"
                        onClick={() => handleRemoveItem(product)}
                      >
                        <Minus />
                      </button>
                      <input
                        type="text"
                        className=" text-center bg-transparent outline-0 text-slate-400 text-xs font-bold"
                        value={product.quantity}
                        onChange={e => handleUpdate(e, product)}
                      />
                      <button
                        className="text-slate-400 cursor-pointer"
                        onClick={() => handleAddItem(product)}
                      >
                        <Plus />
                      </button>
                    </div>
                    <div>
                      <h1>
                        R$ {(product.price * brl * product.quantity).toFixed(2)}
                      </h1>
                      <span>{product.points * product.quantity} pontos</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border rounded-md p-4">
            <div className="grid grid-flow-row gap-12 grid-rows-3 grid-cols-2">
              <h2>Total</h2>
              <h2>R$ {calculateSubtotal()}</h2>
              <span>Points</span>
              <span>{calculateTotalPoints()}</span>
            </div>
            <button className="bg-slate-900 w-full text-white rounded-md px-2.5 py-1.5 mt-auto transition-colors hover:bg-slate-700">
              Checkout
            </button>
          </div>
        </div>
      </div>
      {calculateTotalPoints() >= 300 ? (
        <div className="flex justify-center pt-3">
          <span>
            Parabéns por ter acumulado mais de 300 pontos,
            <br /> voce levará para casa um <strong> super </strong> Bone de
            brinde
          </span>
        </div>
      ) : null}
    </div>
  );
};
