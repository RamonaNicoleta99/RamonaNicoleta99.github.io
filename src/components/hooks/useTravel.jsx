// src/hooks/useTravelEvents.js
import { useState, useEffect } from "react";

const useTravel = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const email = currentUser?.email;

  const [internalStore, setInternalStore] = useState(() => {
    const stored = localStorage.getItem("__allUserEvents__") || "{}";
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  });

  const [events, setEvents] = useState([]);

  // Load correct user's events on mount or when email changes
  useEffect(() => {
    if (!email) return;
    const userEvents = internalStore[email] || [];
    const parsedEvents = userEvents.map((e) => ({
      ...e,
      start: new Date(e.start),
      end: new Date(e.end),
    }));
    setEvents(parsedEvents);
    localStorage.setItem("travelEvents", JSON.stringify(userEvents));
  }, [email]);

  // Update internal store and persist changes
  useEffect(() => {
    if (!email) return;

    const updated = {
      ...internalStore,
      [email]: events,
    };
    setInternalStore(updated);
    localStorage.setItem("__allUserEvents__", JSON.stringify(updated));
    localStorage.setItem("travelEvents", JSON.stringify(events));
  }, [events, email]);

  const updateEvents = (newEvents) => {
    setEvents(newEvents);
  };

  return { events, updateEvents };
};

export default useTravel;
