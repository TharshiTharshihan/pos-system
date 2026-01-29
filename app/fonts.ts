// app/fonts.ts
import { DM_Sans, Montserrat, Urbanist } from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});
