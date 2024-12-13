import Footer from "../Footer/Footer";
import HomePage from "../Main/homepage";
import NavbarComponent from "../Navbar/Navbar";
import "./HomePage2.css"; // Importa il file CSS

const HomePage2 = () => {
  return (
    <>
      <NavbarComponent />
      <div className="space-up" />
      <HomePage />
      <div className="space-between" />
      <Footer />
    </>
  );
};

export default HomePage2;
