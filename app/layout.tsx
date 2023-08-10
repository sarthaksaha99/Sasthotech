import { AuthProvider } from "@/context/AuthContext";

import "./globals.css";
//import { Inter } from "next/font/google";

import MainLayout from "./(components)/MainLayout";

//const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sasthotech Bd",
  description: "Smart Solution to Hospital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = usePathname();
  // const isDiagnosticRoute = router.startsWith("/diagnostic");
  // const isSuperAdmin = router.startsWith("/superadmin");
  // const isHeader = !isSuperAdmin && !isDiagnosticRoute;

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
