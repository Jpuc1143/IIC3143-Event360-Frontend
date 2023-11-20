import EventCard from "../components/EventCard";
import main_img from "../assets/auditorio-luksic.jpg";

const evento = {
  name: "DCCTarreo",
  organization: "Departamento en Ciencias de la Computación",
  event_type: "Presencial",
  description: "El DCC te invita a su tarreo",
  date: "15/10/2021",
  location: "Sala de Eventos",
  price: 1000,
} as Event;

export default function Home() {
  return (
    <div className="mx-16 my-8">
      <img className="w-full h-96 rounded-xl" src={main_img} alt="main-img"/>
      <div className="bg-primary-dark h-36 w-full rounded-xl mx-16">
        hola
      </div>
      <div className="mx-32">
        <h1 className="text-4xl font-bold my-8 text-primary">Eventos</h1>
        <div className="grid grid-cols-3 gap-8">
          <EventCard event={evento} />
          <EventCard event={evento} />
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