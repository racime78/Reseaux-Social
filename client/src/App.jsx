import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteProtegee from "./routes/RouteProtegee";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Feed from "./pages/Feed";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />

        <Route
          path="/"
          element={
            <RouteProtegee>
              <Feed />
            </RouteProtegee>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
