import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';

import './Nav.scss';

export const Nav = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="nav" aria-label="Main navigation">
            <div className="nav__container">
                <div className="nav__brand">MyApp</div>

                <ul className="nav__list">
                    <li className="nav__item">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive ? 'nav__link nav__link--active' : 'nav__link'
                            }
                        >
                            Home
                        </NavLink>
                    </li>

                    <li className="nav__item">
                        <NavLink
                            to="/forms"
                            className={({ isActive }) =>
                                isActive ? 'nav__link nav__link--active' : 'nav__link'
                            }
                        >
                            Forms
                        </NavLink>
                    </li>

                    <li className="nav__item">
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? 'nav__link nav__link--active' : 'nav__link'
                            }
                        >
                            About
                        </NavLink>
                    </li>
                </ul>

                <div className="nav__settings">
                    {isAuthenticated ? (
                        <a href=""
                            className="nav__link nav__link--button"
                            onClick={handleLogout}
                        >
                            Logout
                        </a>) : (
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? 'nav__link nav__link--active' : 'nav__link'
                            }
                        >
                            Login
                        </NavLink>)
                    }
                    {isAuthenticated && <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            isActive ? 'nav__link nav__link--active' : 'nav__link'
                        }
                    >
                        Settings
                    </NavLink>}
                    {isAuthenticated && user?.role === 'admin' && <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                            isActive ? 'nav__link nav__link--active' : 'nav__link'
                        }
                    >
                        Admin
                    </NavLink>}
                </div>
            </div>
        </nav>
    );
};
