// layouts/MainLayout.jsx
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const MainLayout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default MainLayout;
