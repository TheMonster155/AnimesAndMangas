import Footer from "../Footer/Footer";
import HomePage from "../Main/homepage";
import NavbarComponent from "../Navbar/Navbar";
import "./HomePage2.css"; // Importa il file CSS

const HomePage2 = () => {
  return (
    <>
      <NavbarComponent />
      <div className="space-up" /> {/* Aggiungi un div per lo spazio */}
      <HomePage />
      <div className="space-between" /> {/* Aggiungi un div per lo spazio */}
      <Footer />
    </>
  );
};

export default HomePage2;
