import React, { useState, useEffect } from 'react';
import IndexRoutes from './routes/IndexRoutes';

import { UidContext } from './routes/AppContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import CookieConsent from 'react-cookie-consent';

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
          url: "https://starfish-app-3xk6j.ondigitalocean.app/member-data",
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
    <div>
      <UidContext.Provider value={uid}>
        <ChakraProvider theme={theme}>
          <CookieConsent debug={true} style={{ textAlign: "left"}} buttonStyle={{color: "#fff", background: "#D540EB", fontSize:"14px"}} buttonText="J'accepte"> Ce site utilise les cookies.</CookieConsent>
          <IndexRoutes />
        </ChakraProvider>
      </UidContext.Provider>
    </div>
  );
};

export default App;
