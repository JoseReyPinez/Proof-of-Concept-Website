import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Routes, Route, Navigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import Login from "./Login";
import Register from "./Register";
import SearchBar from "./SearchBar";
import PokemonDisplay from "./PokemonDisplay";
import Favorites from "./Favorites";
import PokeballLoader from "./PokeballLoader";
function App() {
  const [user, setUser] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [refreshFavorites, setRefreshFavorites] = useState(0);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);
  const logout = () => {
    signOut(auth);
    setSelectedPokemon(null);
  };
  const handleSearch = async (pokemonName) => {
    if (!pokemonName) return;
    setLoading(true);
    setSelectedPokemon(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      if (!response.ok) throw new Error("Pokémon not found");
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };
  const addFavorite = async (pokemon) => {
    if (!user) {
      alert("Please login to add favorites.");
      return;
    }
    try {
      await addDoc(collection(db, "users", user.uid, "favorites"), pokemon);
      alert(`${pokemon.name} added to favorites!`);
      setRefreshFavorites((r) => r + 1);
    } catch (error) {
      alert("Error adding favorite: " + error.message);
    }
  };
  if (checkingAuth) return <div>Loading auth status...</div>;
  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Pokémon Search App</h1>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login auth={auth} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register auth={auth} />}
        />
        {/* Protected route */}
        <Route
          path="/"
          element={
            user ? (
              <>
                <div style={{ textAlign: "right", marginBottom: 20 }}>
                  <button onClick={logout} style={{ cursor: "pointer" }}>
                    Logout
                  </button>
                </div>
                <SearchBar onSearch={handleSearch} />
                {loading && <PokeballLoader />}
                {selectedPokemon && (
                  <PokemonDisplay
                    pokemon={selectedPokemon}
                    user={user}
                    onAddFavorite={addFavorite}
                  />
                )}
                <Favorites user={user} refresh={refreshFavorites} />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}
export default App;