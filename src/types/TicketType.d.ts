interface TicketType {
  id: number;
  name: string;
  eventId: number;
  price: number;
  amount: number;
  ticketsLeft: number;
  domainWhitelist: string;
}
