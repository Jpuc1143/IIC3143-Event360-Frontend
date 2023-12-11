import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import es from "dayjs/locale/es";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(es);

export default function EventCard({ event }: { event: Event }) {
  const { isAuthenticated } = useAuth0();
  const { pathname } = useLocation();
  const redirect_path =
    pathname === "/my-organized-events" ? "/edit-event" : "/view-event";

  return (
    <Link
      to={{
        pathname: `${redirect_path}/${event.id}`,
      }}
    >
      <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl">
        <img
          className="w-full h-72 object-cover"
          src={event.image}
          alt={event.name}
        />
        <div className="px-6 py-4">
          <div className="mb-2">
            <h3 className="font-bold text-xl text-primary-dark">
              {event.name}
            </h3>
            <div className="flex justify-between text-sm">
              {event.organization}
            </div>
            <span className="text-base font-bold">
              {dayjs(event.startDate).tz("America/Santiago").format("LLL")} hrs
            </span>
          </div>
        </div>
        <div className="px-6 pb-2 ">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {event.eventType}
          </span>
        </div>
        {isAuthenticated && (pathname === "/events" || pathname === "/") && (
          <div className="grid items-center mb-4 mx-6">
            <Link
              className="px-8 py-2 bg-primary text-center hover:bg-primary-dark text-white rounded-full font-bold hover:"
              to={{
                pathname: `/events/${event.id}`,
              }}
              state={{ event: event }}
            >
              Comprar
            </Link>
          </div>
        )}
        {isAuthenticated && pathname === "/my-organized-events" && (
          <div className="grid items-center mb-4 mx-6">
            <Link
              className="px-8 py-2 bg-primary text-center hover:bg-primary-dark text-white rounded-full font-bold hover:"
              to={{
                pathname: `/edit-event/${event.id}`,
              }}
            >
              Editar
            </Link>
          </div>
        )}
      </div>
    </Link>
  );
}
