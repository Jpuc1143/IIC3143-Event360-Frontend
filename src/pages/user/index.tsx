import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getRequest } from "../../api/queries";

export default function Profile() {
  const [userEvents, setUserEvents] = useState([]);
  // HARDCODE: Cambiar por condicion que denote si el usuario es o no organizador, y si ha enviado o no una solicitud
  const isOrganizator = false
  const sended = false

  const { user, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const getUser = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const userEvents = await getRequest(
          `/users/me/events_organized`,
          accessToken,
        );
        setUserEvents(userEvents.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [user, getAccessTokenSilently]);
  return (
    <div className="bg-backgroundGrey rounded-md font-sans h-screen w-full flex flex-row justify-center items-center">
      <div className="card w-96 mx-auto bg-white rounded-xl  shadow-xl hover:shadow">
        <img
          className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
          src={user?.picture}
          alt=""
        />
        <div className="text-center mt-2 text-3xl font-medium">
          {user?.name}
        </div>
        <div className="text-center mt-2 font-light text-sm">{`@${user?.nickname}`}</div>
        <div className="text-center mt-2 font-light text-sm">{user?.email}</div>
        <div className="px-6 text-center mt-2 font-light text-base">
          <p>
            Usuario: No organizador
          </p>
        </div>
        <hr className="mt-8" />
        {isOrganizator ? 
        <div className="flex p-4">
          <div className="ml-28 text-center">
            Tienes <span className="font-bold">{userEvents.length}</span>{" "}
            Eventos
          </div>
        </div>
        : 
        <div className="flex p-4 justify-center">
          <div className="flex flex-col items-center justify-center">
            {!sended ? 
            <button className="px-8 py-2 bg-primary text-center hover:bg-primary-dark text-white rounded-full font-bold hover:">
              Solicitar ser organizador
            </button>
            :
            <span className="inline-block bg-gray-200 rounded-full px-8 py-2 text-sm font-semibold text-gray-700 mt-2">
              Solicitud enviada
            </span>
            }
          </div>
        </div>
        }
      </div>
    </div>
  );
}
