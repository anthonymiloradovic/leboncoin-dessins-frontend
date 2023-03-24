import React, { useState } from "react";
import Tinder from '../components/Card/TinderCard';
import FilteredList from '../components/Card/FilteredList';

import Paralax from '../components/Parallax/Paralax';
import Paralax2 from '../components/Parallax/Paralax2';
import Text from '../components/Parallax/Text';
import Text2 from '../components/Parallax/Text2';
import { Button } from "@chakra-ui/react";


const Home = () => {
  const [currentDisplay, setCurrentDisplay] = useState("Tinder");

  const toggleDisplay = () => {
    if (currentDisplay === "Tinder") {
      setCurrentDisplay("FilteredList");
    } else {
      setCurrentDisplay("Tinder");
    }
  };

  return (
    <div>
      <Paralax />
      <Text />
      <Paralax2 />
      <Text2 />

      <Button colorScheme='purple' onClick={toggleDisplay} size="lg" mx="auto" my={8} d="block">
        Changer d'affichage
      </Button>
      {currentDisplay === "Tinder" ? <Tinder /> : <FilteredList />}
    </div>
  );
};

export default Home;
