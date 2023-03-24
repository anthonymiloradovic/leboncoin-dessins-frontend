import React, { useContext } from "react";
import { AppContext } from "../pages/NewArt";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  FormHelperText,
  Select,
} from "@chakra-ui/react";

function AddArt() {
  const { Post, setPost } = useContext(AppContext);

  function handleSubmit(event) {
    event.preventDefault();
  
    const data = new FormData();
  
    data.append("post[title]", event.target.title?.value);
    data.append("post[image]", event.target.image?.files[0]);
    data.append("post[description]", event.target.description?.value);
    data.append("post[category]", event.target.category?.value);
    data.append("post[artist]", event.target.artist?.value);
  
    submitToAPI(data);
  }
  

  function submitToAPI(data) {
    fetch("https://starfish-app-3xk6j.ondigitalocean.app/posts", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setPost(data.image_url);
        window.location.href = '/'; // redirection vers la page home
        alert({ // affichage de l'alerte
          title: "Annonce créée avec succès !",
          status: "success",
          isClosable: true,
        });
      })
      .catch((error) => console.error(error));
  }
  

  return (
    <Box>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl isRequired>
          <FormLabel htmlFor="title">Titre</FormLabel>
          <Input type="text" name="title" id="title" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea name="description" id="description" />
        </FormControl>

        <FormControl>
          <FormLabel>Catégorie du dessin</FormLabel>
          <Select placeholder="Selectionne une catégorie">
            <option>Manga</option>
            <option>Peinture</option>
            <option>Crayon</option>
            <option>Collage</option>
            <option>Abstrait</option>
            <option>Autres</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="artist">Artiste</FormLabel>
          <Textarea name="artist" id="artist" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="image">Image</FormLabel>
          <Input type="file" name="image" id="image" />
        </FormControl>

        <Button colorScheme='blue' type="submit">Création d'annonce</Button>
      </form>
    </Box>
  );
}

export default AddArt;
