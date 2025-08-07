import { useState, useEffect } from "react";
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

  useEffect(() => {
    setShowInMobile(false);
  }, [location.pathname]);

  const handleLinkClick = () => {
    setShowInMobile(false);
  };

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
            <LinkElement
              to="/"
              active={currentPath === "/"}
              linearGradient="linear-gradient(90deg, #232526, #414345);"
              onClick={handleLinkClick}
            >
              Dashboard
            </LinkElement>
            <LinkElement
              to="/requests"
              active={currentPath === "/requests"}
              linearGradient="linear-gradient(90deg, #232526, #414345);"
              onClick={handleLinkClick}
            >
              Asylum Requests
            </LinkElement>
            <LinkElement
              to="/decisions"
              active={currentPath === "/decisions"}
              linearGradient="linear-gradient(90deg, #232526, #414345);"
              onClick={handleLinkClick}
            >
              Asylum Decisions
            </LinkElement>
            <LinkElement
              to="/resettlements"
              active={currentPath === "/resettlements"}
              linearGradient="linear-gradient(90deg, #232526, #414345);"
              onClick={handleLinkClick}
            >
              Resettlements
            </LinkElement>
          </MenuElement>
          <AuxiliarMenu>
            <LinkElement
              color="white"
              active={currentPath === "/aboutUs"}
              to="/aboutUs"
              onClick={handleLinkClick}
            >
              About Us
            </LinkElement>
            <LinkElement
              color="white"
              active={currentPath === "/linkedin"}
              to="/linkedin"
              onClick={handleLinkClick}
            >
              Linkedin
            </LinkElement>
          </AuxiliarMenu>
        </LinkMenu>
      </MenuContainer>
    </LayoutNavbar>
  );
};
