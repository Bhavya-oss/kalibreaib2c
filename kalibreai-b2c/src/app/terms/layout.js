import NavBar from "@/components/layoutsComponents/NavBar";

function layout({ children }) {
    return (
      <>
        <NavBar />
        {children}
      </>
    );
  }
  
  export default layout;