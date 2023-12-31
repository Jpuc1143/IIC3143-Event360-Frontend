import { useAuth0 } from "@auth0/auth0-react";

export default function OrderCard({ order }: { order: Order }) {
  const { isAuthenticated } = useAuth0();
  /* alt  ticket.name ???? */
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl">
      <div className="px-6 py-4">
        <div className="mb-2">
          <h3 className="font-bold text-xl text-primary-dark">{order.id}</h3>
          <div className="text-base font-bold">Estado: {order.status}</div>
          <div className="flex justify-between text-sm">
            Total de compra: ${order.price}
          </div>
        </div>
      </div>
      {isAuthenticated && (
        <div className="grid items-center mb-4 mx-6">
          <button className="px-8 py-2 bg-primary hover:bg-primary-dark text-white rounded-full font-bold hover:">
            Comprar
          </button>
        </div>
      )}
    </div>
  );
}
