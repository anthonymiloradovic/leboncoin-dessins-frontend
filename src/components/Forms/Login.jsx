import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../tools/useFetch";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
  Text,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

export default function Login() {
  const [form, setForm] = useState({
    user: {
      email: "",
      password: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({
      ...form,
      user: {
        ...form.user,
        [e.target.id]: e.target.value,
      },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.user.email || !form.user.password) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    const sendData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };

    const data = await useFetch(
      "https://starfish-app-3xk6j.ondigitalocean.app/users/sign_in",
      sendData
    );

    if (!data.token) {
      setErrorMessage("Adresse e-mail ou mot de passe incorrect.");
      return;
    }

    const token = data.token;
    Cookies.set("user_token", token);
    setShowSuccessAlert(true);
    setTimeout(() => {
      navigate("/");
      window.location.reload(); // Pour recharger automatiquement la page
    }, 3000);
  }

  return (
    <Box
      p={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <Box width="400px" mb={8}>
        <Heading as="h1" size="lg" mb={4}>
          Se connecter
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input type="email" id="email" onChange={handleChange} />
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input type="password" id="password" onChange={handleChange} />
          </FormControl>

          {errorMessage && (
            <Text color="red" fontSize="sm" mb={4}>
              {errorMessage}
            </Text>
          )}

          <Button type="submit" colorScheme="blue" width="100%" mt={4}>
            Se connecter
          </Button>
        </form>
        {showSuccessAlert && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            Vous êtes connecté avec succès. Vous allez être redirigé vers la page d'accueil.
          </Alert>
        )}
      </Box>
    </Box>
  );
}
