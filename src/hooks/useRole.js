import { useEffect, useState } from "react";
import axios from "axios";

const useRole = (email) => {
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    axios.get(`https://habit-tracker-server-site.vercel.app/users/role/${email}`)
      .then(res => {
        setRole(res.data.role);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [email]);

  return { role, loading };
};

export default useRole;