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
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const [lastIndex, setLastIndex] = useState(currentPage * eventsPerPage);
  const [firstIndex, setFirstIndex] = useState(lastIndex - eventsPerPage);
  const [eventsToShow, setEventsToShow] = useState<Event[]>([]);
  const [npage, setNpage] = useState(0);
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
        if (data) {
          setEvents(data);
          setEventsToShow(data.slice(firstIndex, lastIndex));
          setNpage(Math.ceil(data.length / eventsPerPage));
        }
      };
      getEvents();
    } else if (pathname === "/my-organized-events") {
      const getEvents = async () => {
        const accessToken = await getAccessTokenSilently();
        const { data } = await getRequest(
          "/users/me/events_organized",
          accessToken,
        );
        if (data) {
          setEvents(data);
          setEventsToShow(data.slice(firstIndex, lastIndex));
          setNpage(Math.ceil(data.length / eventsPerPage));
        }
      };
      getEvents();
    } else {
      const getEvents = async () => {
        const accessToken = await getAccessTokenSilently();
        const { data } = await getRequest("/events", accessToken);
        if (data) {
          setEvents(data);
          setEventsToShow(data.slice(firstIndex, lastIndex));
          setNpage(Math.ceil(data.length / eventsPerPage));
        }
      };
      getEvents();
    }
  }, [pathname, getAccessTokenSilently, firstIndex, lastIndex, npage]);

  const nextPage = () => {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
      setFirstIndex(firstIndex + eventsPerPage);
      setLastIndex(lastIndex + eventsPerPage);
      setEventsToShow(events.slice(firstIndex, lastIndex));
    }
  };

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setFirstIndex(firstIndex - eventsPerPage);
      setLastIndex(lastIndex - eventsPerPage);
      setEventsToShow(events.slice(firstIndex, lastIndex));
    }
  };

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
        {eventsToShow.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
      <nav className="mx-auto mt-24">
        <ul className="flex gap-6">
          <li className="page-item">
            <button className="page-link" onClick={prePage}>
              Anterior
            </button>
          </li>
          <li>{currentPage}</li>
          <li className="page-item">
            <button className="page-link" onClick={nextPage}>
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
