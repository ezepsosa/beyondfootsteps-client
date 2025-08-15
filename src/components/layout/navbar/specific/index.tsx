import { useEffect, useState } from "react";
import {
  LayoutNavbar,
  LinkElement,
  LogoAndMobileMenu,
  MenuContainer,
  MenuElement,
} from "./style";
import logo from "@assets/beyondfootsteps_transparent_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { LinkMenu, LogoLayout, MenuLayout } from "../style";
import { MainMenuOptions } from "../mainMenuOptions";

export const SpecificNavBar = () => {
  const [showInMobile, setShowInMobile] = useState<boolean>(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    setShowInMobile(false);
  }, [location.pathname]);

  const handleLinkClick = () => {
    setShowInMobile(false);
  };

  const navigate = useNavigate();

  return (
    <LayoutNavbar>
      <MenuContainer>
        <LogoAndMobileMenu>
          <LogoLayout onClick={() => navigate("/")} src={logo} />
          <MenuLayout onClick={() => setShowInMobile(!showInMobile)}>
            ☰
          </MenuLayout>
        </LogoAndMobileMenu>
        <LinkMenu>
          <MenuElement open={showInMobile}>
            <MainMenuOptions/>
            <LinkElement
              $active={currentPath === "/aboutus"}
              $linearGradient="linear-gradient(90deg, #232526, #414345);"
              to="/aboutUs"
              onClick={handleLinkClick}
            >
              About Us
            </LinkElement>
            <LinkElement
              hidden={true}
              $active={currentPath === "/portfolio"}
              to="/linkedin"
              onClick={handleLinkClick}
            >
              Portfolio
            </LinkElement>
          </MenuElement>
        </LinkMenu>
      </MenuContainer>
    </LayoutNavbar>
  );
};
