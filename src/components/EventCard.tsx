import event_img from '../assets/bellybeach.jpg';
import { useAuth0 } from "@auth0/auth0-react";

export default function EventCard({ event }: { event: Event }) {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    return (
        <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl">
            <img className="w-full h-72 object-cover" src={event_img} alt={event.name} />
            <div className='px-6 py-4'>
                <div className='mb-2'>
                    <h3 className='font-bold text-xl text-primary-dark'>
                        {event.name}
                    </h3>
                    <div className='flex justify-between text-sm'>
                        {event.organization}
                    </div>
                    <span className='text-base font-bold'>
                        {event.date}
                    </span>
                </div>
            </div>
            <div className='px-6 pb-2 '>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>Presencial</span>
            </div>
            {isAuthenticated && (
                <div className='grid items-center mb-4 mx-6'>
                    <button className='px-8 py-2 bg-primary hover:bg-primary-dark text-white rounded-full font-bold hover:'>Comprar</button>
                </div>
            )}
        </div>
    );
}