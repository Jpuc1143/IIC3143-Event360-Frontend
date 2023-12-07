import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import main_img from "../assets/party.jpeg";
import { useEffect, useState } from "react";
import { getRequest } from "../api/queries";

const evento = {
  id: 1,
  name: "DCCTarreo",
  organization: "Departamento en Ciencias de la Computación",
  eventType: "Presencial",
  description: "El DCC te invita a su tarreo",
  startDate: "15/10/2021",
  endDate: "15/10/2021",
  location: "Sala de Eventos",
  image:
    "https://scontent.cdninstagram.com/v/t39.30808-6/375866728_18384927592051728_9106154841496335470_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=Pi9f2CotQ7kAX8PWZDt&edm=APs17CUAAAAA&ccb=7-5&oh=00_AfBmlfzziXjzxdphi5qb8ZlMMFqefTgqZ2m7kM9LlA0tvw&oe=65642694&_nc_sid=10d13b",
  merchantCode: 0,
} as Event;

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const { data } = await getRequest("/events", "token");
      if (data) setEvents(data);
    };
    getEvents();
  }, []);

  return (
    <div className="mx-16 my-8">
      <div className="flex flex-col items-center relative mb-16">
        <h1 className="py-4 absolute mt-12 bg-white/40 w-full flex justify-center">
          <span className="text-primary-dark text-5xl font-bold">Event</span>
          <span className="text-primary-light text-5xl font-bold">360</span>
        </h1>
        <img
          className="w-full max-h-96 rounded-xl object-cover"
          src={main_img}
          alt="main-img"
        />
        <SearchBar />
      </div>
      <div className="mx-32">
        <h1 className="text-4xl font-bold my-8 text-primary">Eventos</h1>
        <div className="grid grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard event={event} />
          ))}
          <EventCard event={evento} />
          <EventCard event={evento} />
          <EventCard event={evento} />
          <EventCard event={evento} />
          <EventCard event={evento} />
        </div>
      </div>
    </div>
  );
}
