import { Space_Grotesk, EB_Garamond } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-grotesk" });
const garamond = EB_Garamond({ subsets: ["latin"], style: ["italic"], variable: "--font-garamond" });

export const metadata = {
  title: "Bhavneesh Banga. — Portfolio",
  description: "Full-Stack AI & Cloud Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${garamond.variable}`}>
      <body>{children}</body>
    </html>
  );
}
