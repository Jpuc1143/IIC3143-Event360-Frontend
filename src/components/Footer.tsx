import instagramLogo from '../assets/InstagramLogo.svg';
import facebookLogo from '../assets/FacebookLogo.svg';

export default function Footer() {
    return(
        <div className="p-12 bg-primary-dark w-full h-80 flex flex-col items-center">
            <h1 className="text-4xl">
                <span className="text-white">Event</span>
                <span className="text-primary-light">360</span>
            </h1>
            <div className='flex flex-row'>
                <img className="text-white" src={instagramLogo} alt="Instagram Logo"/>
                <img className="text-white" src={facebookLogo} alt="Facebook Logo"/>
            </div>
        </div>
    )
}