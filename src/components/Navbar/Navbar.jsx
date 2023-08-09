import CartWidget from "../CartWidget/CartWidget";
import './navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-xl">
            <div className="container-fluid navBar">
                <a href="./index.html" class="logo" aria-label="Pagina de inicio">
                    <div class="logo-nombre">
                        <h1>C.A. FAVOR REINTENTAR SHOP</h1>
                    </div>
                    <div class="logo-escudo"/>
                </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 listado">
                        <li className="nav-item">
                            <a className="nav-link links" aria-current="page" href="#">HOMBRES</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link links" aria-current="page" href="#">MUJERES</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link links" aria-current="page" href="#">NIÑOS</a>
                        </li>
                    </ul>
                </div>
                <CartWidget />
            </div>
        </nav>
    );
};

export default Navbar;