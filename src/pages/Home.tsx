import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import main_img from "../assets/party.jpeg";
import { useEffect, useState } from "react";
import { getRequest } from "../api/queries";

const evento = {
  id: 1,
  name: "DCCTarreo",
  organization: "Departamento en Ciencias de la Computación",
  event_type: "Presencial",
  description: "El DCC te invita a su tarreo",
  start_datetime: "15/10/2021",
  end_datetime: "15/10/2021",
  location: "Sala de Eventos",
} as Event;

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const { data } = await getRequest('/events', 'token');
      if (data) setEvents(data);
    }
    getEvents();
  }, []);

  return (
    <div className="mx-16 my-8">
      <div className="flex flex-col items-center relative mb-16">
        <h1 className="py-4 absolute mt-12 bg-white/40 w-full flex justify-center">
          <span className="text-primary-dark text-5xl font-bold">Event</span>
          <span className="text-primary-light text-5xl font-bold">360</span>
        </h1>
        <img className="w-full max-h-96 rounded-xl object-cover" src={main_img} alt="main-img"/>
        <SearchBar /> 
      </div>
      <div className="mx-32">
        <h1 className="text-4xl font-bold my-8 text-primary">Eventos</h1>
        <div className="grid grid-cols-3 gap-8">
          {events.map((event) => <EventCard event={event} />)}
          <EventCard event={evento} />
          <EventCard event={evento} />
          <EventCard event={evento} />
          <EventCard event={evento} />
          <EventCard event={evento} />
        </div>
      </div>
    </div>
  )
}