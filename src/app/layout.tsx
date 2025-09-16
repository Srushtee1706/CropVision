import "./globals.css";
import { UserProvider } from "./context/UserContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

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
        <UserProvider>
          <Navbar />
          {children}
          <Toaster richColors />
        </UserProvider>
      </body>
    </html>
  );
}

