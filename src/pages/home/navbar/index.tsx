import { useLocation } from "react-router-dom";
import {
  LayoutNavbar,
  LinkElement,
  LinkMenu,
  MenuContainer,
  MenuElement,
} from "./style";

export const HomeNavbar = () => {

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <LayoutNavbar>
      <MenuContainer>
        <LinkMenu>
          <MenuElement>
            <LinkElement
              to="/"
              $active={currentPath === "/"}
              $linearGradient="linear-gradient(90deg, #232526, #414345);"
            >
              Home
            </LinkElement>
            <LinkElement
              to="/dashboard"
              $active={currentPath === "/dashboard"}
              $linearGradient="linear-gradient(90deg, #232526, #414345);"
            >
              Maps
            </LinkElement>
            <LinkElement
              to="/resettlements"
              $active={currentPath === "/resettlements"}
              $linearGradient="linear-gradient(90deg, #232526, #414345);"
            >
              Graphics
            </LinkElement>
            <LinkElement
              $active={currentPath === "/aboutus"}
              $linearGradient="linear-gradient(90deg, #232526, #414345);"
              to="/aboutUs"
            >
              About Us
            </LinkElement>
          </MenuElement>
        </LinkMenu>
      </MenuContainer>
    </LayoutNavbar>
  );
};
