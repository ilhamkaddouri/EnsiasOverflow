import React, {useContext} from "react";
import UserContext from "../../context/UserContext"; 
import { useHistory } from "react-router-dom";

export default function Options() {

    const {userData, setUserData} = useContext(UserContext);

    const History = useHistory();
  /**
   * Interact with the history in the URL bar
   */
  const register = () => History.push("/register");
  const login = () => History.push("/login");
  const ask = () => History.push("/posts/ask");
  const Questions = () => History.push("/posts/all")

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
}


  return (

    <nav className="auth-options">
 
      {userData.user ? (
        <>      
        {/* We need to add the dynamic search bar  */}
        <button onClick={Questions}>Questions</button> 
        <button onClick={ask}>Ask a question</button> 
        <button onClick={logout}>Log out</button> 
        </>
        ) : (
        <>
        <button onClick={Questions}>Questions</button>
          <button onClick={register}>Register</button>
          <button onClick={login}>Log in</button>
         
        </>
      )}
    </nav>
  );
}
