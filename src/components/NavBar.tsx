import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavBar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const callbackUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

  return (
    <div className="p-4">
      <ul className="font-medium flex flex-col p-8 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
        <Link
          aria-current="page"
          to="/"
          className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
        >
          Event360
        </Link>
        <Link
          aria-current="page"
          to="/events"
          className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
        >
          Eventos
        </Link>
        <Link
          aria-current="page"
          to="/"
          className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
        >
          Mis Eventos
        </Link>
        <Link
          aria-current="page"
          to="/"
          className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
        >
          Dashboard
        </Link>

        {!isAuthenticated && (
          <li className="ml-auto">
            <button
              type="button"
              onClick={() => loginWithRedirect()}
              aria-current="page"
              className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
            >
              Iniciar Sesión
            </button>
          </li>
        )}
        {isAuthenticated && (
          <div className="flex flex-row gap-4">
            <li>
              <Link
                aria-current="page"
                to="/profile"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
              >
                Mi Perfil
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  logout({ logoutParams: { returnTo: callbackUri } })
                }
                aria-current="page"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
              >
                Cerrar Sesión
              </button>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}
