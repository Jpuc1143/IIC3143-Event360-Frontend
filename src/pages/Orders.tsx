import React from "react";
import Order from "../components/OrderCard";
import { useEffect, useState } from "react";
import { getRequest } from "../api/queries";
/* import { useAuth0 } from "@auth0/auth0-react"; */
import { useParams } from "react-router";

const order1 = {
  id: 1,
  status: "pendiente",
  price: 10000,
};

const order2 = {
  id: 2,
  status: "pagado",
  price: 2,
};

const order3 = {
  id: 3,
  status: "pendiente",
  price: 1,
};

export default function Orders() {
  /* const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0(); */
  const { id } = useParams();

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await getRequest(`/orders/${id}`, "token");
      if (data) setOrders(data);
    };
    getOrders();
  }, [id]);

  const [orders, setOrders] = useState<Order[]>([]);

  return (
    <div className="mx-16 my-8">
      <div className="mx-32">
        <h1 className="text-4xl font-bold my-8 text-primary">Tus Órdenes</h1>
        <div className="grid grid-cols-3 gap-8">
          {orders.map((order) => (
            <Order order={order} />
          ))}
          <Order order={order1} />
          <Order order={order2} />
          <Order order={order3} />
        </div>
      </div>
    </div>
  );
}
