import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import Button from "../../Reusable/Button/Button";
import { navLinks } from "./navlinks";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-neutral-45">
      <Container>
        <nav className="flex items-center justify-between font-Nunito min-h-12.5 font-Manrope py-4">
          {/* Logo */}
          <div>
            <Link to="/">
              <img src={IMAGES.logo} alt="Logo" />
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-primary-5 font-semibold"
                    : "text-neutral-40 font-medium hover:text-primary-40"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex">
            {!user ? (
              <div className="flex items-center gap-5">
                <Link to="/signin">
                  <Button
                    label="Sign In"
                    variant="secondary"
                    className="text-sm"
                  />
                </Link>
                <Link to="/signup">
                  <Button
                    label="Signup"
                    className="text-sm"
                    rightIcon={ICONS.arrowRight}
                  />
                </Link>
              </div>
            ) : (
              <Link to={`/dashboard//home`}>
                <Button label="Dashboard" className="text-sm" />
              </Link>
            )}
          </div>

          {/* Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <Link to={`/dashboard//home`}>
              <Button label="Dashboard" className="text-sm" />
            </Link>
            {/* <HamburgerMenu /> */}
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
