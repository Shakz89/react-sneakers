import React from 'react'
import AppContext from '../../context';

const Info = ({ imageUrl, title, description }) => {
  const {setCartOpened} = React.useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
    <img
      className="mb-20"
      
      
      src={imageUrl}
      alt="Cart-Empty"
    />
    <h2>{title}</h2>
    <p className="align-center">{description}</p>
    <button onClick={() => setCartOpened(false)} className="greenButton">
      <img
        width="20px"
        height="20px"
        src="/img/card/arrow-cart.svg"
        alt="Arrow-Back"
      />
      Вернуться назад
    </button>
  </div>
  )
}

export default Info;
