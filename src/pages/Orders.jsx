import React from 'react';
import Card from '../components/card/Card';
import axios from "axios";
import AppContext from '../context';

function Orders (){
  const {onAddToFavorite, onAddToCart} = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
try {
      const {data} = await axios.get("https://643dc6cf6c30feced819c5f8.mockapi.io/order");
      setOrders(data.reduce((prev, obj) => [...prev, ...obj.items],[]));
      setIsLoading(false);
} catch (error) {
  alert('Ошибка при запросе заказов');
}
    })();
  }, []);
   return (
      <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мой заказы</h1>

      </div>
      <div className="d-flex flex-wrap">
      {isLoading ? [...Array(8)] : orders.map((item, index) => (
            <Card   key={index}
                    Loading={isLoading}
                    {...item}/>
          ))}
      </div>
    </div>
   )
};

export default Orders;