import ThemeToggle from "@/components/layouts/ThemeToggle";
import ThemeSwitch from "../../components/layouts/ThemeSwitch";
import CustomFont from "./panels/CustomFont";

const DevPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <h1 className="font-serif text-4xl text-foreground">Hello Themes</h1>
      <CustomFont />
      <ThemeSwitch />
      <ThemeToggle />
    </div>
  );
};

export default DevPage;
