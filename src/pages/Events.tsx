import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import { getRequest } from "../api/queries";
import { useLocation } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

const evento = {
  id: 1,
  name: "DCCTarreo",
  organization: "Departamento en Ciencias de la Computación",
  event_type: "Presencial",
  description: "El DCC te invita a su tarreo",
  start_datetime: "15/10/2021",
  end_datetime: "15/10/2021",
  location: "Sala de Eventos",
} as Event;

export default function Events() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [events, setEvents] = useState<Event[]>([]);
  const { pathname } = useLocation();
  const title =
    pathname === '/my-events' ? 'Mis Eventos' :
    pathname === '/my-organized-events' ? 'Mis Eventos Organizados' :
    'Eventos';

  useEffect(() => {
    const getEvents = async () => {
      const { data } = await getRequest(pathname, 'token');
      if (data) setEvents(data);
    }
    getEvents();
  }, [pathname]);

  return (
    <div className="mx-32">
        <h1 className="text-4xl font-bold my-8 text-primary">{title}</h1>
        {isAuthenticated && pathname === '/my-organized-events' && (
          <div className="flex flex-row my-8">
            <a href="/create-event" className="bg-secondary text-white font-bold text-lg rounded-full px-5 py-2">
              Crear Evento
            </a>  
          </div>
        )}
        <div className="grid grid-cols-3 gap-8">
          {events.map((event) => <EventCard event={event} />)}
          <EventCard event={evento} />
          <EventCard event={evento} />
          <EventCard event={evento} />
          <EventCard event={evento} />
          <EventCard event={evento} />
        </div>
    </div>
  )
}