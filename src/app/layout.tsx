import "./globals.css";
import { UserProvider } from "./context/UserContext";

export const metadata = {
  title: "Farmus | Smart Farming Solutions",
  description: "AI-powered crop yield prediction for Odisha",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Make user available across all pages */}
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}

