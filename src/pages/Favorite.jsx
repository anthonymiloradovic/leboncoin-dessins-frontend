import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, GridItem, Image, Text, useToast } from "@chakra-ui/react";

const Favorite = () => {
const [favorites, setFavorites] = useState([]);
const [cart, setCart] = useState([]);
const [cartCount, setCartCount] = useState(0);

useEffect(() => {
const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
setFavorites(storedFavorites);
}, []);

useEffect(() => {
setCartCount(cart.length);
}, [cart]);

const clearLocalStorage = () => {
localStorage.removeItem('favorites');
setFavorites([]);
};

const addToCart = (item) => {
setCart([...cart, item]);
toast({
title: "Ajouté au panier",
status: "success",
duration: 3000,
isClosable: true,
});
};

const removeFavorite = (post) => {
const newFavorites = favorites.filter((favorite) => favorite.id !== post.id);
setFavorites(newFavorites);
localStorage.setItem("favorites", JSON.stringify(newFavorites));
toast({
title: "Supprimé des favoris",
status: "error",
duration: 3000,
isClosable: true,
});
};

const toast = useToast();

return (
<Box m={10}>  
<Box textAlign="center">
<Text as="h1" fontSize="4xl" fontWeight="bold" mb={4} color="#4A5568" fontFamily="monospace">Mes Favoris</Text>
{favorites.length > 0 && <Button colorScheme="red" onClick={clearLocalStorage} mb={4}>Supprimer tous les favoris</Button>}
<Grid templateColumns="repeat(3, 1fr)" gap={6}>
{favorites.map((post) => (
<GridItem key={post.id}>
<Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
<Image src={post.image_url} alt={post.title} height="200px" objectFit="cover" width="100%" />
<Box p="6">
<Box d="flex" alignItems="baseline">
<Text fontWeight="semibold" fontSize="xl" mr={2} color="#000" fontFamily="monospace">
{post.title}
</Text>
<Text color="#000" fontSize="sm">
{post.category}
</Text>
</Box>
<Box>
<Text mt={2} color="#000">
{post.description}
</Text>
</Box>
<Box d="flex" mt={2} alignItems="center">
<Text fontWeight="semibold" fontSize="xl" color="#000" fontFamily="monospace">
{post.price} €
</Text>
</Box>
<Box mt={4} d="flex" justifyContent="space-between" alignItems="center">
<Button ml={2} colorScheme="blue" onClick={() => window.open('https://buy.stripe.com/test_eVa6qGgnj1iKc6s289')}>Acheter</Button>
<Button ml={2} colorScheme="red" onClick={() => removeFavorite(post)}>Supprimer</Button>
</Box>
</Box>
</Box>
</GridItem>
))}
</Grid>
</Box>
{cartCount > 0 && (
<Box mt={8}>
<Link to="/cart">
            <Button colorScheme="teal">Voir le panier ({cartCount})</Button>
          </Link>

</Box>
      )}
    </Box>
  );
};
export default Favorite;