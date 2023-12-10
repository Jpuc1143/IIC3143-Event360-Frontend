import { Link, useParams } from "react-router-dom";
import { postRequest } from "../../api/queries";
import { useRef } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function EditEvent() {
  const { getAccessTokenSilently } = useAuth0();
  const notificationInputRef = useRef<any>(null);

  const eventId = useParams<{ id: string }>().id;

  const handleNotificationSend = () => {
    const msg = notificationInputRef.current.value;
    getAccessTokenSilently().then((token) => {
      postRequest(`/events/${eventId}/notify`, { msg }, token).then(
        () => (notificationInputRef.current.value = ""),
      );
    });
  };

  return (
    <div>
      <h1>EditEvent</h1>
      <Link to={`/verify-ticket/${eventId}`}>Verificar tickets</Link>
      <br />
      <label>
        Enviar anuncio a invitados:
        <button onClick={handleNotificationSend}>Enviar</button>
        <br />
        <textarea ref={notificationInputRef} placeholder="Mi anuncio" />
      </label>
    </div>
  );
}

export default withAuthenticationRequired(EditEvent);
