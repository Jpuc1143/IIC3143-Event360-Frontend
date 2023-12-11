import EventCard from "../../components/EventCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest } from "../../api/queries";
import { useLocation } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export default function Events() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const [lastIndex, setLastIndex] = useState(currentPage * eventsPerPage);
  const [firstIndex, setFirstIndex] = useState(lastIndex - eventsPerPage);
  const [eventsToShow, setEventsToShow] = useState<any[]>([]);
  const [npage, setNpage] = useState(0);
  const [events, setEvents] = useState<any[]>([]);
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
          data.reverse();
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
          data.reverse();
          setEvents(data);
          setEventsToShow(data.slice(firstIndex, lastIndex));
          setNpage(Math.ceil(data.length / eventsPerPage));
        }
      };
      getEvents();
    } else {
      const getEvents = async () => {
        const { data } = await getRequest("/events", "null");
        if (data) {
          data.reverse();
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
        {eventsToShow.map((datum) => {
          if (pathname === "/my-events" && datum.ticketType !== undefined) {
            return (
              <EventCard
                key={Math.random()}
                event={datum.ticketType.event}
                qrSecret={datum.secret}
              />
            );
          } else {
            return <EventCard event={datum} />;
          }
        })}
      </div>
      <nav className="mt-24 flex justify-center ">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li className="">
            <button
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              onClick={prePage}
            >
              Anterior
            </button>
          </li>
          <li>
            <div className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">
              {currentPage}
            </div>
          </li>
          <li className="">
            <button
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              onClick={nextPage}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
