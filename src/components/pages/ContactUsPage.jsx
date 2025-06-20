import { useState } from "react";
import Accordeon from "../Accoredeon";

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="px-4 py-12 bg-[var(--bg)] text-[var(--text)] transition-all">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-16">
        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-[var(--card-bg)] text-[var(--card-text)] rounded-xl shadow p-8">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          <p className="mb-8 text-sm italic">
            Have questions, feedback, or just want to say hello? We'd love to
            hear from you!
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-[var(--bg)] border border-gray-300 text-[var(--text)]"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-[var(--bg)] border border-gray-300 text-[var(--text)]"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 rounded bg-[var(--bg)] border border-gray-300 text-[var(--text)] resize-none"
              />
            </div>

            <button
              type="submit"
              className="self-start !bg-[var(--button-color)] hover:bg-blue-700 text-white px-6 py-2 rounded transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center mb-8">🗺️ FAQs</h1>
          <div className="space-y-2">
            <Accordeon
              question="What is the purpose of Travel Planner?"
              answer="Travel Planner helps travel enthusiasts discover popular attractions and learn more about destinations across the globe — all in one place."
            />
            <Accordeon
              question="Who is the team behind Travel Planner?"
              answer="The Travel Planner team is made up of passionate developers and travelers dedicated to making trip planning smarter and more enjoyable."
            />
            <Accordeon
              question="Who is the app designed for?"
              answer="It’s designed for anyone curious about exploring new places — whether you're planning a vacation, researching a city, or just daydreaming about your next adventure."
            />
            <Accordeon
              question="What features does Travel Planner offer?"
              answer="You can explore tourist attractions by city, view weather forecasts, discover summaries from Wikipedia, navigate via an interactive map, and plan your dream vacations."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
