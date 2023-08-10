"use client";

//import { Inter } from "next/font/google";

import { usePathname } from "next/navigation";
import Header from "./navigation/Header";
import FooterSitemapLinks from "./footer/footer";

//const inter = Inter({ subsets: ["latin"] });

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = usePathname();
  const isDiagnosticRoute = router.startsWith("/diagnostic");
  const isSuperAdmin = router.startsWith("/superadmin");
  const isHeader = !isSuperAdmin && !isDiagnosticRoute;

  return (
    <>
      {isHeader && <Header></Header>}
      <main>{children}</main>
      {/* <FooterSitemapLinks></FooterSitemapLinks> */}
    </>
  );
}
