import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, GridItem, Image, Text } from "@chakra-ui/react";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem('favorites');
    setFavorites([]);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <Box>
      <h1>Mes favoris</h1>
      {favorites.length > 0 && <Button colorScheme="red" onClick={clearLocalStorage}>Supprimer tous les favoris</Button>}
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {favorites.map((post) => (
          <GridItem key={post.id}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={post.image_url} alt={post.title} height="200px" objectFit="cover" width="100%" />
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
                  <Button colorScheme="teal" onClick={() => addToCart(post)}>Ajouter au panier</Button>
                </Box>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>
      {cart.length > 0 && (
        <Box mt={4}>
          <Link to="/">
            <Button colorScheme="teal">Voir le panier ({cart.length})</Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Favorite;
