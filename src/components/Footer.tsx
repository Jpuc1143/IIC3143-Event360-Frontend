import instagramLogo from '../assets/InstagramLogo.svg';
import facebookLogo from '../assets/FacebookLogo.svg';
import linkedinLogo from '../assets/LinkedinLogo.svg';

export default function Footer() {
    return(
        <div className="mt-4 p-12 bg-primary-dark w-full flex flex-col items-center gap-3">
            <h1 className="text-4xl">
                <span className="text-white">Event</span>
                <span className="text-primary-light">360</span>
            </h1>
            <div className='flex flex-row m-4 gap-4'>
                <a href='https://youtu.be/dQw4w9WgXcQ?t=43'>
                    <img className="text-white" src={linkedinLogo} alt="Linkedin Logo" />
                </a>
                <a href='https://youtu.be/dQw4w9WgXcQ?t=43'>
                    <img className='text-white' src={instagramLogo} alt='Instagram Logo' />
                </a>
                <a href='/'>
                    <img className="text-white" src={facebookLogo} alt="Facebook Logo" />
                </a>
            </div>
            <p className='text-white text-sm'>IIC3143 Desarrollo de Software - Proyecto Event360®</p>
        </div>
    )
}