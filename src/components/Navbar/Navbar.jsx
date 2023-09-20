import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import './navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-xl">
            <div className="container-fluid navBar">
                <Link to= "/" className="logo" aria-label="Pagina de inicio">
                    <div className="logo-nombre">
                        <h1>C.A. FAVOR REINTENTAR SHOP</h1>
                    </div>
                    <div className="logo-escudo"/>
                </Link>
                <div id="navbarSupportedContent">
                    <ul className="listado">
                        <li>
                            <NavLink to="/category/Hombre" className="nav-link links">HOMBRES</NavLink>
                        </li>
                        <li>
                            <NavLink to="/category/Mujer" className="nav-link links">MUJERES</NavLink>
                        </li>
                        <li>
                            <NavLink to="/category/Niños" className="nav-link links">NIÑOS</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="carritoContainer">
                    <CartWidget />
                </div>                
            </div>
        </nav>
    );
};

export default Navbar;