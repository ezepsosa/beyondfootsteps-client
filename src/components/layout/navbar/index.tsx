import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  MenuContainer,
  LayoutNavbar,
  LinkElement,
  LogoLayout,
  MenuElement,
  MenuLayout,
  AuxiliarMenu,
  LogoAndMobileMenu,
  LinkMenu,
} from "./style";
import logo from "@assets/beyondfootsteps_transparent_logo.png";

export const Navbar = () => {
  const [showInMobile, setShowInMobile] = useState<boolean>(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <LayoutNavbar>
      <MenuContainer>
        <LogoAndMobileMenu>
          <LogoLayout src={logo} />
          <MenuLayout onClick={() => setShowInMobile(!showInMobile)}>
            ☰
          </MenuLayout>
        </LogoAndMobileMenu>
        <LinkMenu>
          <MenuElement open={showInMobile}>
            <LinkElement to="/" active={currentPath === "/"}>Dashboard</LinkElement>
            <LinkElement to="/requests" active={currentPath === "/requests"}>Asylum Requests</LinkElement>
            <LinkElement to="/decisions" active={currentPath === "/decisions"}>Asylum Decisions</LinkElement>
            <LinkElement to="/resettlements" active={currentPath === "/resettlements"}>Resettlements</LinkElement>
          </MenuElement>
          <AuxiliarMenu>
            <LinkElement color="white" active={currentPath === "/aboutUs"} linearGradient="linear-gradient(90deg, #d1d1d1ff, #ffffffff);" to="/aboutUs">About Us</LinkElement>
            <LinkElement color="white" active={currentPath === "/linkedin"} linearGradient="linear-gradient(90deg, #d1d1d1ff, #ffffffff);" to="/linkedin">Linkedin</LinkElement>
          </AuxiliarMenu>
        </LinkMenu>
      </MenuContainer>
    </LayoutNavbar>
  );
};
