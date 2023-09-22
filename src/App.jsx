import Navbar from "./components/Navbar/Navbar";
import ItemListContainer from "./components/ItemList/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetail/ItemDetailContainer";
import CartProvider from "./context/CartProvider";
import Checkout from "./components/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import {Routes, Route} from "react-router-dom";

function App() {
  return(
    <CartProvider>
      <Navbar/>

      <Routes>
        <Route path= "/" element={<ItemListContainer/>}/>
        <Route path= "/category/:categoria" element={<ItemListContainer/>}/>
        <Route path= "/item/:id" element={<ItemDetailContainer/>}/>
        <Route path= "/checkout" element={<Checkout/>}/>
        <Route path= "/cart" element={<Cart/>}/>
      </Routes>
    </CartProvider>
  )
}

export default App
