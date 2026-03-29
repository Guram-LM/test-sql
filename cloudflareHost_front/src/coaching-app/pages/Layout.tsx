import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";



const Leyout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />

      <div
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/individual-coaching">Individual Coaching</a>
        <a href="/for-companies">For Companies</a>
        <a href="/results">Results</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms-of-use">Terms of Use</a>
        <a href="/terms-of-service">Terms of Service</a>
      </div>

      <main className="flex-1 flex flex-col">

          <Outlet />

      </main>

      <Footer />
    </div>
  );
};

export default Leyout;


