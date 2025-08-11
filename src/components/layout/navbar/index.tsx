import { useLocation } from "react-router-dom";
import { GeneralNavBar } from "./general";
import { SpecificNavBar } from "./specific";

export const Navbar = () => {
  const location = useLocation();

  return location.pathname != "/resettlements" ? (
      <GeneralNavBar />
  ) : (
      <SpecificNavBar />
  );
};
