import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}

