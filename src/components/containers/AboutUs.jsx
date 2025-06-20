import { Link } from "react-router";

export default function AboutUs() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12">
      <div className="rounded-xl p-6 bg-[var(--card-bg)] text-[var(--card-text)] shadow transition-all">
        <h2 className="text-2xl font-bold mb-2">About Travel Planner</h2>
        <p className="italic text-base mb-2">Your journey begins here.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <p className="text-lg">
            <strong>Travel Planner</strong> is a platform created for passionate
            explorers who want to discover the world in a smarter and more
            inspiring way. Whether you're planning your next vacation or just
            curious about iconic landmarks, our platform provides detailed
            information about tourist attractions, weather forecasts, historical
            facts, and cultural insights — all in one place.
            <br />
            <br />
            Our mission is to help you plan memorable journeys by making travel
            information accessible, visual, and engaging. We believe that every
            destination has a story, and we’re here to help you find yours. From
            ancient wonders to modern marvels, Travel Planner is your digital
            companion for exploring the world.
            <br />
            <br />
            Do not hesitate to{" "}
            <Link
              to="/contact"
              className="text-[var(--accent)] underline hover:opacity-80 transition"
            >
              contact us
            </Link>{" "}
            if you have any questions or suggestions.
          </p>
        </div>
        <a
          href="https://en.wikipedia.org/wiki/Travel"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-[var(--accent)] underline"
        ></a>
      </div>
    </div>
  );
}
