import { useState, useEffect } from "react";
import { Grid, GridItem, Box, Image, Text, Button } from "@chakra-ui/react";

const FilteredList = () => {
  const [category, setCategory] = useState("all");
  const [posts, setPosts] = useState([]);

  const [favorites, setFavorites] = useState([]);

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
    const newFavorites = [...favorites, post];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
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
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {filteredItems.map((post) => (
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
                  <Button colorScheme="teal" onClick={() => addToFavorites(post)}>Ajouter aux favoris</Button>
                </Box>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default FilteredList;
