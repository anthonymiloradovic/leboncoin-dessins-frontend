import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  GridItem,
  Box,
  Image,
  Text,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const FilteredList = () => {
  const [category, setCategory] = useState("all");
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const [alreadyAddedToFavorites, setAlreadyAddedToFavorites] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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

  const Cart = () => {
    return (
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <Image src={item.image_url} alt={item.title} />
            <Text>{item.title}</Text>
            <Text>{item.price} €</Text>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <label>
      <Button bgColor="gray.200" color="gray.800" hover={{ bgColor: "gray.300", color: "gray.900" }}>
        Filter by category
      </Button>

      <select value={category} onChange={handleChange} style={{ marginLeft: "10px" }}>
          <option value="all">All</option>
          <option value="peinture">Peinture</option>
          <option value="manga">Manga</option>
          <option value="abstrait">Abstrait</option>
        </select>
      </label>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {filteredItems.map((post) => (
     <GridItem key={post.id}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" style={cardStyle}>
        <Image src={post.image_url} alt={post.title} style={imageStyle} />
        <Box p="6">
      <Box d="flex" alignItems="baseline">
        <Text fontSize="sm" fontWeight="bold" mr={2}>
          {post.category}
     </Text>
    <Text fontSize="xs" color="gray.500">
  {new Date(post.created_at).toLocaleDateString()}
</Text>
</Box>
<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
{post.title}
</Box>
<Box>
<Text fontSize="sm" color="gray.500" noOfLines={2}>
{post.description}
</Text>
</Box>
<Box mt="2">
<Button size="sm" bg="#6B46C1" color="#fff" onClick={() => addToFavorites(post)}>
Ajouter aux favoris
</Button>
</Box>
</Box>
</Box>
</GridItem>
))}
</Grid>
<Box mt="4">
<Alert status="success" variant="subtle" alignItems="center" justifyContent="center" flexDirection="column" textAlign="center" mb={3} display={addedToFavorites ? "flex" : "none"}>
<AlertIcon />
Post added to favorites!
</Alert>
<Alert status="warning" variant="subtle" alignItems="center" justifyContent="center" flexDirection="column" textAlign="center" mb={3} display={alreadyAddedToFavorites ? "flex" : "none"}>
<AlertIcon />
Post already added to favorites!
</Alert>
<Cart />
</Box>
</div>
);
};

export default FilteredList;