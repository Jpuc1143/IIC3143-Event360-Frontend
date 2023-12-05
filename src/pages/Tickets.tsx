import TicketCard from "../components/TicketCard";
import event_img from "../assets/event.jpg";

const ticket1 = {
  price: 10000,
  amount: 150,
  domainWhiteList: "uc.cl",
} as TicketType;

const ticket2 = {
  price: 15000,
  amount: 30,
  domainWhiteList: "all",
} as TicketType;

const ticket3 = {
  price: 7500,
  amount: 10,
  domainWhiteList: "uc.cl",
} as TicketType;

export default function Tickets() {
  return (
    <div className="mx-16 my-8">
      <img className="w-full h-96 rounded-xl" src={event_img} alt="event-img" />
      <div className="mx-32">
        <h1 className="text-4xl font-bold my-8 text-primary">
          Tipos de Ticket
        </h1>
        <div className="grid grid-cols-3 gap-8">
          <TicketCard ticket={ticket1} />
          <TicketCard ticket={ticket2} />
          <TicketCard ticket={ticket3} />
        </div>
      </div>
    </div>
  );
}
