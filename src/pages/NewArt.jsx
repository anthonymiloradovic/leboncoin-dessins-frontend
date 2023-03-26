import AddArt from "../components/AddArt";
import { createContext, useState } from "react";
import { Box } from "@chakra-ui/react";

export const AppContext = createContext(null);

const NewArt = () => {
const [Post, setPost] = useState(AppContext);

return (
<Box m={10}>
<AppContext.Provider value={{ Post, setPost }}>
<AddArt />
</AppContext.Provider>
</Box>
);
};

export default NewArt;