import { useLocation, useNavigate } from "react-router-dom";
import {
  AuxiliarMenu,
  LayoutNavbar,
  LinkElement,
  LinkMenu,
  LogoAndMobileMenu,
  LogoLayout,
  MenuContainer,
  MenuElement,
  MenuLayout,
} from "./style";
import logo from "@assets/beyondfootsteps_transparent_logo.png";
import {
  CustomCiMap,
  CustomHiOutlineDocumentText,
  CustomIoHomeOutline,
  CustomLuChartSpline,
  CustomPiGavelLight,
} from "@/styles/styles";
import { MainMenuOptions } from "./mainMenuOptions";

export const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();
  return (
    <LayoutNavbar $isResettlement={currentPath === "/resettlements"}>
      <MenuContainer>
        <LogoAndMobileMenu>
          <LogoLayout onClick={() => navigate("/")} src={logo} />
          <MenuLayout>
            <LinkElement to="/dashboard" $background="none">
              <CustomCiMap $active={currentPath === "/dashboard"} />
            </LinkElement>
            <LinkElement
              $active={currentPath === "/requests"}
              to="/requests"
              $background="none"
            >
              <CustomHiOutlineDocumentText
                $active={currentPath === "/requests"}
              />
            </LinkElement>
            <LinkElement
              $active={currentPath === "/"}
              to="/"
              $background="none"
            >
              <CustomIoHomeOutline $active={currentPath === "/"} />
            </LinkElement>
            <LinkElement
              $active={currentPath === "/decisions"}
              to="/decisions"
              $background="none"
            >
              <CustomPiGavelLight $active={currentPath === "/decisions"} />
            </LinkElement>
            <LinkElement
              $active={currentPath === "/resettlements"}
              to="/resettlements"
              $background="none"
            >
              <CustomLuChartSpline $active={currentPath === "/resettlements"} />
            </LinkElement>
          </MenuLayout>
        </LogoAndMobileMenu>
        <LinkMenu>
          <MenuElement $isResettlement={currentPath === "/resettlements"}>
            <MainMenuOptions />
            {currentPath === "/resettlements" ? (
              <LinkElement
                color="black"
                to="/aboutUs"
                $linearGradient="linear-gradient(90deg, #232526, #414345);"
              >
                About Us
              </LinkElement>
            ) : null}
          </MenuElement>
          {currentPath != "/resettlements" ? (
            <AuxiliarMenu>
              <LinkElement
                color="white"
                $active={currentPath === "/aboutus"}
                to="/aboutUs"
              >
                About Us
              </LinkElement>
              <LinkElement
                hidden={true}
                color="white"
                $active={currentPath === "/portfolio"}
                to="/linkedin"
              >
                Portfolio
              </LinkElement>
            </AuxiliarMenu>
          ) : null}
        </LinkMenu>
      </MenuContainer>
    </LayoutNavbar>
  );
};
