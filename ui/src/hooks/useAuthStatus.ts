// Import packages
import Axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    Axios.get("http://localhost:4000/api/auth/user", {
      withCredentials: true,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    })
      .then(async (resp: any) => {
        const res = await resp.data;
        setLoggedIn(true);
        setCheckingStatus(false);
        setUser(res.data);
      })
      .catch(async (resp: any) => {
        const res = await resp.response.data;
        toast.error(`${res.message}`, {
          duration: 3000,
          position: "bottom-center",
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
        setCheckingStatus(false);
      });
  }, [])

  return {
    loggedIn,
    checkingStatus,
    user,
  };
}
