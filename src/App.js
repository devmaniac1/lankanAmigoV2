// import logo from "./logo.svg";
import "./App.css";
import Itinerary from "./Itinerary.js";
import Navbar from "./Navbar.js";
import Map from "./Map.js";
import FooterBar from "./FooterBar.js";
import Home from "./home-components/Home.js";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Login from "./Login.js";

function App() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [currentWindow, setCurrentWindow] = useState("Itinerary");
  // const [currentPage, setCurrentPage] = useState(true);

  // function handlePage() {
  //   setCurrentPage(!currentPage);
  // }

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleChangeWindow(windowName) {
    setCurrentWindow(windowName);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home viewportWidth={viewportWidth} />} />
        <Route
          path="/trip"
          element={
            <ApplicationInterface
              viewportWidth={viewportWidth}
              currentWindow={currentWindow}
              handleChangeWindow={handleChangeWindow}
            />
          }
        />
        <Route path="/signUp" element={<Login />} />
        {/* <Route path="/login" element={<SignIn />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

function ApplicationInterface({
  handleChangeWindow,
  viewportWidth,
  currentWindow,
}) {
  const { type } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.state);
  const { from, to, fromDate, toDate, budget, travelMode } = location.state;

  const style = { position: "absolute", color: "#000" };

  ///////////////////////////////////////////////////////////////////////////

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBkePZHNAeceiSPlP4LuZIPd28NpBJcaF8",
    libraries: ["places"],
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  if (directionsResponse) {
    console.log("Rerendering");
  }
  if (!isLoaded) {
    return <div>Loading</div>;
  }

  async function calculateRoute() {
    if (from === "" || to === "") {
      return;
    }

    let mode = "";
    mode =
      travelMode === "bus" || travelMode === "train"
        ? // eslint-disable-next-line no-undef
          google.maps.TravelMode.TRANSIT
        : // eslint-disable-next-line no-undef
          google.maps.TravelMode.DRIVING;
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: from,
      destination: to,
      travelMode: mode,
    });
    setDirectionsResponse(results);
    console.log(results);
  }

  ///////////////////////////////////////////////////////////////////////////

  return (
    <div className="App">
      <header className="App-header">
        <Navbar viewportWidth={viewportWidth} style={style} />
      </header>
      <div className="main_app">
        {currentWindow === "Itinerary" && (
          <Itinerary
            toLocation={to}
            toDate={toDate}
            fromDate={fromDate}
            budget={budget}
            travelMode={travelMode}
            response={directionsResponse}
          />
        )}
        {currentWindow === "Map" && (
          <Map
            fromLocation={from}
            toLocation={to}
            travelMode={travelMode}
            setMap={setMap}
            calculateRoute={calculateRoute}
            directionsResponse={directionsResponse}
          />
        )}
        {viewportWidth > 800 && (
          <Map
            fromLocation={from}
            toLocation={to}
            travelMode={travelMode}
            setMap={setMap}
            calculateRoute={calculateRoute}
            directionsResponse={directionsResponse}
          />
        )}
      </div>
      {viewportWidth <= 800 && (
        <FooterBar onChangeWindow={handleChangeWindow} />
      )}
    </div>
  );
}

export default App;
