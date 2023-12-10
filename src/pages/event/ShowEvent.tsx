import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getRequest } from "../../api/queries";
import { Link } from "react-router-dom";
import TicketTypeCard from "../../components/TicketTypeCard";
import { useNavigate } from "react-router";
import changeDateFormat from "../../utils/changeDateFormat";

export default function Event() {
  const navigate = useNavigate();
  const EventId = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event>();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showAttendees, setShowAttendees] = useState(false);
  const [attendees, setAttendees] = useState<User[]>([]);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);

  useEffect(() => {
    const getEvent = async () => {
      const { data } = await getRequest(`/events/${EventId.id}`, "token");
      if (data) {
        setEvent(data);
        setStartDate(changeDateFormat(data.startDate));
        setEndDate(changeDateFormat(data.endDate));
      }
      console.log(data);
    };
    const getAttendees = async () => {
      const { data } = await getRequest(
        `/events/${EventId.id}/attendees`,
        "token",
      );
      if (data) {
        setAttendees(data);
        console.log(data);
      }
    };
    const getTicketTypes = async () => {
      // const accessToken = await getAccessTokenSilently();
      const { data } = await getRequest(
        `/users/me/events_organized/${EventId.id}`,
        "token",
      );
      if (data) setTicketTypes(data);
      console.log(data);
    };
    getEvent();
    getAttendees();
    getTicketTypes();
  }, [EventId.id]);

  return (
    <div className="mx-auto my-52 h-[500px] w-[1200px] flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:flex-row">
      <img
        className="h-96 w-full rounded-t-lg object-cover md:h-auto w-[400px] md:rounded-none md:rounded-l-lg"
        src={event?.image}
        alt=""
      />
      <div className="flex flex-col justify-start p-6">
        <h1 className="mb-2 text-3xl font-medium">{event?.name}</h1>
        <p className="mb-4 text-2xl text-neutral-800">
          Descripción: {event?.description}
        </p>
        <p className="mb-4 text-2xl text-neutral-800">
          Ubicación: {event?.location}
        </p>
        <p className="mb-4 text-2xl text-neutral-800">
          Modalidad: {event?.eventType}
        </p>
        <p className="mb-4 text-2xl text-neutral-800">
          Fecha de inicio: {startDate}
        </p>
        <p className="mb-4 text-2xl text-neutral-800">
          Fecha de término: {endDate}
        </p>
        <p className="text-xl text-neutral-500">
          Organización: {event?.organization}
        </p>
      </div>
      {!showAttendees && (
        <button className="mx-auto my-8" onClick={() => setShowAttendees(true)}>
          Mostrar asistentes
        </button>
      )}
      {showAttendees && (
        <div className="mx-auto my-8">
          Asistentes
          <ul>
            {attendees.map((attendee) => (
              <li key={attendee.id}>
                <Link to={`/users/${attendee.id}`}>{attendee.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid grid-cols-3 gap-8">
        {ticketTypes.map((ticket) => (
          <TicketTypeCard ticket={ticket} />
        ))}
        <button
          onClick={() =>
            navigate(`/edit-event/${EventId.id}/ticket`, { replace: true })
          }
          className="w-32 h-8 bg-primary hover:bg-primary-dark text-white rounded-full font-bold hover:"
        >
          Añadir tipo de ticket
        </button>
      </div>
    </div>
  );
}
