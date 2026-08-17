// App.tsx
import { useState } from "react";
import { useAuth } from "react-oidc-context";

const API_URL = "http://localhost:4000/api/protected";

function App() {
  const auth = useAuth();
  const [apiResult, setApiResult] = useState<string | null>(null);

  if (auth.isLoading) return <p>Chargement...</p>;

  if (!auth.isAuthenticated) {
    return <button onClick={() => auth.signinRedirect()}>Se connecter</button>;
  }

  const callBackend = async () => {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${auth.user?.access_token}` },
    });
    const data = await res.json();
    setApiResult(JSON.stringify(data));
  };

  return (
    <div>
      <h1>Bienvenue sur l'application React avec ODA interface utilisateur</h1>
      <p>Bonjour {auth.user?.profile.preferred_username}</p>
      <button onClick={callBackend}>Appeler le backend protégé</button>
      {apiResult && <p>Réponse backend : {apiResult}</p>}
      <button onClick={() => auth.signoutRedirect()}>Se déconnecter</button>
    </div>
  );
}

export default App;
