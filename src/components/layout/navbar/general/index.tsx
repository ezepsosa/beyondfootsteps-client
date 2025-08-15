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
import { MainMenuOptions } from "../mainMenuOptions";
import {
  CustomFaMapMarkedAlt,
  CustomHiOutlineDocumentText,
  CustomLuChartSpline,
  CustomMdGavel,
} from "@/styles/styles";

export const GeneralNavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  return (
    <LayoutNavbar>
      <MenuContainer>
        <LogoAndMobileMenu>
          <LogoLayout onClick={() => navigate("/")} src={logo} />
          <MenuLayout>
            <LinkElement to="/dashboard" $active={currentPath === "/dashboard"}>
              <CustomFaMapMarkedAlt />
            </LinkElement>
            <LinkElement
              $active={currentPath === "/requests"}
              to="/requests"
            >
              <CustomHiOutlineDocumentText />
            </LinkElement>
            <LinkElement
              $active={currentPath === "/decisions"}
              to="/decisions"
            >
              <CustomMdGavel />
            </LinkElement>
            <LinkElement
              $active={currentPath === "/resettlements"}
              to="/resettlements"
            >
              <CustomLuChartSpline />
            </LinkElement>
          </MenuLayout>
        </LogoAndMobileMenu>
        <LinkMenu>
          <MenuElement>
            <MainMenuOptions/>
          </MenuElement>
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
        </LinkMenu>
      </MenuContainer>
    </LayoutNavbar>
  );
};
