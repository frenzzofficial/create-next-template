"use client";
import { StyleProvider } from "../providers/StyleProvider";
import ThemeProvider from "../providers/ThemeProvider";
import Footer from "./Footer";
import Header from "./Header";

interface AppClientLayoutProps {
  children: React.ReactNode;
}

const AppClientLayout = (props: AppClientLayoutProps) => {
  const { children } = props;
  return (
    <ThemeProvider>
      <StyleProvider>
        <Header />
        <main className="min-h-screen w-full">{children}</main>
        <Footer />
      </StyleProvider>
    </ThemeProvider>
  );
};

export default AppClientLayout;
