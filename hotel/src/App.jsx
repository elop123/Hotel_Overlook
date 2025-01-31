import { RoomsPage } from "./pages/RoomsPage";
import { MainLayout } from "./layout/MainLayout";
import { HomePage } from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage"; 
import { ReservationPage } from "./pages/ReservationPage";
import './App.css';
import { UserContextProvider } from "./context/userContext";
import { CityandHotelsPage } from "./pages/CityandHotelsPage";
import { HotelRoomPage } from "./pages/HotelRoomPage";
import { HotelsandDestinationsPage } from "./pages/HotelsandDestinationsPage";
import { LoginInfoPage } from "./pages/LoginInfoPage";
import { RoomDetailsPage } from "./pages/RoomDetailsPage";
import { NewsDetailsPage } from "./pages/NewsDetailsPage";
import { RoomTypeDetailsPage } from "./pages/RoomTypeDetailsPage";


function App() {
  return (
    <UserContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/news/:newsId" element={<NewsDetailsPage />} />
          <Route path="/rooms/:roomTitle" element={<RoomTypeDetailsPage />} />
          <Route path="/room" element={<RoomsPage />} />
          <Route path="hotels" element={<HotelsandDestinationsPage />} />
          <Route path="/hotels/:countrySlug" element={<HotelsandDestinationsPage />}  /> 
          <Route path="/hotels/:countrySlug/:citySlug" element={<CityandHotelsPage />}  /> 
          <Route path="/hotels/:countrySlug/:citySlug/:hotelSlug" element={<HotelRoomPage />}  /> 
          <Route path="/hotels/:countrySlug/:citySlug/:hotelSlug/:roomId" element={<RoomDetailsPage />} />
          <Route path="reservation" element={<ReservationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="login/:reservations" element={<LoginInfoPage />} />
        </Route>
      </Routes>
    </Router>
    </UserContextProvider>
  );
}

export default App;
