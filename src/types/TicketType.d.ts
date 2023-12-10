interface TicketType {
  id: number;
  event_id: number;
  price: number;
  amount: number;
  ticketsLeft: number;
  domainWhitelist: string;
}
