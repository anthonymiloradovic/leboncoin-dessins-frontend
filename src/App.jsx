import React from 'react';
import IndexRoutes from './routes/IndexRoutes';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },

});


function App() {
  return (
    <div>
       <ChakraProvider theme={theme}>
      <div className="content-wrapper"> 
          <IndexRoutes />
        </div>
      </ChakraProvider>
    </div>
  );
}

export default App;
