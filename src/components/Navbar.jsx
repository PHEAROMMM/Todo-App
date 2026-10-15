import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <span className="brand">TaskFlow</span>
            <div className="nav-links">
                <NavLink to="/" end>Dashboard</NavLink>
                <NavLink to="/tasks">Tasks</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            <NavLink to="/settings">Settings</NavLink>
            </div>
        </nav>
    );
}