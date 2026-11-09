"use client";

import dynamic from "next/dynamic";

// The hall only exists in the browser: WebGL, input and device checks all need `window`.
export const HallMount = dynamic(() => import("./hall").then((m) => m.Hall), { ssr: false });
