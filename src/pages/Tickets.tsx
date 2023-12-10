import { useAuth0 } from "@auth0/auth0-react";
import TicketCard from "../components/TicketCard";
import { useEffect, useState } from "react";
import { getRequest } from "../api/queries";
import { useParams } from "react-router";
/* import { useAuth0 } from "@auth0/auth0-react"; */

export default function Tickets() {
  /* const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0(); */
  const { id } = useParams();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getTickets = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data } = await getRequest(
        `/events/${id}/eventtickets`,
        accessToken,
      );
      if (data) setTickets(data);
    };
    getTickets();
  }, [id, getAccessTokenSilently]);

  const [tickets, setTickets] = useState<TicketType[]>([]);

  return (
    <div className="mx-16 my-8">
      {/* <img className="w-full h-96 rounded-xl" src={event_img} alt="event-img" /> */}
      <div className="mx-32">
        <h1 className="text-4xl font-bold my-8 text-primary">
          Tickets disponibles
        </h1>
        <div className="grid grid-cols-3 gap-8">
          {tickets.map((ticket) => (
            <TicketCard ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}
