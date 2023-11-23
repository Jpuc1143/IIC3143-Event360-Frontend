import TicketCard from "../components/TicketCard";
import event_img from '../assets/event.jpg';
import { useEffect, useState } from "react";
import { getRequest } from "../api/queries";
import { useAuth0 } from "@auth0/auth0-react";

const ticket1 = {
  price: 10000,
  amount: 150,
  domainWhiteList: "uc.cl",
} as TicketType;

const ticket2 = {
    price: 15000,
    amount: 30,
    domainWhiteList: "all",
  } as TicketType;

const ticket3 = {
price: 7500,
amount: 10,
domainWhiteList: "uc.cl",
} as TicketType;

export default function Tickets() {
  useEffect(() => {
    const getTickets = async () => {
      const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
      const event_id = window.location.href.split('/').pop(); //cambiar
      const { data } = await getRequest('/events/' + event_id, 'token');
      if (data) setTickets(data);
    }
    getTickets();
  }, []);

  const [tickets, setTickets] = useState<TicketType[]>([]);


  return (
    <div className="mx-16 my-8">
      <div className="mx-32">
        <h1 className="text-4xl font-bold my-8 text-primary">Tus Órdenes</h1>
        <div className="grid grid-cols-3 gap-8">
          {tickets.map((ticket) => <TicketCard ticket={ticket} />)}
          <TicketCard ticket={ticket1} />
          <TicketCard ticket={ticket2} />
          <TicketCard ticket={ticket3} />
        </div>
      </div>
    </div>
  )
}