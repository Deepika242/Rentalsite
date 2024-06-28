import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://kqbecxpmalqruggknzuq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxYmVjeHBtYWxxcnVnZ2tuenVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY0ODkyNTEsImV4cCI6MjAwMjA2NTI1MX0.1ic6mirXfVT3mENuMAtaMjC8ZOTIlfcmfUYMm45elxk"
);

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (data === null) {
    return { session: null, error };
  }
  return { session: data.session, error };
};

export const login = async (provider) => {
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: document.location.href,
    },
  });
};
// export const login = async () => {
//   const provider = new GoogleAuthProvider();
//   const navigate = useNavigate();

//   try {
//     const result = await signInWithPopup(auth, provider);

//     const signedInUser = result.user;
//     console.log(signedInUser);
//     navigate("/My account");
//     // setUser(signedInUser);
//   } catch (error) {
//     console.error("Google Sign-In Failed:", error.message);
//   }
// };

export const logout = async () => {
  return await supabase.auth.signOut();
};

export const insertOrders = async (items) => {
  return await supabase.from("orders").insert({ items }).select();
};

export const getOrder = async (orderId) => {
  return await supabase.from("orders").select().eq("id", orderId);
};

export const listOrders = async (items) => {
  return await supabase
    .from("orders")
    .select()
    .order("id", { ascending: false });
};

export const useQuery = (query) => {
  const [loading, setLoading] = useState(true);
  const [queryData, setQueryData] = useState(null);
  const [queryError, setQueryError] = useState(null);

  const load = async () => {
    const { data, error } = await query();
    setLoading(false);

    if (error) {
      setQueryError(error);
    }

    if (data) {
      setQueryData(data);
    }
  };

  useEffect(() => {
    load();
  }, []);
  return [loading, queryData, queryError];
};
