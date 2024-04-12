import Footer from "@/components/layoutsComponents/Footer";
import NavBar from "@/components/layoutsComponents/NavBar";

function layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

export default layout;
