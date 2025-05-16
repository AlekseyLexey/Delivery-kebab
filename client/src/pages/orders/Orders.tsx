import React, { useEffect, useState } from 'react'
import $api from '../../configs/axiosConfig';
import type { IProductType } from '../../components/product/type';
import Product from '../../components/product/Product';

function Orders(): React.JSX.Element {

const [ orders, setOrders ] = useState([]);

useEffect(() => {
  getOrdersFromBusket();
}, [])

async function getOrdersFromBusket(): Promise<void> {
  const response = await $api.get('/orders');
  if(response.status === 200) {
    setOrders(response.data);
  }
}


  return (
    <>
    <div>Orders</div>
    <div>
      {orders.map((p:IProductType) => {
        return (
          <li key={p.id}>
            <h1>Заказ</h1>
            <Product product={p} />
          </li>
        )
      })}
    </div>
    </>
    
  )
}

export default Orders