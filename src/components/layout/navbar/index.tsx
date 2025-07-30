import { useState } from "react";
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
            <LinkElement to="/">Dashboard</LinkElement>
            <LinkElement to="/">Asylum Requests</LinkElement>
            <LinkElement to="/">Asylum Decisions</LinkElement>
            <LinkElement to="/">Resettlements</LinkElement>
          </MenuElement>
          <AuxiliarMenu>
            <LinkElement color="white" to="/">
              About Us
            </LinkElement>
            <LinkElement color="white" to="/">
              Linkedin
            </LinkElement>
          </AuxiliarMenu>
        </LinkMenu>
      </MenuContainer>
    </LayoutNavbar>
  );
};
