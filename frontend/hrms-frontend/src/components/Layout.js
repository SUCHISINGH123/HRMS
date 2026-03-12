import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-section">
        <Navbar />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
