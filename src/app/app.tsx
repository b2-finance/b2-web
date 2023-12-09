import styles from './app.module.scss';
import { Outlet } from 'react-router-dom';
import { SkipNav } from '../components/skip-nav/skip-nav';
import { Header } from '../components/header/header';

export function App() {
  const mainId = 'main-content';
  return (
    <div id={styles.app}>
      <SkipNav mainId={mainId} />
      <Header />
      <main id={mainId}>
        <Outlet />
      </main>
    </div>
  );
}
