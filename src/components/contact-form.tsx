"use client";

import { useState } from "react";

const topics = ["Delegate question", "School delegation", "Sponsorship", "Press", "Something else"];

/** No backend needed: composes an email in the visitor's mail app. Swap for a form service later. */
export function ContactForm({ email }: { email: string }) {
  const [topic, setTopic] = useState(topics[0]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const href = `mailto:${email}?subject=${encodeURIComponent(`[${topic}] ${name}`.trim())}&body=${encodeURIComponent(msg)}`;

  return (
    <form
      className="rounded-3xl bg-paper-2/60 p-6 sm:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = href;
      }}
    >
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink-3">What is it about?</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTopic(t)}
              className={`rounded-full border-2 px-4 py-2 font-medium transition-colors ${
                topic === t ? "border-ink bg-ink text-paper" : "border-ink/15 hover:border-ink/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="mt-8 block">
        <span className="text-sm font-medium text-ink-3">Your name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="display mt-1 w-full border-b-2 border-ink/20 bg-transparent pb-2 text-3xl outline-none focus:border-laurel"
        />
      </label>
      <label className="mt-8 block">
        <span className="text-sm font-medium text-ink-3">Message</span>
        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          required
          rows={5}
          className="mt-2 w-full resize-none rounded-2xl border-2 border-ink/15 bg-paper p-4 text-lg outline-none focus:border-laurel"
        />
      </label>
      <button className="mt-6 inline-flex h-12 items-center rounded-full bg-laurel px-6 font-semibold text-paper hover:bg-laurel-2">
        Open in my email app
      </button>
    </form>
  );
}
