import React, { useState, useEffect } from 'react';
import IndexRoutes from './routes/IndexRoutes';

import { UidContext } from './Routes/AppContext';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import Cookies from 'js-cookie';

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },

});


const App = () => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "http://localhost:3000/member-data",

          headers: {
            'Authorization':Cookies.get('user_token')
          }
        });
        console.log(res);
        setUid(res.data.user);
      } catch (err) {
        console.log("no token", err);
      }
    };
    fetchToken();
  }, []);

  return (

    <UidContext.Provider value={uid}>
      <IndexRoutes />
    </UidContext.Provider>
    <div>
       <ChakraProvider theme={theme}>
      <div className="content-wrapper"> 
          <IndexRoutes />
        </div>
      </ChakraProvider>
    </div>

  );
};

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);
export default App;
