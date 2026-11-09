import * as THREE from "three";

const PAPER = "#f3eee3";
const INK = "#1b1a17";
const SEAL = "#b3261e";

function fontFamily(varName: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return v || fallback;
}

export const fonts = () => ({
  serif: fontFamily("--font-instrument", "Georgia, serif"),
  sans: fontFamily("--font-dm", "system-ui, sans-serif"),
});

function tex(canvas: HTMLCanvasElement) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function grain(ctx: CanvasRenderingContext2D, w: number, h: number, amount = 0.05) {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 255 * amount;
    d[i] += n;
    d[i + 1] += n;
    d[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
}

/** The assembly floor: concentric rings, compass ticks and the conference name set in a circle. */
export function floorTexture(title: string, ringText: string) {
  const S = 2048;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;
  const { serif, sans } = fonts();
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, S, S);
  const cx = S / 2;

  // soft radial tone
  const g = ctx.createRadialGradient(cx, cx, S * 0.05, cx, cx, S * 0.5);
  g.addColorStop(0, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(120,100,70,0.12)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);

  ctx.strokeStyle = "rgba(27,26,23,0.16)";
  for (const [r, w] of [
    [0.47, 3],
    [0.455, 1],
    [0.36, 2],
    [0.2, 1.5],
    [0.125, 3],
  ] as const) {
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.arc(cx, cx, S * r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // compass ticks
  for (let i = 0; i < 180; i++) {
    const a = (i / 180) * Math.PI * 2;
    const long = i % 15 === 0;
    const r1 = S * 0.455;
    const r2 = S * (long ? 0.43 : 0.445);
    ctx.lineWidth = long ? 3 : 1.4;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r1, cx + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(a) * r2, cx + Math.sin(a) * r2);
    ctx.stroke();
  }

  // radial aisles
  ctx.setLineDash([10, 14]);
  ctx.lineWidth = 2;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * S * 0.13, cx + Math.sin(a) * S * 0.13);
    ctx.lineTo(cx + Math.cos(a) * S * 0.36, cx + Math.sin(a) * S * 0.36);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // ring text
  ctx.fillStyle = "rgba(27,26,23,0.55)";
  ctx.font = `600 34px ${sans}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const text = `${ringText}   `.repeat(3);
  const chars = [...text];
  const r = S * 0.392;
  const step = (Math.PI * 2) / chars.length;
  chars.forEach((ch, i) => {
    const a = i * step - Math.PI / 2;
    ctx.save();
    ctx.translate(cx + Math.cos(a) * r, cx + Math.sin(a) * r);
    ctx.rotate(a + Math.PI / 2);
    ctx.fillText(ch, 0, 0);
    ctx.restore();
  });

  // the red inner ring
  ctx.strokeStyle = SEAL;
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(cx, cx, S * 0.2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // title in front of the rostrum (toward the viewer, +y in canvas = +z in world)
  ctx.fillStyle = "rgba(27,26,23,0.8)";
  ctx.font = `italic 120px ${serif}`;
  ctx.fillText(title, cx, cx + S * 0.27);

  grain(ctx, S, S, 0.045);
  return tex(c);
}

/** Tall council banner: colour field, big abbreviation, full name. */
export function bannerTexture(abbr: string, name: string, color: string, index: number) {
  const W = 512;
  const H = 1024;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  const { serif, sans } = fonts();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, W, H);

  // inner frame
  ctx.strokeStyle = "rgba(243,238,227,0.55)";
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, W - 56, H - 56);

  ctx.fillStyle = PAPER;
  ctx.textAlign = "center";
  ctx.font = `600 34px ${sans}`;
  ctx.fillText(`Council ${String(index + 1).padStart(2, "0")}`, W / 2, 110);

  // fit abbreviation
  let size = 230;
  ctx.font = `${size}px ${serif}`;
  while (ctx.measureText(abbr).width > W - 90 && size > 60) {
    size -= 6;
    ctx.font = `${size}px ${serif}`;
  }
  ctx.fillText(abbr, W / 2, H * 0.47);

  ctx.font = `500 36px ${sans}`;
  const words = name.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (ctx.measureText(t).width > W - 110) {
      lines.push(line);
      line = w;
    } else line = t;
  }
  lines.push(line);
  lines.forEach((l, i) => ctx.fillText(l, W / 2, H * 0.62 + i * 46));

  // pennant notch at bottom
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.moveTo(0, H);
  ctx.lineTo(W / 2, H - 90);
  ctx.lineTo(W, H);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";

  grain(ctx, W, H, 0.06);
  const t = tex(c);
  return t;
}

/** Desk placard (the folded card delegates raise to speak). */
export function placardTexture(text: string, color = INK) {
  const W = 512;
  const H = 160;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  const { sans } = fonts();
  ctx.fillStyle = "#fbf8f1";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, W, 14);
  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let size = 78;
  ctx.font = `600 ${size}px ${sans}`;
  while (ctx.measureText(text).width > W - 40 && size > 30) {
    size -= 4;
    ctx.font = `600 ${size}px ${sans}`;
  }
  ctx.fillText(text, W / 2, H / 2 + 8);
  return tex(c);
}

/** The wax seal behind the rostrum. */
export function sealTexture(letter: string) {
  const S = 512;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;
  const { serif } = fonts();
  const cx = S / 2;
  ctx.beginPath();
  const lobes = 16;
  for (let i = 0; i <= 400; i++) {
    const a = (i / 400) * Math.PI * 2;
    const r = S * 0.46 + Math.sin(a * lobes) * 7 + Math.sin(a * 3 + 1) * 3;
    const x = cx + Math.cos(a) * r;
    const y = cx + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.fillStyle = SEAL;
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(cx, cx, S * 0.33, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = `${S * 0.5}px ${serif}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.fillText(letter, cx + 5, cx + 9);
  ctx.fillStyle = "rgba(255,236,226,0.75)";
  ctx.fillText(letter, cx, cx + 4);
  grain(ctx, S, S, 0.08);
  return tex(c);
}
