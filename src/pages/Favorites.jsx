import React from 'react';
import Card from '../components/card/Card';
import AppContext from '../context';

function Favorites (){
  const {favorites, onAddToFavorite} = React.useContext(AppContext);
   return (
      <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мой закладки</h1>

      </div>
      <div className="d-flex flex-wrap">
      {favorites.map((item, index) => (
            <Card
              key={index}
              {...item}
              favorited={true}
              onFavorite={onAddToFavorite}
             // onFavorite={(obj) => onAddToFavorite(obj)}
              //onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
      </div>
    </div>
   )
};

export default Favorites;