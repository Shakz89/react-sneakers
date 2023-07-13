import React from "react";
import Card from "../components/card/Card";


function Home({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading
}) {

  const renderItems = () => {
    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()),);
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
        <Card
          key={index}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          
          Loading={isLoading}
          {...item}
        />
      ));
  };
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кросовки"}
        </h1>
        <div className="search-block d-flex align-center">
          <img
            width="20px"
            height="20px"
            src="/img/search/search.svg"
            alt="Search"
          />
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
