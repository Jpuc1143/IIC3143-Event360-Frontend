import EventCard from "../../components/EventCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest } from "../../api/queries";
import { useLocation } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
/* import { access } from "fs"; */


export default function Events() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [events, setEvents] = useState<Event[]>([]);
  const { pathname } = useLocation();

  const title =
    pathname === "/my-events"
      ? "Mis Eventos"
      : pathname === "/my-organized-events"
        ? "Mis Eventos Organizados"
        : "Eventos";

  useEffect(() => {
    if (pathname === "/my-events") {
      const getEvents = async () => {
        const accessToken = await getAccessTokenSilently();
        const { data } = await getRequest("/users/me/events", accessToken);
        if (data) setEvents(data);
      };
      getEvents();
    } else if (pathname === "/my-organized-events") {
      const getEvents = async () => {
        const accessToken = await getAccessTokenSilently();
        const { data } = await getRequest(
          "/users/me/events_organized",
          accessToken,
        );
        if (data) setEvents(data);
      };
      getEvents();
    } else {
      const getEvents = async () => {
        const { data } = await getRequest("/events", "token");
        if (data) setEvents(data);
      };
      getEvents();
    }
  }, [pathname, getAccessTokenSilently]);

  return (
    <div className="mx-32">
      <h1 className="text-4xl font-bold my-8 text-primary">{title}</h1>
      {isAuthenticated && pathname === "/my-organized-events" && (
        <div className="flex flex-row my-8">
          <Link
            to="/create-event"
            className="bg-secondary text-white font-bold text-lg rounded-full px-5 py-2"
          >
            Crear Evento
          </Link>
        </div>
      )}
      <div className="grid grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard event={event} />
        ))}
      </div>
    </div>
  );
}
