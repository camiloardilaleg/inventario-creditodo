import '../inventario.css';

export const Navbar = () => {
    return(
        <nav className="nav">
            <ul className="nav_toggle">
                <li className="logo_tittle">Creditodo</li>
                <li><a href="#">Inventario</a></li>
                <li><a href="#">Resumen</a></li>
                <li><a href="#">Cuentas</a></li>
            </ul>
        </nav>
    )
}