import { useState, useEffect } from "react";
import { Grid, GridItem, Box, Image, Text, Button, Alert, AlertIcon } from "@chakra-ui/react";

const FilteredList = () => {
  const [category, setCategory] = useState("all");
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const [alreadyAddedToFavorites, setAlreadyAddedToFavorites] = useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    fetch("https://starfish-app-3xk6j.ondigitalocean.app/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredItems = posts.filter((post) => {
    if (category === "all") {
      return true;
    } else {
      return post.category === category;
    }
  });

  const addToFavorites = (post) => {
    const existingFavorite = favorites.find((favorite) => favorite.id === post.id);
    if (existingFavorite) {
      setAlreadyAddedToFavorites(true);
      setTimeout(() => {
        setAlreadyAddedToFavorites(false);
      }, 2000);
      return;
    }
    const newFavorites = [...favorites, post];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setAddedToFavorites(true);
    setTimeout(() => {
      setAddedToFavorites(false);
    }, 2000);
  };

  const cardStyle = {
    height: "100%",
  };

  const imageStyle = {
    objectFit: "cover",
    height: "200px",
    width: "100%",
  };

  return (
    <div>
      <label>
        Filter by category:
        <select value={category} onChange={handleChange}>
          <option value="all">All</option>
          <option value="peinture">Peinture</option>
          <option value="manga">Manga</option>
          <option value="abstrait">Abstrait</option>
          <option value="noir et blanc">Noir et blanc</option>
          <option value="animaux">Animaux</option>
        </select>
      </label>
      {addedToFavorites && (
        <Alert status="success" mt={2}>
          <AlertIcon />
          Ajouté aux favoris !
        </Alert>
      )}
      {alreadyAddedToFavorites && (
        <Alert status="warning" mt={2}>
          <AlertIcon />
          Cette carte est déjà ajoutée aux favoris !
        </Alert>
      )}
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {filteredItems.map((post) => {
          const isAlreadyAdded = favorites.some((favorite) => favorite.id === post.id);
          return (
            <GridItem key={post.id}>
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden" style={cardStyle}>
                <Image src={post.image_url} alt={post.title} style={imageStyle} />
                <Box p="6">
                  <Box d="flex" alignItems="baseline">
                    <Text fontWeight="semibold" fontSize="xl" mr={2}>
                      {post.title}
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                      {post.category}
                    </Text>
                  </Box>
                  <Box>
                    <Text mt={2} color="gray.600">
                      {post.description}
                    </Text>
                  </Box>
    
                  <Box d="flex" mt={2} alignItems="center">
                    <Text fontWeight="semibold" fontSize="xl">
                      {post.price} €
                    </Text>
                  </Box>
                  <Box mt={2}>
                    <Button
                      colorScheme="teal"
                      onClick={() => {
                        if (isAlreadyAdded) {
                          setAlreadyAddedToFavorites(true);
                          setTimeout(() => {
                            setAlreadyAddedToFavorites(false);
                          }, 2000);
                        } else {
                          addToFavorites(post);
                        }
                      }}
                    >
                      Ajouter aux favoris
                    </Button>
                  </Box>
                </Box>
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );

};

export default FilteredList;