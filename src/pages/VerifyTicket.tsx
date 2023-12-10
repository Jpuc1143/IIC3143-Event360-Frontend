import { useParams } from "react-router";
import { useState } from "react";
import { postRequest, patchRequest } from "../api/queries";
//import { useNavigate } from "react-router";
import { QrReader } from "react-qr-reader";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/base";

export default function Event() {
  //const navigate = useNavigate();
  const eventId = useParams<{ id: string }>().id;
  const [ticket, setTicket] = useState<any>(undefined);
  const { getAccessTokenSilently } = useAuth0();

  const getTicket = (secret: string) => {
    getAccessTokenSilently().then((token) => {
      postRequest(`/events/${eventId}/verify`, { secret }, token).then(
        (response) => {
	setTicket(response.data)
	}
      );
    });
  };

  const checkInTicket = (id: string, secret: string) => {
    getAccessTokenSilently().then((token) => {
    patchRequest(`/tickets/${id}/checkin`, {}, token).then(() => getTicket(secret))
    })
  }

  let ticketJsx;
  if (ticket !== undefined && ticket !== null) {
	ticketJsx = (
	<>
	<h4>Ticket válido</h4>
	<ul>
	<li>ID: {ticket?.id}</li>
	<li>Usuario: {ticket?.user.name} ({ticket?.user.email})</li>
	<li>Estado: {ticket?.status}</li>
	</ul>
	{ticket?.status !== "used" ? <Button onClick={()=>checkInTicket(ticket.id, ticket.secret)}>Marcar como utilizado</Button>: null}
	</>
	)
  }

  return (
    <div className="mx-auto w-[300px]">
      <h2>Verificar Ticket</h2>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            getTicket(result.getText());
          }
        }}
        constraints={{}}
      />
      <div>
	{ ticket === undefined ? "Muestre un código QR" : null }
	{ ticket === null ? "Código invalido o no pertenece a evento" : null }
	{ ticket !== undefined && ticket !== null ? ticketJsx: null }
	</div>
    </div>
  );
}
