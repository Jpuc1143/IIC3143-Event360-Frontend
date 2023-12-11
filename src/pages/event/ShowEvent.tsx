import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getRequest } from "../../api/queries";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import TicketTypeCard from "../../components/TicketTypeCard";
import { useNavigate } from "react-router";
import changeDateFormat from "../../utils/changeDateFormat";

export default function Event() {
  const EventId = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth0();
  const [event, setEvent] = useState<Event>();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const getEvent = async () => {
      const { data } = await getRequest(`/events/${EventId.id}`, "token");
      if (data) {
        setEvent(data);
        setStartDate(changeDateFormat(data.startDate));
        setEndDate(changeDateFormat(data.endDate));
      }
    };
    getEvent();
  }, [EventId.id]);

  return (
    <div className="mt-10 mb-20 my-22 h-[500px] w-[800px] flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:flex-row mx-10">
      <img
        className="h-96 w-full rounded-lg object-cover md:h-auto w-[400px] mx-auto md:mx-0"
        src={event?.image}
        alt=""
      />
      <div className="flex flex-col justify-start p-6">
        <h1 className="mb-10 text-3xl font-bold">{event?.name}</h1>
        <p className="mb-4 text-2xl text-neutral-800 whitespace-nowrap overflow-x-auto">
          Descripción: {event?.description}
        </p>
        <p className="mb-4 text-2xl text-neutral-800 whitespace-nowrap overflow-x-auto">
          Ubicación: {event?.location}
        </p>
        <p className="mb-4 text-2xl text-neutral-800 whitespace-nowrap overflow-x-auto">
          Modalidad: {event?.eventType}
        </p>
        <p className="mb-4 text-2xl text-neutral-800 whitespace-nowrap overflow-x-auto">
          Fecha de inicio: {startDate}
        </p>
        <p className="mb-4 text-2xl text-neutral-800 whitespace-nowrap overflow-x-auto">
          Fecha de término: {endDate}
        </p>
        <p className="mb-4 text-2xl text-neutral-800 whitespace-nowrap overflow-x-auto">
          Organización: {event?.organization}
        </p>
        {isAuthenticated && (
          <div className="grid items-center mb-4 mx-6">
            <Link
              className="px-8 py-2 bg-primary text-center hover:bg-primary-dark text-white rounded-full font-bold hover:"
              to={{
                pathname: `/events/${EventId.id}`,
              }}
              state={{ event: event }}
            >
              Comprar
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
