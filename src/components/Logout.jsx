import { useEffect } from 'react';
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const auth = JSON.parse(localStorage.getItem("auth") || "null");
      const token = auth?.token;

      try {
        if (token) {
          await fetch('https://offers-api.digistos.com/api/auth/logout', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        }
      } catch (error) {
        console.warn("Erreur API de déconnexion (non bloquante):", error);
      }

      localStorage.removeItem("auth");
      navigate("/");
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;