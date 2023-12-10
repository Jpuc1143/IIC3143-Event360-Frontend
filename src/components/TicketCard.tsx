import ticket_img from "../assets/ticket.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

export default function TicketCard({ ticket }: { ticket: TicketType }) {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  /* alt  ticket.name ???? */
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl">
      <img alt="" className="w-full" src={ticket_img} />
      <div className="px-6 py-4">
        <div className="mb-2">
          <h3 className="font-bold text-xl text-primary-dark">{ticket.id}</h3>
          <div className="flex justify-between text-sm">
            Precio: ${ticket.price}
          </div>
          <div className="text-base font-bold">Restantes: {ticket.ticketsLeft}/{ticket.amount}</div>
          {ticket.domainWhiteList !== "" && (
            <div className="text-base font-bold">
              (Solo válido para correos {ticket.domainWhitelist})
            </div>
          )}
        </div>
      </div>
      {isAuthenticated && (
        <div className="grid items-center mb-4 mx-6">
          <button
            onClick={() => navigate(`/payment/${ticket.id}`, { replace: true })}
            className="w-32 h-8 bg-primary hover:bg-primary-dark text-white rounded-full font-bold hover:"
          >
            Comprar ticket
          </button>
        </div>
      )}
    </div>
  );
}
