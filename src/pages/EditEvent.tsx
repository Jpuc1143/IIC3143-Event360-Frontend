import { Link, useParams } from "react-router-dom";

export default function EditEvent() {
  const eventId = useParams<{ id: string }>().id;
  return (
    <div>
      <h1>EditEvent</h1>
      <Link to={`/verify-ticket/${eventId}`}>Verificar tickets</Link>
    </div>
  );
}
