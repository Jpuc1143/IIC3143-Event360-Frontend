import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getRequest } from "../api/queries";
import { useParams } from "react-router";
import TicketTypeCard from "../components/TicketTypeCard";
import { useNavigate } from "react-router";

export default function ShowEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const getTicketTypes = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data } = await getRequest(`/users/me/events_organized/${id}`, accessToken);
      if (data) setTicketTypes(data);
    };
    getTicketTypes();
  }, [id]);

  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
  
  return (
    <div className="grid grid-cols-3 gap-8">
        {ticketTypes.map((ticket) => (
          <TicketTypeCard ticket={ticket} />
        ))}
      <button
        onClick={() => navigate(`/edit-event/${id}/ticket`, { replace: true })}
        className="w-32 h-8 bg-primary hover:bg-primary-dark text-white rounded-full font-bold hover:"
      >
        Añadir tipo de ticket
      </button>
    </div>
  );
}
