import * as React from "react";
import { AppLink } from './AppLink';
import { useAuth } from "../lib/AuthContext";

import styles from "./layout.module.css";

export const Layout: React.FC = ({ children }) => {
  const { user } = useAuth();
  return (
    <div className={styles.shell}>
      <nav className="flex items-center shadow-lg">
        <AppLink href="/pastes">
          Pastes
        </AppLink>
        {!user ? (
          <>
            <AppLink href="/users/register">
              Register
            </AppLink>
            <AppLink href="/users/login">
              Login
            </AppLink>
          </>
        ) : (
          <>
            <AppLink href="/pastes/create">
              Create a paste
            </AppLink>
            <AppLink href={`/pastes/by-user/${user.username}`}>
              {user.username}
            </AppLink>
            <AppLink href="/api/logout">
              Logout
            </AppLink>
          </>
        )}
      </nav>
      <main className="flex flex-col">{children}</main>
      <footer>typ app s paste-ove</footer>
    </div>
  );
};
