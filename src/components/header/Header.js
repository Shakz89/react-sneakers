import React from 'react';
import { Link } from 'react-router-dom';
import {useCart} from "../../hooks/useCart";

export default function Header(props) {
  const {totalPrice} = useCart();

  return (
   <header className="d-flex justify-between align-center p-40">
   <Link to="/">
   <div className="d-flex align-center">
        <img src="/img/logo/logo.png" alt=""/>
     <div>
       <h3 className="text-uppercase">React Sneakers</h3>
       <p>Магазин лучших кроссовок</p>
     </div>
    </div>
   </Link>
   
   <ul className="d-flex justify-between">
      <li  className="mr-30 d-flex align-center">
       <svg onClick={props.onClickCart} className='cu-p' width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M2 2C1.44772 2 1 2.44772 1 3C1 3.55228 1.44772 4 2 4H2.47241C2.92336 4 3.31852 4.30182 3.43717 4.73688L3.85342 6.26312L6 14.1339V16C6 16.6935 6.23533 17.3321 6.63048 17.8402C6.23824 18.2816 6 18.863 6 19.5C6 20.8807 7.11929 22 8.5 22C9.88071 22 11 20.8807 11 19.5C11 19.3288 10.9828 19.1616 10.95 19H14.05C14.0172 19.1616 14 19.3288 14 19.5C14 20.8807 15.1193 22 16.5 22C17.8807 22 19 20.8807 19 19.5C19 19.1715 18.9366 18.8578 18.8215 18.5704C18.934 18.4086 19 18.212 19 18C19 17.4477 18.5523 17 18 17H16.5H9C8.44772 17 8 16.5523 8 16V15H18.236C19.1381 15 19.9285 14.3962 20.1657 13.5258L21.8007 7.52583C22.1473 6.25364 21.1896 5 19.871 5H5.58198L5.3667 4.21065C5.01074 2.90547 3.82526 2 2.47241 2H2ZM16.5 19C16.2239 19 16 19.2239 16 19.5C16 19.7761 16.2239 20 16.5 20C16.7761 20 17 19.7761 17 19.5C17 19.2239 16.7761 19 16.5 19ZM18.236 13H7.7638L6.12743 7H19.871L18.236 13ZM8.5 19C8.22386 19 8 19.2239 8 19.5C8 19.7761 8.22386 20 8.5 20C8.77614 20 9 19.7761 9 19.5C9 19.2239 8.77614 19 8.5 19Z" fill="#000000"/>
       </svg>
       <span className="ml-10">{totalPrice} руб.</span>
      </li>

    <li className="heart">
      <Link to="/favorites">
        <img width="30px" height="30px" src="/img/like/favorites.svg" alt="Закладки" />
      </Link>
    </li>

      <li>
      <Link to="/orders">
               <svg width="30px" height="30px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
       <path fill="#444" d="M15 3v10h-14v-10h14zM16 2h-16v12h16v-12z"></path>
       <path fill="#444" d="M8 5h6v1h-6v-1z"></path>
       <path fill="#444" d="M8 7h6v1h-6v-1z"></path>
       <path fill="#444" d="M8 9h3v1h-3v-1z"></path>
       <path fill="#444" d="M5.4 7h-0.4v-0.1c0.6-0.2 1-0.8 1-1.4 0-0.8-0.7-1.5-1.5-1.5s-1.5 0.7-1.5 1.5c0 0.7 0.4 1.2 1 1.4v0.1h-0.4c-0.9 0-1.6 0.7-1.6 1.6v2.4h5v-2.4c0-0.9-0.7-1.6-1.6-1.6z"></path>
       </svg>
      </Link>
      </li>
   </ul>
 </header> 
  )
}
