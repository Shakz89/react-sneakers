import React from "react";
import cardStyles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from '../../context';

export default function Card({
  id,
  imageUrl,
  brand,
  name,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  Loading = false,
}) {
  const { isItemAdded} = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = {id, perentId: id, imageUrl, brand, name, price}
  const onClickFavorite = () => {
    onFavorite( obj );
    setIsFavorite(!isFavorite);
  };
  const onClickPlus = () => {
    onPlus( obj );
  };
  
  return (
    <div className={cardStyles.card}>
      {Loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={250}
          viewBox="0 0 150 250"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="115" rx="5" ry="5" width="150" height="20" />
          <rect x="0" y="150" rx="5" ry="5" width="100" height="20" />
          <rect x="0" y="207" rx="5" ry="5" width="80" height="24" />
          <rect x="114" y="198" rx="10" ry="10" width="33" height="33" />
        </ContentLoader>
      ) : (
        <>
          {" "}
         {onFavorite && (<div className={cardStyles.favorite} onClick={onClickFavorite}>
            <img
              width="27px"
              height="27px"
              src={
                isFavorite
                  ? "/img/like/like-liked.svg"
                  : "/img/like/like-unliked.svg"
              }
              alt="Unliked"
            />
          </div>)}
          <img width="100%" height="170px" src={imageUrl} alt="Cart-item" />
          <h4>{brand}</h4>
          <h5>{name}</h5>
          <div className={cardStyles.footer}>
            <div className={cardStyles.price}>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && <img
              className={cardStyles.plus}
              onClick={onClickPlus}
              width="27px"
              height="27px"
              src={
                isItemAdded(id)
                  ? "/img/AddToCard/card-cheked.svg"
                  : "/img/AddToCard/add-to-cart.svg"
              }
              alt="AddToCart"
            />}
          </div>
        </>
      )}
    </div>
  );
}
