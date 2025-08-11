import { useEffect, useState } from "react";
import {
  AuxiliarMenu,
  LayoutNavbar,
  LinkElement,
  LogoAndMobileMenu,
  MenuContainer,
  MenuElement,
} from "./style";
import logo from "@assets/beyondfootsteps_transparent_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { LinkMenu, LogoLayout, MenuLayout } from "../style";

export const GeneralNavBar = () => {
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
            <LinkElement
              to="/dashboard"
              $active={currentPath === "/dashboard"}
              $linearGradient="linear-gradient(90deg, #232526, #414345);"
              onClick={handleLinkClick}
            >
              Dashboard
            </LinkElement>
            <LinkElement
              to="/requests"
              $active={currentPath === "/requests"}
              $linearGradient="linear-gradient(90deg, #232526, #414345);"
              onClick={handleLinkClick}
            >
              Asylum Requests
            </LinkElement>
            <LinkElement
              to="/decisions"
              $active={currentPath === "/decisions"}
              $linearGradient="linear-gradient(90deg, #232526, #414345);"
              onClick={handleLinkClick}
            >
              Asylum Decisions
            </LinkElement>
            <LinkElement
              to="/resettlements"
              $active={currentPath === "/resettlements"}
              $linearGradient="linear-gradient(90deg, #232526, #414345);"
              onClick={handleLinkClick}
            >
              Resettlements
            </LinkElement>
          </MenuElement>
          <AuxiliarMenu open={showInMobile}>
            <LinkElement
              color="white"
              $active={currentPath === "/aboutus"}
              to="/aboutUs"
              onClick={handleLinkClick}
            >
              About Us
            </LinkElement>
            <LinkElement
              hidden={true}
              color="white"
              $active={currentPath === "/portfolio"}
              to="/linkedin"
              onClick={handleLinkClick}
            >
              Portfolio
            </LinkElement>
          </AuxiliarMenu>
        </LinkMenu>
      </MenuContainer>
    </LayoutNavbar>
  );
};
