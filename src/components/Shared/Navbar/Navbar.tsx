import { IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";

const Navbar = () => {
  return (
    <Container>
      <img src={IMAGES.logo} alt="" />
    </Container>
  );
};

export default Navbar;