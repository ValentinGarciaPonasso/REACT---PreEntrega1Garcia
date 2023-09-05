import Navbar from "./components/Navbar/Navbar";
import ItemListContainer from "./components/ItemList/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetail/ItemDetailContainer";

import {Routes, Route} from "react-router-dom";

function App() {
  return(
    <div>
      <Navbar/>

      <Routes>
        <Route path= "/" element={<ItemListContainer/>}/>
        <Route path= "/category/:categoria" element={<ItemListContainer/>}/>
        <Route path= "/item/:id" element={<ItemDetailContainer/>}/>
      </Routes>
    </div>
  )
}

export default App
