import { useState } from "react";

export default function Accordeon({ question, answer }) {
  const [open, setOpen] = useState(false); // state boolean care indica daca acordeonul e deschis/inchis

  return (
    <div className="border-b border-gray-300 rounded-lg">
      <button
        className="w-full text-left py-3 text-lg font-medium text-[var(--card-text)] hover:opacity-80"
        onClick={() => setOpen(!open)}
      >
        {question}
      </button>
      {/* Daca state-ul e true, afisam raspunsul*/}
      {open && (
        <div className="pb-4 text-lg text-[var(--card-text)] mt-2">
          {answer}
        </div>
      )}
    </div>
  );
}
