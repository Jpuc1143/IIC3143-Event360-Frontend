/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from 'react-router';
import { postRequest } from '../api/queries';

export default function EventCard({ event }: { event: Event }) {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const { pathname } = useLocation();
    const redirect_path = 
        pathname === '/my-organized-events' ? '/edit-event' :
        '/view-event';

    return (
        <Link
            to={{
                pathname: `${redirect_path}/${event.id}`
            }}
        >
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl">
                <img className="w-full h-72 object-cover" src={'https://scontent.cdninstagram.com/v/t39.30808-6/375866728_18384927592051728_9106154841496335470_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=Pi9f2CotQ7kAX8PWZDt&edm=APs17CUAAAAA&ccb=7-5&oh=00_AfBmlfzziXjzxdphi5qb8ZlMMFqefTgqZ2m7kM9LlA0tvw&oe=65642694&_nc_sid=10d13b'} alt={event.name} />
                <div className='px-6 py-4'>
                    <div className='mb-2'>
                        <h3 className='font-bold text-xl text-primary-dark'>
                            {event.name}
                        </h3>
                        <div className='flex justify-between text-sm'>
                            {event.organization}
                        </div>
                        <span className='text-base font-bold'>
                            {event.startDate}
                        </span>
                    </div>
                </div>
                <div className='px-6 pb-2 '>
                    <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>Presencial</span>
                </div>
                {isAuthenticated && (pathname === '/events'|| pathname === '/') && (
                    <div className='grid items-center mb-4 mx-6'>
                        <Link
                            className='px-8 py-2 bg-primary text-center hover:bg-primary-dark text-white rounded-full font-bold hover:'
                            to={{
                                pathname: `/events/${event.id}`,
                            }}
                            state={{ event: event }}
                        >
                            Comprar
                        </Link>
                    </div>
                )}
                {isAuthenticated && pathname === '/my-organized-events' && (
                    <div className='grid items-center mb-4 mx-6'>
                        <Link
                            className='px-8 py-2 bg-primary text-center hover:bg-primary-dark text-white rounded-full font-bold hover:'
                            to={{
                                pathname: `/edit-event/${event.id}`,
                            }}
                        >
                            Editar
                        </Link>
                    </div>
                )}
            </div>
        </Link> 
    );
}