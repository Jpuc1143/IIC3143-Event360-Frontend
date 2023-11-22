import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import { getRequest } from "../api/queries";
import { useLocation } from "react-router";

const evento = {
  name: "DCCTarreo",
  organization: "Departamento en Ciencias de la Computación",
  event_type: "Presencial",
  description: "El DCC te invita a su tarreo",
  date: "15/10/2021",
  location: "Sala de Eventos",
  price: 1000,
} as Event;

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const { pathname } = useLocation();
  const title = pathname === '/my-events' ? 'Mis Eventos' : 'Eventos';

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