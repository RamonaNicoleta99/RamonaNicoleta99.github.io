import { useState, useEffect } from "react";

const useTravel = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")); // luam userul curent din local storage
  const email = currentUser?.email; // adresa de email a utilizatorului log

  const [internalStore, setInternalStore] = useState(() => {
    const stored = localStorage.getItem("__allUserEvents__") || "{}";
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }); // state care contine toate evenimentele pentru utilziatori

  const [events, setEvents] = useState([]); // lista de evenimente afisata pentru utilizatorul curent

  useEffect(() => {
    if (!email) return;
    const userEvents = internalStore[email] || [];
    const parsedEvents = userEvents.map((e) => ({
      ...e,
      start: new Date(e.start),
      end: new Date(e.end),
    }));
    setEvents(parsedEvents); // setam state-ul ca valoarea updatata
    localStorage.setItem("travelEvents", JSON.stringify(userEvents));
  }, [email]); // daca email se modifica, schimbam valorile variabilelor travelEvents

  useEffect(() => {
    if (!email) return;

    const updated = {
      ...internalStore,
      [email]: events,
    };
    setInternalStore(updated); // setam state-ul cu valoarea updatata
    localStorage.setItem("__allUserEvents__", JSON.stringify(updated));
    localStorage.setItem("travelEvents", JSON.stringify(events));
  }, [events, email]); // daca events sau email se modifica, schimbam valorile variabilelor __allUserEvents__ si travelEvents din local storage

  const updateEvents = (newEvents) => {
    // functie de update pentru state-ul events
    setEvents(newEvents);
  };

  return { events, updateEvents };
};

export default useTravel;
