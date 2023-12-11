import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Events from "./pages/event/Events";
import CreateEvent from "./pages/event/CreateEvent";
import PaymentMock from "./pages/PaymentMock";
import Tickets from "./pages/Tickets";
import Profile from "./pages/user/index";
import Footer from "./components/Footer";
import EditEvent from "./pages/event/EditEvent";
import ShowEvent from "./pages/event/ShowEvent";
import CreateTicketType from "./pages/CreateTicketType";
import VerifyTicket from "./pages/VerifyTicket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Requests from "./pages/Requests";
import PrivateRoutes from "./utils/routeProtection";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redirect" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<Tickets />} />
        <Route path="/my-events" element={<Events />} />
        <Route path="/view-event/:id" element={<ShowEvent />} />
        <Route path="/payment/:id" element={<PaymentMock />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<PrivateRoutes roles={["organizer"]} />}>
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/my-organized-events" element={<Events />} />
          <Route path="/edit-event/:id/ticket" element={<CreateTicketType />} />
          <Route path="/verify-ticket/:id" element={<VerifyTicket />} />
        </Route>
        <Route element={<PrivateRoutes roles={["admin"]} />}>
          <Route path="/requests" element={<Requests />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
