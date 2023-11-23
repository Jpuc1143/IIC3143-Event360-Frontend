import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react"
import Loading from "../components/Loading/Loading";
import { useParams, useNavigate } from 'react-router';
import { getRequest, postRequest } from "../api/queries";

export default function PaymentMock() {
  const { id } = useParams();
  const navigate  = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [eventName, setEventName] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 6000)
  }, [])

  useEffect(() => {
    const postOrder = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        await postRequest(`/events/${id}/orders`, {}, accessToken);
        
      } catch (error) {
        console.log(error);
      }
    }
    const getEvent = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const event = await getRequest(`/events/${id}`, accessToken);
        console.log(event)
        setEventName(event.data.name)
      } catch (error) {
        console.log(error)
      }
    }
    postOrder();
    getEvent();
  }, [id, getAccessTokenSilently]);


  return (
    <div className="">
      {isLoading && (
        <div className='custom-height flex flex-col text-center justify-center mx-2'>
          <Loading isLoading={isLoading} type='payment'/>
          <p className='font-bold text-2xl text-primary-dark'>Tu pago se esta procesando...</p>
        </div>
      )}
      {!isLoading && (
        <div className='custom-height flex flex-col items-center justify-center mx-2 gap-6'>
          <p className='font-bold text-2xl text-primary-dark'>¡El pago ha sido realizado con exito!</p>
          <p className='font-semibold text-lg text-black'>Te has inscrito al siguiente evento:</p>
          <p className='font-medium text-lg text-black'>{eventName}</p>
          <div className='flex flex-row items-center gap-8'>
            {/* TODO: Poner las rutas correctas cuando esten */}
            <button onClick={() => navigate(`/events/${id}`, { replace: true })} className='w-32 h-8 bg-primary hover:bg-primary-dark text-white rounded-full font-bold hover:'>Ver evento</button>
            <button onClick={() => navigate('/events/me', { replace: true })} className='w-32 h-8 bg-primary hover:bg-primary-dark text-white rounded-full font-bold hover:'>Mis eventos</button>
          </div>
        </div>
      )}
    </div>
  )
}