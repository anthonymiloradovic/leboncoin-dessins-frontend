import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useFetch from "../../tools/useFetch";

export default function SignOut() {
  const navigate = useNavigate();

  async function handleSignOut() {
    const sendData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",

      },
    };

    const data = await useFetch("https://starfish-app-3xk6j.ondigitalocean.app/users/sign_out", sendData);

    if (data.message === "User signed out successfully.") {
      Cookies.remove("user_token");
      navigate("/sign_in");
    }
  }

  return (
    <>
      <h1>Se déconnecter</h1>
      <button onClick={handleSignOut}>Se déconnecter</button>
    </>
  );
}