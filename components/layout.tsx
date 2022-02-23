import * as React from "react";
import { AppLink } from './AppLink';
import { useAuth } from "../lib/AuthContext";

import styles from "./layout.module.css";

export const Layout: React.FC = ({ children }) => {
  const { user } = useAuth();
  return (
    <div className={styles.shell}>
      <nav className="space-x-4 items-center shadow-lg flex">
        <AppLink href="/pastes">
          <a>Pastes</a>
        </AppLink>
        {!user ? (
          <>
            <AppLink href="/pastes/create">
              <a>Create a paste</a>
            </AppLink>
            <AppLink href="/users/register">
              <a>Register</a>
            </AppLink>
            <AppLink href="/users/login">
              <a>Login</a>
            </AppLink>
          </>
        ) : (
          <>
            <AppLink href={`/api/users/${user.username}`}>
              <a>{user.username}</a>
            </AppLink>
            <AppLink href="/api/logout">
              <a>Logout</a>
            </AppLink>
          </>
        )}
      </nav>
      <main>{children}</main>
      <footer>typ app s paste-ove</footer>
    </div>
  );
};
