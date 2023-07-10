// Import packages
import { toast } from 'react-hot-toast';

// Import rtk query
import { useCheckAuthStatusMutation } from '../store/api';
import { useEffect, useState } from 'react';

// Import type
import { User } from '../app.model';

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [checkAuthStatus] = useCheckAuthStatusMutation();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const res = await checkAuthStatus(null);
      const response =
        'data' in res ? res.data : 'data' in res.error ? res.error.data : null;

      if (response.success) {
        setLoggedIn(true);
        setCheckingStatus(false);
        setUser(response.data);
      } else {
        toast.error(`${response.message}`, {
          duration: 3000, // Toast duration is set to 3s
          position: 'bottom-center',
          ariaProps: {
            'role': 'status',
            'aria-live': 'polite',
          },
        });
        setCheckingStatus(false);
      }
    };
    fetchAuthStatus();
  }, [checkAuthStatus]);

  return { loggedIn, checkingStatus, user };
};

export { useAuthStatus };
