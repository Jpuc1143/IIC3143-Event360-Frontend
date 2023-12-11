import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getRequest } from "../../api/queries";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
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
    <div className="mt-10 mb-20 my-96 h-[600px] w-[1600px] flex flex-col rounded-lg md:flex-row mx-auto">
      <img
        className="h-96  rounded-lg object-cover w-[500px] h-[500px] mx-auto md:mx-0"
        src={event?.image}
        alt=""
      />
      <div className="flex flex-col justify-start p-6 whitespace-pre-wrap">
        <h1 className="mb-10 text-3xl font-bold">{event?.name}</h1>
        <p className="mb-4 text-2xl text-neutral-800 whitespace-nowrap  overflow-y-auto whitespace-pre-wrap">
          Descripción: {event?.description}
        </p>
        <p className="mb-4 text-2xl text-neutral-800 whitespace-nowrap ">
          Ubicación: {event?.location}
        </p>
        <p className="mb-4 text-2xl text-neutral-800 whitespace-nowrap ">
          Modalidad: {event?.eventType}
        </p>
        <p className="mb-4 text-2xl text-neutral-800 whitespace-nowrap ">
          Fecha de inicio: {startDate}
        </p>
        <p className="mb-4 text-2xl text-neutral-800 whitespace-nowrap ">
          Fecha de término: {endDate}
        </p>
        <p className="mb-4 text-2xl text-neutral-800 whitespace-nowrap ">
          Organización: {event?.organization}
        </p>
        {isAuthenticated && (
          <div className="grid items-center mb-4 mx-6">
            <Link
              className="px-8 py-2 mx-auto bg-primary text-center w-[400px] hover:bg-primary-dark text-white rounded-full font-bold hover:"
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
