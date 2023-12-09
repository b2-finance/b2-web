import styles from './header.module.scss';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { ROUTES } from '../../routes';
import { Button } from '../button/button';
import { OutsideClickHandler } from '../outside-click-handler/outside-click-handler';
import logo from '../icons/logo.png';
import MenuIcon from '../icons/menu-icon';
import BellIcon from '../icons/bell-icon';
import GearIcon from '../icons/gear-icon';

/**
 * Props for a navigation link in the {@link Header} component.
 */
export interface HeaderLinkProps {
  label: string;
  to: string;
}

/**
 * A header component. Displays a navbar when in tablet size or greater, and a
 * hamburger menu when in mobile.
 *
 * @returns A JSX element.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const buttonSize = 20;

  const headers: HeaderLinkProps[] = [
    { label: 'Dashboard', to: ROUTES.dashboard },
    { label: 'Journal', to: ROUTES.journal },
    { label: 'Reports', to: ROUTES.reports },
    { label: 'Planning', to: ROUTES.planning },
    { label: 'Setup', to: ROUTES.setup },
  ];

  const handleHelpClick = () => {
    // TODO
  };

  const handleNotificationsClick = () => {
    // TODO
  };

  const handleSettingsClick = () => {
    // TODO
  };

  return (
    <header id={styles.header}>
      <Link id={styles.logo} to={ROUTES.home} title="Home">
        <img src={logo} />
      </Link>
      <OutsideClickHandler onOutsideClick={() => setMenuOpen(false)}>
        <Button id={styles.menu} title="Menu" onClick={() => setMenuOpen(true)}>
          <MenuIcon height={buttonSize} width={buttonSize} />
        </Button>
      </OutsideClickHandler>
      <nav>
        <ul className={menuOpen ? styles.menuOpen : undefined}>
          {headers?.map(({ label, to }, i) => (
            <li key={i}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  clsx(styles.navLink, isActive && styles.isActive)
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.settings}>
        <Button className={styles.button} onClick={handleHelpClick}>
          Help
        </Button>
        <Button
          className={styles.button}
          title="Notifications"
          onClick={handleNotificationsClick}
        >
          <BellIcon height={buttonSize} width={buttonSize} />
        </Button>
        <Button
          className={styles.button}
          title="Account & Settings"
          onClick={handleSettingsClick}
        >
          <GearIcon height={buttonSize} width={buttonSize} />
        </Button>
      </div>
    </header>
  );
}
