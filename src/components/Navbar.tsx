import { Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  setSearch?: (search: string) => void;
  cartItems?: (search: string) => void;
  searchVisible: boolean;
  productsInCart?: boolean;
}

export const Navbar = ({
  setSearch,
  cartItems,
  searchVisible,
  productsInCart,
}: NavbarProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearch !== undefined) {
      setSearch(e.target.value);
    }
  };

  return (
    <div className="px-8">
      <nav className=" flex flex-col md:flex-row justify-between px-16 h-14 items-center">
        <Link to="/">
          <strong>E(nzo)</strong> Commerce
        </Link>
        <div className="flex gap-4">
          {searchVisible && (
            <div className="border rounded bg-slate-100 px-2 py-1 flex items-center">
              <Search className="text-slate-400 h-4" strokeWidth={2} />
              <input
                type="text"
                className="bg-transparent outline-0 text-slate-400 text-xs font-bold"
                placeholder="Buscar"
                onChange={handleChange}
              />
            </div>
          )}
          <Link to="/checkout" state={cartItems}>
            <ShoppingCart
              className={
                productsInCart
                  ? 'text-2xl text-green-700 cursor-pointer'
                  : 'text-2xl text-neutral-700 cursor-pointer'
              }
              strokeWidth={2}
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};

//
