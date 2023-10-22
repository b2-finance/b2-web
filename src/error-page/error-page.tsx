import styles from './error-page.module.scss';
import { useRouteError } from 'react-router-dom';
import { getErrorMessage } from '../get-error-message/get-error-message';

/**
 * Displays an error message.
 *
 * @returns A JSX element.
 */
export function ErrorPage() {
  const error = useRouteError();

  return (
    <div id={styles.errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p id={styles.error}>{getErrorMessage(error)}</p>
    </div>
  );
}
