import Art from '../components/Art';
import AddArt from '../components/AddArt';
import { createContext, useState } from "react";

export const AppContext = createContext(null);

  const Test1$ = () => {
    {
        const [Post, setPost] = useState(AppContext)
        return (
            <div>

          <AppContext.Provider value={{ Post, setPost}}>
            <div >
           <AddArt />
           <Art/>
            </div>
          </AppContext.Provider>
           </div>
        );
      }
};

export default Test1$;

