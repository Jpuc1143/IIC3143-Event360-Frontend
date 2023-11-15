

export default function NavBar() {
  return(
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">Home</a>
            </li>
            <li>
              <a href="/events" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">Eventos</a>
            </li>
            <li>
              <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">Mis Eventos</a>
            </li>
            <li>
              <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">Dashboard</a>
            </li>
            <li>
              <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">Mi Perfil</a>
            </li>
            <li>
              <a href="/" className="block py-2 px-3 text-white md:hover:bg-transparent bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 " aria-current="page">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
}