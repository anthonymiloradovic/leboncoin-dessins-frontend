/* import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useFetch from "../../tools/useFetch";

export default function DeleteAccount() {
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    const confirmDeletion = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");

    if (!confirmDeletion) {
      return;
    }

    const token = Cookies.get("user_token");

    const sendData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await useFetch("https://starfish-app-3xk6j.ondigitalocean.app/users/destroy", sendData);

    if (data.message === "User account deleted successfully.") {
      Cookies.remove("user_token");
      navigate("/sign_in");
    }
  }

  return (
    <>
      <h1>Supprimer mon compte</h1>
      <p>Cette action est irréversible. Toutes les données associées à votre compte seront supprimées.</p>
      <button onClick={handleDeleteAccount}>Supprimer mon compte</button>
    </>
  );
}
*/