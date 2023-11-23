import React from 'react';
import Order from "../components/OrderCard";

const order1 = {
  id: 1,
  status: 'pendiente',
  price: 10000,
};

const order2 = {
  id: 2,
  status: 'pagado',
  price: 2,
};

const order3 = {
  id: 3,
  status: 'pendiente',
  price: 1,
};

export default function Orders() {
  return (
    <div className="mx-16 my-8">
      <h1 className="text-4xl font-bold my-8 text-primary">Órdenes</h1>
      <div className="flex flex-wrap justify-between">
        <Order order={order1} />
        <Order order={order2} />
        <Order order={order3} />
      </div>
    </div>
  );
}
