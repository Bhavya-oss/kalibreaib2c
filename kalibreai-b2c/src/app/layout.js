import { Inter } from "next/font/google";
import "../styles/globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";
import ContextProvider from "@/context/ContextProvider";
import SuperTokenInitialaize from "@/components/auth/superTokenIntialaize";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  manifest: "/manifest.json",
  title: {
    default: "Kalibre.ai",
    template: "%s | Kalibre.ai",
  },
  description:
    "Kalibre.ai is a revolutionary platform empowering candidates to seamlessly apply for jobs and create comprehensive profiles. Join us and take control of your career journey today.",

  alternates: {
    canonical: "https://Kalibre.ai",
  },
};

export const viewport = {
  themeColor: '"#FFF"',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </head>
      <body>
        <SuperTokenInitialaize />
        <ThemeRegistry>
          <ContextProvider>{children}</ContextProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
