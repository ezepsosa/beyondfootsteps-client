import { useState } from "react";
import {
  MenuContainer,
  LayoutNavbar,
  LinkElement,
  LogoLayout,
  MenuElement,
  MenuLayout,
  AuxiliarMenu,
} from "./style";
import logo from "@assets/beyondfootsteps_transparent_logo.png";

export const Navbar = () => {
  const [showInMobile, setShowInMobile] = useState<boolean>(false);
  return (
    <LayoutNavbar>
      <LogoLayout src={logo} />
      <MenuContainer>
        <MenuLayout onClick={() => setShowInMobile(!showInMobile)}>☰</MenuLayout>
        <MenuElement open={showInMobile}>
          <LinkElement to="/">Dashboard</LinkElement>
          <LinkElement to="/">Asylum Requests</LinkElement>
          <LinkElement to="/">Asylum Decisions</LinkElement>
          <LinkElement to="/">Resettlements</LinkElement>
        </MenuElement>
        <AuxiliarMenu>
          <LinkElement color="white" to="/">About Us</LinkElement>
          <LinkElement color="white" to="/">Linkedin</LinkElement>
        </AuxiliarMenu>
      </MenuContainer>
    </LayoutNavbar>
  );
};
