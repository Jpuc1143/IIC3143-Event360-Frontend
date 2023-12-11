import React, { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading/Loading";
import { useParams, useNavigate } from "react-router";
import { getRequest, postRequest } from "../api/queries";
import { useLocation } from "react-router-dom";

function PaymentMock() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [eventName, setEventName] = useState("");
  const [error, setError] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [extraWait, setExtraWait] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setExtraWait(false);
      }, 1000);
    }, 5000);
  }, []);

  useEffect(() => {
    const postOrder = async () => {
      if (!isLoading) {
        try {
          const accessToken = await getAccessTokenSilently();
          const response = await postRequest(
            `/tickets`,
            { ticketTypeId: id },
            accessToken,
          );
          if (response.error !== null) {
            setError(true);
            setMsgError(
              "El ticket no se encuentra en stock o tu correo no corresponde con el pedido.",
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const getEvent = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const event = await getRequest(`/events/${state.eventId}`, accessToken);
        setEventName(event.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    postOrder();
    getEvent();
  }, [id, getAccessTokenSilently, state.eventId, isLoading]);

  return (
    <div className="">
      {isLoading || extraWait ? (
        <div className="custom-height flex flex-col text-center justify-center mx-2">
          <Loading isLoading={isLoading} type="payment" />
          <p className="font-bold text-2xl text-primary-dark">
            Tu pago se esta procesando...
          </p>
        </div>
      ) : !isLoading && !error && !extraWait ? (
        <div className="custom-height flex flex-col items-center justify-center mx-2 gap-6">
          <p className="font-bold text-2xl text-primary-dark">
            ¡El pago ha sido realizado con exito!
          </p>
          <p className="font-semibold text-lg text-black">
            Te has inscrito al siguiente evento:
          </p>
          <p className="font-medium text-lg text-black">{eventName}</p>
          <div className="flex flex-row items-center gap-8">
            <button
              onClick={() =>
                navigate(`/view-event/${state.eventId}`, { replace: true })
              }
              className="w-32 h-8 bg-primary hover:bg-primary-dark text-white rounded-full font-bold hover:"
            >
              Ver evento
            </button>
            <button
              onClick={() => navigate("/my-events", { replace: true })}
              className="w-32 h-8 bg-primary hover:bg-primary-dark text-white rounded-full font-bold hover:"
            >
              Mis eventos
            </button>
          </div>
        </div>
      ) : (
        <div className="custom-height flex flex-col items-center justify-center mx-2 gap-6">
          <p className="font-bold text-2xl text-primary-dark">
            ¡Ha habido un error al comprar el ticket!
          </p>
          <p className="font-semibold text-lg text-black">
            {`${msgError} Intente con otro ticket.`}
          </p>
          <div className="flex flex-row items-center gap-8">
            <button
              onClick={() =>
                navigate(`/events/${state.eventId}`, { replace: true })
              }
              className="w-32 h-8 bg-primary hover:bg-primary-dark text-white rounded-full font-bold hover:"
            >
              Volver
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuthenticationRequired(PaymentMock);
