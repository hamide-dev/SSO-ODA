// App.tsx
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

const PRODUCTS = [
  { id: 1, name: "Casque audio", price: "79,99 €" },
  { id: 2, name: "Clavier mécanique", price: "129,00 €" },
  { id: 3, name: "Souris sans fil", price: "39,50 €" },
  { id: 4, name: "Écran 27 pouces", price: "249,00 €" },
];

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
      <h1>Catalogue produits</h1>
      <p>Bonjour {auth.user?.profile.preferred_username}</p>
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            {product.name} — {product.price}
          </li>
        ))}
      </ul>
      <button onClick={() => auth.signoutRedirect()}>Se déconnecter</button>
    </div>
  );
}

export default App;
