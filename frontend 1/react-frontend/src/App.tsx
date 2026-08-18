import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated && !auth.activeNavigator) {
      auth.signinRedirect();
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.activeNavigator, auth]);

  if (auth.isLoading || auth.activeNavigator) {
    return <p>Chargement...</p>;
  }

  if (!auth.isAuthenticated) {
    return (
      <div className="container">
        <button onClick={() => auth.signinRedirect()}>Se connecter</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Bienvenue sur l'application React avec ODA interface utilisateur</h1>
      <p>Bonjour {auth.user?.profile.preferred_username}</p>
      <button onClick={() => auth.signoutRedirect()}>Se déconnecter</button>
    </div>
  );
}

export default App;
