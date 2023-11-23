/* eslint-disable @typescript-eslint/no-unused-vars */
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import { getRequest } from "../api/queries";
import { useLocation } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { access } from "fs";

const evento = {
  id: 1,
  name: "DCCTarreo",
  organization: "Departamento en Ciencias de la Computación",
  event_type: "Presencial",
  description: "El DCC te invita a su tarreo",
  start_datetime: "15/10/2021",
  end_datetime: "15/10/2021",
  location: "Sala de Eventos",
  image: 'https://scontent.cdninstagram.com/v/t39.30808-6/375866728_18384927592051728_9106154841496335470_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=Pi9f2CotQ7kAX8PWZDt&edm=APs17CUAAAAA&ccb=7-5&oh=00_AfBmlfzziXjzxdphi5qb8ZlMMFqefTgqZ2m7kM9LlA0tvw&oe=65642694&_nc_sid=10d13b',
  merchantCode: 0,
} as Event;

export default function Events() {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [events, setEvents] = useState<Event[]>([]);
  const { pathname } = useLocation();

  const title =
    pathname === '/my-events' ? 'Mis Eventos' :
    pathname === '/my-organized-events' ? 'Mis Eventos Organizados' :
    'Eventos';

  useEffect(() => {
    const getEvents = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data } = await getRequest('/events', accessToken);
      if (data) setEvents(data);
    }
    getEvents();
  }, [getAccessTokenSilently]);

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