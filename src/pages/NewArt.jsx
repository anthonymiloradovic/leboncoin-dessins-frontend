import AddArt from '../components/AddArt';
import { createContext, useState } from "react";

export const AppContext = createContext(null);

  const NewArt = () => {
    {
        const [Post, setPost] = useState(AppContext)
        return (
            <div>

          <AppContext.Provider value={{ Post, setPost}}>
            <div >
           <AddArt />
           
            </div>
          </AppContext.Provider>
           </div>
        );
      }
};

export default NewArt;

