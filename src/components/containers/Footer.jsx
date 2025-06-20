import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[var(--card-bg)] text-[var(--text)] py-6 mt-16 shadow-inner">
      <div className="max-w-[1600px] mx-auto px-4 flex flex-col items-start gap-1 text-sm">
        <p className="font-semibold text-lg">Travel Planner</p>
        <p className="italic text-base">
          Start exploring the world — one destination at a time.
        </p>
        <Link
          to="/contact"
          className="text-[var(--accent)] underline hover:opacity-80 transition text-sm mt-2"
        >
          Contact Us
        </Link>
        <p className="text-base text-[var(--text)] mt-2">
          © {new Date().getFullYear()} Travel Planner. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
