import ticket_img from '../assets/ticket.png';
import { useAuth0 } from "@auth0/auth0-react";

export default function TicketCard({ ticket }: { ticket: TicketType }) {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    /* alt  ticket.name ???? */
    return (
        <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl">
            <img className="w-full" src={ticket_img} />
            <div className='px-6 py-4'>
                <div className='mb-2'>
                    <h3 className='font-bold text-xl text-primary-dark'>
                        {ticket.id}
                    </h3>
                    <div className='flex justify-between text-sm'>
                        Precio: ${ticket.price}
                    </div>
                    <div className='text-base font-bold'>
                        Restantes: {ticket.amount}
                    </div>
                    {ticket.domainWhiteList != 'all' && (
                        <div className='text-base font-bold'>
                            (Solo válido para correos {ticket.domainWhiteList})
                        </div>
                    )}
                </div>
            </div>
            {isAuthenticated && (
                <div className='grid items-center mb-4 mx-6'>
                    <button className='px-8 py-2 bg-primary hover:bg-primary-dark text-white rounded-full font-bold hover:'>Comprar</button>
                </div>
            )}
        </div>
    );
}