import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = () => {
      // Function to get a cookie by name
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      };

      const exp = getCookie('exp');
      if (!exp) {
        return false; 
      }

      try {
        const currentTime = Date.now() / 1000;
        if (exp < currentTime) {
          return false; 
        }
        return true; 
      } catch (error) {

        return false;
      }
    };

    if (!isAuthenticated()) {
      navigate('/sign');
    }
  }, [navigate]);

  return null;
};

export default useAuth;
