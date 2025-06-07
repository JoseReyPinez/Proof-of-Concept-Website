import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
export default function Favorites({ user, refresh = 0 }) {
  const [favorites, setFavorites] = useState([]);
  const fetchFavorites = async () => {
    const favRef = collection(db, 'users', user.uid, 'favorites');
    const snapshot = await getDocs(favRef);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFavorites(data);
  };
  const removeFavorite = async (id) => {
    await deleteDoc(doc(db, 'users', user.uid, 'favorites', id));
    fetchFavorites();
  };
  useEffect(() => {
    if (user) fetchFavorites();
  }, [user, refresh]);
  if (!user) return <p>Please log in to view your favorites.</p>;
  return (
    <div>
      <h2>Your Favorite Pokémon</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {favorites.map(p => (
          <div
            key={p.id}
            style={{
              border: '1px solid #ccc',
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <img src={p.image} alt={p.name} style={{ width: '100px', height: '100px' }} />
            <p className="capitalize">{p.name}</p>
            <button
              onClick={() => removeFavorite(p.id)}
              style={{ background: 'red', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px' }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}