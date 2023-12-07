import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getRequest } from "../../api/queries";

export default function Profile() {
  const [userEvents, setUserEvents] = useState([]);

  const { user, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const getUser = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const userEvents = await getRequest(`/users/me/events_organized`, accessToken);
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
        <div className="px-6 text-center mt-2 font-light text-sm">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            tincidunt ex ac diam eleifend, in congue mi finibus. Nullam dapibus
            pulvinar lectus ac
          </p>
        </div>
        <hr className="mt-8" />
        <div className="flex p-4">
          <div className="ml-28 text-center">
            Tienes <span className="font-bold">{userEvents.length}</span>{" "}
            Eventos
          </div>
        </div>
      </div>
    </div>
  );
}
