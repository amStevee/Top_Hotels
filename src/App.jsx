import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HotelList from "./pages/HotelList";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/hotels" element={<HotelList />} />
    </Routes>
  );
}

export default App;
