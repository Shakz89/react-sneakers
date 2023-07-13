import React from "react";
import axios from "axios";

import Info from "../info/info";
import {useCart} from "../../hooks/useCart";
import styles from './Drawer.module.scss';

export default function Drawer({ onClose, onRemove, items = [], opened }) {
  const {cartItems, setCartItems ,totalPrice} = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


  const onClickOrder = async () => {
try {
  setIsLoading(true);
  const {data} = await axios.post("https://643dc6cf6c30feced819c5f8.mockapi.io/order", {
    items: cartItems,
  });
  setOrderId(data.id);
  setIsOrderComplete(true);
  setCartItems([]);

  
  cartItems.forEach(item => {
    axios.put("https://642e997b8ca0fe3352d3eb1d.mockapi.io/cart", []);
  });

} catch (error) {
  alert('Не удалось создать заказ!');
}
setIsLoading=(true);
  };
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
   <div onClick={onClose} className={styles.overlay2}></div>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between">
          Корзина{" "}
          <img
            onClick={onClose}
            className="cu-p"
            width="25px"
            height="25px"
            src="img/card/close-cart.svg"
            alt="Close-Cart"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((item) => (
                <div key={item.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20">
                    <b className="mb-5">{item.brand}</b>
                    <p className="mb-5">{item.name}</p>
                    <b>{item.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(item.id)}
                    className="remove"
                    width="20px"
                    height="20px"
                    src="/img/card/remove-cart.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5 %:</span>
                  <div></div>
                  <b>{totalPrice / 100 * 5} руб.</b>
                </li>
              </ul>

              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="img/card/arrow-cart.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info 
          title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} 
          description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке.` : 'Добавте хотя-бы один товар, чтобы сделать заказ.'}
          imageUrl={isOrderComplete ? "/img/card/complete-order.jpg" : "/img/card/cart-empty.png"} 
          />
        )}
      </div>
    </div>
  );
}
