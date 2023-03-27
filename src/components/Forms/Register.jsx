import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../tools/useFetch";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Checkbox,
  Link
} from "@chakra-ui/react";

export default function Register() {
  const [form, setForm] = useState({
    user: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false
    },
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({
      ...form,
      user: {
        ...form.user,
        [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      },
    });
  }

  function validateForm() {
    const { email, password, confirmPassword, acceptedTerms } = form.user;
    return email !== "" && email.includes("@") && password.length >= 6 && password === confirmPassword && acceptedTerms;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      alert("Veuillez entrer un email valide et un mot de passe (au moins 6 caractères) et accepter les conditions générales.");
      return;
    }
    const sendData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };

    const data = await useFetch("https://starfish-app-3xk6j.ondigitalocean.app/users/", sendData);
    const token =  data.token;

    Cookies.set("user_token", token);
    navigate("/");
  }

  const emailBorderColor = form.user.email === "" || !form.user.email.includes("@") ? "blue.500" : "gray.300";
  const emailFocusBorderColor = form.user.email === "" || !form.user.email.includes("@") ? "blue.500" : "gray.300";
  const passwordBorderColor = form.user.password === "" || form.user.password.length < 6 ? "blue.500" : "gray.300";
  const passwordFocusBorderColor = form.user.password === "" || form.user.password.length < 6 ? "red" : "blue.500";
  const confirmPasswordBorderColor =
    form.user.confirmPassword === "" || form.user.password !== form.user.confirmPassword ? "blue.500" : "gray.300";
  const confirmPasswordFocusBorderColor =
    form.user.confirmPassword === "" || form.user.password !== form.user.confirmPassword ? "blue.500" : "gray.300";

  return (
    <Box w="100%" maxW="400px" m="0 auto" mt="10" height= "70vh">
      <Heading>S'inscrire</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mt="4" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            onChange={handleChange}
            borderColor={emailBorderColor}
            focusBorderColor={emailFocusBorderColor}
          />
        </FormControl>

        <FormControl id="password" mt="4" isRequired>
          <FormLabel>Mot de passe</FormLabel>
          <Input
            type="password"
            onChange={handleChange}
            borderColor={passwordBorderColor}
            focusBorderColor={passwordFocusBorderColor}
          />
        </FormControl>
    <FormControl id="confirmPassword" mt="4" isRequired>
      <FormLabel>Confirme le mot de passe</FormLabel>
      <Input
        type="password"
        onChange={handleChange}
        borderColor={confirmPasswordBorderColor}
        focusBorderColor={confirmPasswordFocusBorderColor}
      />
    </FormControl>

    <FormControl id="acceptedTerms" mt="4" isRequired>
      <Checkbox onChange={handleChange}>J'accepte les termes et les conditions</Checkbox>
    </FormControl>

    <Button mt="4" colorScheme="blue" type="submit">
      Inscription
    </Button>
  </form>

  <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Inscription réussie</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>Ton compte a été créé avec succès. Tu peux maintenant vous connecter et commencer à utiliser notre plateforme.</Text>
        <Link href="/" color="blue.500">
          Aller sur la page de connexion
        </Link>
      </ModalBody>
    </ModalContent>
  </Modal>
</Box>
);
}