import { useState } from "react";
import {
  LayoutNavbar,
  LinkElement,
  LogoLayout,
  MenuContainer,
  MenuElement,
  MenuLayout,
} from "./style";
import logo from "@assets/beyondfootsteps_transparent_logo.png";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <LayoutNavbar>
      <LogoLayout src={logo} />
      <MenuContainer>
        <MenuLayout onClick={() => setMenuOpen(!menuOpen)}>☰</MenuLayout>
        <MenuElement open={menuOpen}>
          <LinkElement to="/">Dashboard</LinkElement>
          <LinkElement to="/">Asylum Requests</LinkElement>
          <LinkElement to="/">Asylum Decisions</LinkElement>
          <LinkElement to="/">Resettlements</LinkElement>
        </MenuElement>
        <MenuElement open={menuOpen}>
          <LinkElement to="/">About Us</LinkElement>
          <LinkElement to="/">Linkedin</LinkElement>
        </MenuElement>
      </MenuContainer>
    </LayoutNavbar>
  );
};
