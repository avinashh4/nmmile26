// Drop images into /public/gallery/ and point `src` at them, e.g. "/gallery/opening.jpg".
// Leave `src` empty to show a placeholder frame.

export const gallery: { src: string; caption: string; tall?: boolean }[] = [
  { src: "", caption: "Opening ceremony" },
  { src: "", caption: "Security Council, day two", tall: true },
  { src: "", caption: "Unmoderated caucus" },
  { src: "", caption: "Press corps at work", tall: true },
  { src: "", caption: "Voting procedure" },
  { src: "", caption: "Awards" },
  { src: "", caption: "The secretariat", tall: true },
  { src: "", caption: "Lunch, finally" },
  { src: "", caption: "Closing ceremony" },
];
