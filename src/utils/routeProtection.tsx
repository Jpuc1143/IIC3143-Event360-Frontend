import { Outlet, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getRequest } from "../api/queries";
import { useEffect, useState } from "react";

interface PrivateRoutesProps {
  roles: string[];
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ roles }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [access, setAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const userInfo = await getRequest(`/users/me/`, accessToken);
        let hasAccess = false;
        if (roles.includes("organizer")) {
          hasAccess = userInfo.data.organizer === "verified";
        }
        if (roles.includes("admin")) {
          hasAccess = userInfo.data.admin === true;
        }
        setAccess(hasAccess);
      } catch (error) {
        console.error(error);
        setAccess(false);
      }
    };

    getUser();
  }, [getAccessTokenSilently, roles]);

  if (access === null) {
    return null;
  }

  return access ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
