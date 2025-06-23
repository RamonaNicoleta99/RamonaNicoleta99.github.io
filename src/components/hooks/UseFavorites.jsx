import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  }); // state array cu orasele favorite curente, luate din variabila favorites din local storage

  const [disabled, setDisabled] = useState(false); // state boolean care returneaza daca butonul de adaugare la favorite trebuie sa fie disabled sau nu

  const toggleFavorite = (city) => {
    // functie de adugare sau stergere al unui oras din lista de favorites
    if (!city || !city.title) return;

    setDisabled(true); // setam state-ul disabled pe true
    setTimeout(() => setDisabled(false), 3000); // dupa 3 secunde setam state-ul disabled inapoi pe false

    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(
        // verificam daca orasul se afla deja la favorite
        (item) => item.title === city.title
      );
      const updated = isAlreadyFavorite
        ? prevFavorites.filter((item) => item.title !== city.title) // daca da, il stergem
        : [...prevFavorites, city]; // daca nu, il adaugam

      localStorage.setItem("favorites", JSON.stringify(updated)); // updatam variabila favorites din localstorage
      return updated;
    });
  };

  const isCityFavorite = (city) => {
    return favorites.some((item) => item.title === city?.title); // functie returnata catre componente, care ne spune daca orasul este sau nu la favorite
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]); // cand state-ul de favorites se modifica, updatam variabila din localstorage

  return {
    // returnam lista de favorite, functia de toggle, functia booleana care ne spune daca orasul e sau nu la favorite si state-ul boolean corespunzator starii de disabled
    favorites,
    toggleFavorite,
    isCityFavorite,
    disabled,
  };
};

export default useFavorites;
