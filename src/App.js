import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/header/Header";
import Drawer from "./components/drawer/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from '../src/context';
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData () {
    try {
     const [cartResponse, favoritesResponse, itemsResponse ] = await Promise.all([ axios.get("https://642e997b8ca0fe3352d3eb1d.mockapi.io/cart"), axios.get("https://643dc6cf6c30feced819c5f8.mockapi.io/favorite"), axios.get("https://642e997b8ca0fe3352d3eb1d.mockapi.io/items") ]);

      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    } catch (error) {
      alert('Ошибка при запросе данных ;(');
    }
    }
    fetchData();
  }, []);
  const onAddToCart = async (obj) => {
 try {
  const findItem = cartItems.find((item) => Number(item.perentId) === Number(obj.id))
  if (findItem) {
    setCartItems((prev) => prev.filter((item) => Number(item.perentId) !== Number(obj.id)));
    await axios.delete(`https://642e997b8ca0fe3352d3eb1d.mockapi.io/cart/${findItem.id}`);
  }else {
    setCartItems((prev) => [...prev, obj]);
    const {data} = await axios.post("https://642e997b8ca0fe3352d3eb1d.mockapi.io/cart", obj);
    setCartItems((prev) => prev.map(item => {
      if (item.perentId === data.perentId) {
        return{
          ...item,
          id: data.id
        };
        }
        return item;
    }));
  }
 } catch (error) {
  alert('Ошибка при добавлении в корзину ;(');
 }

  };
  const onRemoveItem = (id) => {
try {
  axios.delete(`https://642e997b8ca0fe3352d3eb1d.mockapi.io/cart/${id}`);
  setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
} catch (error) {
  alert('Ошибка при удалении из корзины ;(');
}
  };
  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favobj) => Number(favobj.id) === Number(obj.id))) {
        axios.delete(`https://643dc6cf6c30feced819c5f8.mockapi.io/favorite/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(`https://643dc6cf6c30feced819c5f8.mockapi.io/favorite`, obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Неудалось добавить в фавориты");
    }
  };
  const isItemAdded = (id) => {
   return cartItems.some((obj) => Number(obj.perentId) === Number(id));
  };

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems }}>
      <div className="wrapper clear">
   
         <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/>


        

      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          }
        />
      </Routes>
      <Routes>
        <Route exact path="/favorites" element={<Favorites />}/>
      </Routes>
      <Routes>
        <Route exact path="/orders" element={<Orders />}/>
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
