import { Link, useParams } from "react-router-dom";
import { postRequest, getRequest } from "../../api/queries";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function EditEvent() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const notificationInputRef = useRef<any>(null);
  const [showAttendees, setShowAttendees] = useState(false);
  const [attendees, setAttendees] = useState<User[]>([]);

  const eventId = useParams<{ id: string }>().id;

  useEffect(() => {
    const getAttendees = async () => {
      const { data } = await getRequest(
        `/events/${eventId}/attendees`,
        "token",
      );
      if (data) {
        setAttendees(data);
      }
    };
    getAttendees();
  }, [eventId]);

  const handleNotificationSend = () => {
    const msg = notificationInputRef.current.value;
    getAccessTokenSilently().then((token) => {
      postRequest(`/events/${eventId}/notify`, { msg }, token).then(
        () => (notificationInputRef.current.value = ""),
      );
    });
  };

  return (
    <div className="flex flex-row-2">
      <div className="mx-32 my-6 flex flex-col items-left gap-3 w-1/3">
        <h1 className="text-primary font-bold text-4xl">Editar Evento</h1>
        <p className="text-primary-dark font bold text-2xl">
          ¿Deseas agregar tickets a tu evento?
        </p>
        <button
          onClick={() =>
            navigate(`/edit-event/${eventId}/ticket`, { replace: true })
          }
          className="px-8 py-2 bg-primary text-center hover:bg-primary-dark text-white rounded-full font-bold hover:"
        >
          Añadir tipo de ticket
        </button>
        <br />
        <p className="text-primary-dark font bold text-2xl">
          Aquí puedes verificar tus tickets (MEJORAR DESCRIPCION)
        </p>
        <Link
          to={`/verify-ticket/${eventId}`}
          className="px-8 py-2 bg-primary text-center hover:bg-primary-dark text-white rounded-full font-bold hover:"
        >
          Verificar tickets
        </Link>
        <br />
        <div className="flex flex-col items-center gap-3">
          <label className="text-primary font bold text-2xl">
            Enviar anuncio a invitados:
          </label>
          <textarea
            ref={notificationInputRef}
            placeholder="Mi anuncio"
            className="w-full h-32 border border-gray-300 focus: focus:outline-none focus:box-shadow-secondary focus:border-secondary rounded-lg p-2"
          />
          <button
            onClick={handleNotificationSend}
            className="bg-secondary text-white font-bold text-lg rounded-full px-5 py-2 w-full hover: hover:bg-[#e35273]"
          >
            Enviar Anuncio
          </button>
        </div>
      </div>
      <div className="mx-32 my-20 w-1/3 flex flex-col items-center gap-3 shadow-lg w-full">
        {!showAttendees && (
          <div className="flex flex-col gap-3">
            <h1 className="text-primary-dark font bold text-2xl">
              ¿Quién asistirá a tu evento?
            </h1>
            <button
              className="px-8 py-2 bg-primary text-center hover:bg-primary-dark text-white rounded-full font-bold hover:"
              onClick={() => setShowAttendees(true)}
            >
              Mostrar asistentes
            </button>
          </div>
        )}
        {showAttendees && (
          <div className="flex flex-col gap-3">
            <h1 className="text-primary-dark font bold text-2xl">Asistentes</h1>
            <ul>
              {attendees.map((attendee) => (
                <li key={attendee.id}>
                  <Link to={`/users/${attendee.id}`}>{attendee.name}</Link>
                </li>
              ))}
            </ul>
            <button
              className="px-8 py-2 bg-primary text-center hover:bg-primary-dark text-white rounded-full font-bold hover:"
              onClick={() => setShowAttendees(false)}
            >
              Ocultar asistentes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuthenticationRequired(EditEvent);
