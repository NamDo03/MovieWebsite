import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContextProvider } from "./context/AuthContext";
import MyList from "./pages/MyList";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Watch from "./pages/Watch";

function App() {
  const Layout = ({ children }) => {
    return (
      <div>
        <ProtectedRoute>
          <Navbar />
          {children}
          <Footer />
        </ProtectedRoute>
      </div>
    );
  };

  const NoLayout = ({ children }) => {
    return (
      <div>
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      </div>
    );
  };
  const FooterLayout = ({ children }) => {
    return (
      <div>
        {children}
        <Footer />
      </div>
    );
  };

  return (
    <div className="App">
      <Router>
        <AuthContextProvider>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/tvshows" element={<Layout><TVShows /></Layout>} />
              <Route path="/movies" element={<Layout><Movies /></Layout>} />
              <Route path="/mylist" element={<Layout><MyList /></Layout>} />
              <Route path="/search" element={<Layout><Search /></Layout>} />
              <Route path="/watch/:type/:id" element={<NoLayout><Watch /></NoLayout>} />
              <Route path="/signup" element={<FooterLayout><Signup /></FooterLayout>} />
              <Route path="/signin" element={<FooterLayout><Signin /></FooterLayout>} />
              <Route path="*" element={<Layout><PageNotFound /></Layout>} />
            </Routes>
          </ScrollToTop>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
