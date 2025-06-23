import { useState, useEffect } from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addHours } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useTravel from "../hooks/useTravel";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const { events, updateEvents } = useTravel();
  const [currentDate, setCurrentDate] = useState(new Date()); // data curenta a calendarului, intialziata cu data curenta
  const [showModal, setShowModal] = useState(false); // afiseaza sau ascunde modala pentru activitati
  const [modalData, setModalData] = useState({ start: null }); // retine slotul selectat pentru noua activitate
  const [selectedCity, setSelectedCity] = useState(""); // orasul ales pentru activitate
  const [activity, setActivity] = useState(""); // activitatea introdusa de user
  const [showDeleteModal, setShowDeleteModal] = useState(false); // afiseaza sau ascunde modalul de stergere activitate
  const [eventToDelete, setEventToDelete] = useState(null); // evenimentul selectat pentru stergere
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]"); // retinem orasele favorites din local storage intr-o constanta

  const handleSelectSlot = ({ start, end }) => {
    // funbctie de deschidere a modalului de adaugare activitate, apelata cand este selectata o zi sau o perioada in calendar
    setModalData({ start, end });
    setSelectedCity(favorites[0]?.title || "");
    setActivity("");
    setShowModal(true);
  };

  const confirmDelete = () => {
    // functie de stergere a unui eveniment din calendar
    if (eventToDelete) {
      updateEvents(events.filter((e) => e !== eventToDelete));
      setEventToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleSave = () => {
    // functie de salvare a activitatii date de user in zilele selectate de acesta
    if (!selectedCity || !activity || !modalData.start || !modalData.end)
      return;

    const adjustedEnd = new Date(modalData.end);
    adjustedEnd.setDate(adjustedEnd.getDate() - 1);

    const days = [];
    const current = new Date(modalData.start);
    current.setHours(0, 0, 0, 0);
    adjustedEnd.setHours(0, 0, 0, 0);

    while (current <= adjustedEnd) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    const newEvents = days.map((day) => ({
      title: `${activity} in ${selectedCity}`,
      start: new Date(day),
      end: addHours(new Date(day), 1),
    }));

    updateEvents([...events, ...newEvents]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-[var(--bg)] text-[var(--text)] transition-all">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-20 text-center gap-2">
          <span>📅</span> Plan Your Travel Activities
        </h1>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          selectable
          onSelectSlot={handleSelectSlot}
          defaultView={Views.MONTH}
          views={["month"]}
          date={currentDate}
          onNavigate={setCurrentDate}
          onSelectEvent={(event) => {
            setEventToDelete(event);
            setShowDeleteModal(true);
          }}
        />
      </div>
      {/* modala de adaugare activitatii, afisata doar daca state-ul showModal este true */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30">
          <div className="w-full max-w-md mx-auto bg-[var(--card-bg)] text-[var(--card-text)] p-8 rounded-xl shadow-2xl relative border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4">Add Activity</h2>
            <label className="block mb-2 text-sm font-medium">City</label>
            {favorites.length > 0 ? (
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-2 mb-4 rounded bg-[var(--bg)] border border-gray-400 text-[var(--text)]"
              >
                {/* la select, schimbam valoarea state-ului corespunzator orasului selectat */}
                {favorites.map((f, idx) => (
                  <option key={idx} value={f.title}>
                    {f.title}
                  </option>
                ))}
                {/* folosim map pentru a pune in dropdown toate orasele din favorties */}
              </select>
            ) : (
              <p className="mb-4 text-base italic text-[var(--card-text)]">
                Please add cities to your favorites to plan an activity.
              </p>
            )}
            {/* in caz ca nu sunt orase in favorties, afisam un mesaj corespunzator */}

            <label className="block mb-2 text-sm font-medium">Activity</label>
            {/* folosim on change pentru schimbarea state-ului de activitate */}
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="e.g. Visit museum"
              className="w-full p-2 rounded bg-[var(--bg)] border border-gray-400 text-[var(--text)]"
            />
            <button
              onClick={handleSave}
              className="mt-4 hover:bg-blue-700 !bg-[var(--button-color)] text-white px-4 py-2 rounded"
            >
              Save
            </button>
            {/* apelam functia de salvare folosind onClick pe butonul de save */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-2xl hover:text-red-500 "
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* modala de stergere a activitatilor, afisata doar daca state-ul showDeleteModal este true */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/30">
          <div className="bg-[var(--card-bg)] text-[var(--card-text)] border border-gray-300 dark:border-gray-700 p-6 rounded-lg shadow-xl max-w-sm w-full relative">
            <h3 className="text-lg font-semibold mb-4">Delete event</h3>
            <p className="text-sm mb-6">
              Are you sure you want to delete “
              <span className="font-medium">{eventToDelete?.title}</span>”?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-1 text-sm !bg-[var(--button-color)] dark:bg-gray-600 rounded hover:opacity-80"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-1 text-sm !bg-[var(--button-color)] text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
              {/* apelam functia de stergere folosind onClick pe butonul de Delete */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
