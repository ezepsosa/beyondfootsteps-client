import { LayoutNavbar, LogoLayout, MenuLayout } from "./style";
import logo from "@assets/beyondfootsteps_transparent_logo.png"

export const Navbar = () => {
  return (
    <LayoutNavbar>
      <LogoLayout src={logo}/>
      <MenuLayout>☰</MenuLayout>
    </LayoutNavbar>
  );
};
