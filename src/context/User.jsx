import { createContext, useEffect, useState } from "react";
import { app } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const auth = getAuth(app);

  const [active, setActive] = useState("");

  const [currentUser, setCurrentUser] = useState(null); // Change initial state to null for loading state
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    console.log('changing user')
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false); // Set loading to false once auth state is checked
    });                             

    return () => unsubscribe(); // Cleanup function for unsubscribing from auth state changes
  }, [auth]);

  if (isLoading) {
    return <div>Loading....</div>; // Render a loading indicator until auth state is checked
  }

  return (
    <UserContext.Provider value={{ currentUser, active, setActive }}>
      {children}
    </UserContext.Provider>
  );  
};

export default UserContext;
