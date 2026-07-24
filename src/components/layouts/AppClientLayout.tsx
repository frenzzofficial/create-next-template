"use client";

import Footer from "./Footer";
import Header from "./Header";

interface AppClientLayoutProps {
  children: React.ReactNode;
}

const AppClientLayout = (props: AppClientLayoutProps) => {
  const { children } = props;
  return (
    <>
      <Header />
      <main className="min-h-screen w-full">{children}</main>
      <Footer />
    </>
  );
};

export default AppClientLayout;
