import { useState,useEffect } from "react";
import LiveMap from "./LiveMap";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [detections, setDetections] = useState([]);
const [selectedImage, setSelectedImage] = useState(null);
const [garbageAlerts, setGarbageAlerts] = useState([]);
const [cameraStream, setCameraStream] = useState(null);
const [imageDimensions, setImageDimensions] = useState({
  width: 1,
  height: 1
});
const [trafficData, setTrafficData] = useState(null);
useEffect(() => {
    const getTrafficData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/traffic");
        const data = await response.json();
        setTrafficData(data);
      } catch (error) {
        console.error("Traffic API error:", error);
      }
    };

    getTrafficData();

    const interval = setInterval(getTrafficData, 5000);

    return () => clearInterval(interval);
  }, []);
  const menuItems = [
  { name: "Dashboard", icon: "📊" },
  { name: "Live Fleet", icon: "🚌" },
  { name: "AI Prediction", icon: "🤖" },
  { name: "Pothole Detection", icon: "🕳️" },
  { name: "Camera", icon: "📷" },
  { name: "Routes", icon: "🗺️" },
  { name: "Alerts", icon: "🔔" },
  { name: "Fitness & Sports", icon: "🏃" },
];

 const buses = [
  {
    id: "HYD-BUS-001",
    route: "Dilsukhnagar → Mehdipatnam",
    passengers: 62,
    status: "On Time",
  },
  {
    id: "HYD-BUS-002",
    route: "Mehdipatnam → Dilsukhnagar",
    passengers: 84,
    status: "Delayed",
  },
  {
    id: "HYD-BUS-003",
    route: "LB Nagar → Secunderabad",
    passengers: 71,
    status: "On Time",
  },
  {
    id: "HYD-BUS-004",
    route: "Secunderabad → LB Nagar",
    passengers: 91,
    status: "Delayed",
  },
  {
    id: "HYD-BUS-005",
    route: "Kukatpally → Ameerpet",
    passengers: 58,
    status: "On Time",
  },
  {
    id: "HYD-BUS-006",
    route: "Ameerpet → Kukatpally",
    passengers: 76,
    status: "On Time",
  },
  {
    id: "HYD-BUS-007",
    route: "Gachibowli → Secunderabad",
    passengers: 88,
    status: "Delayed",
  },
  {
    id: "HYD-BUS-008",
    route: "Secunderabad → Gachibowli",
    passengers: 69,
    status: "On Time",
  },
  {
    id: "HYD-BUS-009",
    route: "Miyapur → Ameerpet",
    passengers: 73,
    status: "On Time",
  },
  {
    id: "HYD-BUS-010",
    route: "Ameerpet → Miyapur",
    passengers: 81,
    status: "Delayed",
  },
  {
    id: "HYD-BUS-011",
    route: "Uppal → Mehdipatnam",
    passengers: 67,
    status: "On Time",
  },
  {
    id: "HYD-BUS-012",
    route: "Mehdipatnam → Uppal",
    passengers: 79,
    status: "On Time",
  },
  {
    id: "HYD-BUS-013",
    route: "Kondapur → Dilsukhnagar",
    passengers: 64,
    status: "On Time",
  },
  {
    id: "HYD-BUS-014",
    route: "Dilsukhnagar → Kondapur",
    passengers: 86,
    status: "Delayed",
  },
  {
    id: "HYD-BUS-015",
    route: "Hitech City → Secunderabad",
    passengers: 93,
    status: "Delayed",
  },
  {
    id: "HYD-BUS-016",
    route: "Secunderabad → Hitech City",
    passengers: 72,
    status: "On Time",
  },
  {
    id: "HYD-BUS-017",
    route: "LB Nagar → Mehdipatnam",
    passengers: 61,
    status: "On Time",
  },
  {
    id: "HYD-BUS-018",
    route: "Mehdipatnam → LB Nagar",
    passengers: 83,
    status: "On Time",
  },
  {
    id: "HYD-BUS-019",
    route: "Kukatpally → Gachibowli",
    passengers: 77,
    status: "Delayed",
  },
  {
    id: "HYD-BUS-020",
    route: "Gachibowli → Kukatpally",
    passengers: 68,
    status: "On Time",
  },
  {
    id: "HYD-BUS-021",
    route: "Uppal → Secunderabad",
    passengers: 55,
    status: "On Time",
  },
  {
    id: "HYD-BUS-022",
    route: "Secunderabad → Uppal",
    passengers: 74,
    status: "On Time",
  },
  {
    id: "HYD-BUS-023",
    route: "Miyapur → Gachibowli",
    passengers: 89,
    status: "Delayed",
  },
  {
    id: "HYD-BUS-024",
    route: "Gachibowli → Miyapur",
    passengers: 63,
    status: "On Time",
  },
  {
    id: "HYD-BUS-025",
    route: "Dilsukhnagar → Hitech City",
    passengers: 69,
    status: "On Time",
  },
];
  const routes = buses.map((bus) => ({
    route: bus.route,
    vehicle: bus.id,
  }));

  const highDemandBuses = buses.filter(
    (bus) => bus.status === "High Demand"
  );

  const delayedBuses = buses.filter(
    (bus) => bus.status === "Delayed"
  );

  const getStatusClass = (status) => {
    if (status === "Delayed") return "badge yellow";
    if (status === "High Demand") return "badge red";
    return "badge green";
  };

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">🚌</div>

          <div>
            <h2>Urban AI</h2>
            <span>Smart Transport</span>
          </div>
        </div>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={
                activePage === item.name
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => setActivePage(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}

              {/* ALERT COUNT */}
              {item.name === "Alerts" && (
                <small className="alert-count">
                  {highDemandBuses.length + delayedBuses.length}
                </small>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <strong>SIH26124</strong>
          <span>Urban Intelligence</span>
        </div>

      </aside>

      {/* MAIN */}
      <main className="main">

        {/* HEADER */}
        <header className="topbar">

          <div>
            <span className="project-code">
              SIH26124
            </span>

            <h1>
              AI-Powered Urban Intelligence Platform
            </h1>

            <p>Welcome back 👋</p>
          </div>

          <div className="system-status">
            <span className="status-dot"></span>
            System Online
          </div>

        </header>

     {/* ================= DASHBOARD ================= */}

{activePage === "Dashboard" && (
  <>
    <h2 className="page-title">
      Dashboard
    </h2>

    <div className="stats-grid">

      <div className="stat-card">
        <span>🚌</span>
        <p>Total Buses</p>
        <h2>25</h2>
      </div>

      <div className="stat-card">
        <span>🟢</span>
        <p>Active Buses</p>
        <h2>19</h2>
      </div>

      <div className="stat-card">
        <span>🟡</span>
        <p>Delayed</p>
        <h2>{delayedBuses.length}</h2>
      </div>

      <div className="stat-card">
        <span>🔴</span>
        <p>High Demand</p>
        <h2>{highDemandBuses.length}</h2>
      </div>

    </div>

    {/* ================= TRAFFIC CONGESTION ================= */}

    <section className="section-card">

      <h2>
        🚦 Traffic Congestion
      </h2>

      <p>
        Hyderabad traffic conditions
      </p>

      {trafficData ? (
        <div className="prediction-box">

          <span>
            Current Congestion Score
          </span>

          <h1>
            {trafficData.congestion_score}%
          </h1>

          <strong>
            {trafficData.congestion_level}
          </strong>

          <p>
            🚗 Vehicles: {trafficData.vehicle_count}
          </p>

          <p>
            🚘 Average Speed: {trafficData.average_speed} km/h
          </p>

        </div>
      ) : (
        <p>
          Loading traffic data...
        </p>
      )}
{selectedImage && (
  <div style={{ marginTop: "20px" }}>
    <h3>AI Detection Result</h3>
<div
  style={{
    position: "relative",
    display: "inline-block",
    maxWidth: "100%"
  }}
>
  <img
    src={selectedImage}
    alt="Pothole detection"
    style={{
      maxWidth: "100%",
      display: "block",
      borderRadius: "10px"
    }}
  />

  {detections.map((detection, index) => {
    const [x1, y1, x2, y2] = detection.box;

    return (
      <div
        key={index}
        style={{
          position: "absolute",
         left: `${(x1 / imageDimensions.width) * 100}%`,
top: `${(y1 / imageDimensions.height) * 100}%`,
width: `${((x2 - x1) / imageDimensions.width) * 100}%`,
height: `${((y2 - y1) / imageDimensions.height) * 100}%`,
          border: "5px solid red",
backgroundColor: "rgba(255, 0, 0, 0.15)",
          boxSizing: "border-box",
          pointerEvents: "none"
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "-25px",
            left: "0",
            background: "red",
            color: "white",
            padding: "3px 6px",
            fontSize: "12px",
            fontWeight: "bold",
            borderRadius: "4px",
            whiteSpace: "nowrap"
          }}
        >
          Pothole {index + 1} — {detection.confidence}%
        </span>
      </div>
    );
  })}
</div>
    
    

    <h3 style={{ marginTop: "15px" }}>
      Detected Potholes: {detections.length}
    </h3>

    {detections.map((detection, index) => (
      <p key={index}>
        🕳️ Pothole {index + 1} — Confidence:{" "}
        {detection.confidence}%
      </p>
    ))}
  </div>
)}

    </section>

    {/* ================= LIVE PUBLIC TRANSPORT ================= */}

    <section className="section-card">

      <div className="section-header">

        <div>
          <h2>
            🚌 Live Public Transport Fleet
          </h2>

          <p>
            Real-time fleet monitoring
          </p>
        </div>

        <button
          onClick={() =>
            setActivePage("Live Fleet")
          }
        >
          View All
        </button>

      </div>

      <div className="bus-grid">

        {buses.slice(0, 4).map((bus) => (
          <div
            className="bus-card"
            key={bus.id}
          >

            <div className="bus-icon">
              🚌
            </div>

            <h3>
              {bus.id}
            </h3>

            <p>
              {bus.route}
            </p>

            <strong>
              Passengers {bus.passengers}
            </strong>

            <span
              className={getStatusClass(bus.status)}
            >
              {bus.status}
            </span>

          </div>
        ))}

      </div>

    </section>

    {/* ================= AI DEMAND PREDICTION ================= */}

    <section className="section-card">

      <h2>
        🤖 AI Demand Prediction
      </h2>

      <p>
        Passenger demand forecast
      </p>

      <div className="prediction-box">

        <span>
          Next Hour Predicted Demand
        </span>

        <h1>
          91 passengers
        </h1>

        <strong>
          HIGH
        </strong>

        <div className="recommendation">

          💡 <b>AI Recommendation</b>

          <br />

          Consider adding an extra bus
          during peak hours.

        </div>

      </div>

    </section>

  </>
)}
           
        {/* ================= LIVE FLEET ================= */}

        {activePage === "Live Fleet" && (
          <>
            <h2 className="page-title">
              Live Fleet
            </h2>

            <section className="section-card">

              <h2>
                🚌 Live Fleet Monitoring
              </h2>

              <p>
                All currently monitored public
                transport vehicles
              </p>

              <div className="bus-grid">

                {buses.map((bus) => (
                  <div
                    className="bus-card"
                    key={bus.id}
                  >

                    <div className="bus-icon">
                      🚌
                    </div>

                    <h3>{bus.id}</h3>

                    <p>{bus.route}</p>

                    <strong>
                      Passengers {bus.passengers}
                    </strong>

                    <span
                      className={getStatusClass(bus.status)}
                    >
                      {bus.status}
                    </span>

                  </div>
                ))}

              </div>

            </section>

            <section className="section-card">

              <h2>
                🗺️ Live Fleet Map
              </h2>

              <p>
                Current bus locations
              </p>

              <LiveMap />

            </section>

          </>
        )}{/* ================= POTHOLE DETECTION ================= */}

{activePage === "Pothole Detection" && (
  <>
    <h2 className="page-title">
      Pothole Detection
    </h2>

    <section className="section-card">

      <h2>
        🕳️ AI Pothole Detection
      </h2>

      <p>
        Upload a road image to detect potholes using AI.
      </p>

<input
  type="file"
  accept="image/*"
  onChange={async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/pothole-detect",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log("Pothole detection result:", data);

     setDetections(data.detections);
     console.log(data);
const imageUrl = URL.createObjectURL(file);

const img = new Image();

img.onload = () => {
  setImageDimensions({
    width: img.naturalWidth,
    height: img.naturalHeight
  });
};

img.src = imageUrl;
setSelectedImage("http://127.0.0.1:5000/api/pothole-result");

    } catch (error) {
      console.error("Pothole detection error:", error);
      alert("Could not connect to Pothole AI.");
    }
  }}
/>{selectedImage && (
        <div style={{ marginTop: "20px" }}>
          <h3>AI Detection Result</h3>

          <img
            src={selectedImage}
            alt="Pothole detection"
            style={{
              maxWidth: "100%",
              borderRadius: "10px"
            }}
          />

          <h3 style={{ marginTop: "15px" }}>
            Detected Potholes: {detections.length}
          </h3>

          {detections.map((detection, index) => (
            <p key={index}>
              🕳️ Pothole {index + 1} — Confidence:{" "}
              {detection.confidence}%
            </p>
          ))}
        </div>
      )}

    </section>
  </>
)}
{/* ================= CAMERA ================= */}

{activePage === "Camera" && (
  <>
    <h2 className="page-title">
      Camera
    </h2>

    <section className="section-card">

      <h2>
        📷 Live Camera Detection
      </h2>

      <p>
        Use your device camera for live road monitoring.
      </p>

      <div style={{ marginTop: "20px" }}>

        <button
          className="primary-button"
          onClick={async () => {
            try {
              const stream =
                await navigator.mediaDevices.getUserMedia({
                  video: true
                });

              console.log("Camera access granted", stream);

              alert("Camera access granted successfully!");
              setCameraStream(stream);
            } catch (error) {
              console.error("Camera error:", error);
              alert("Camera access was denied or unavailable.");
            }
          }}
        >
          📷 Open Camera
        </button>
        {cameraStream && (
  <video
    autoPlay
    playsInline
    ref={(video) => {
      if (video) {
        video.srcObject = cameraStream;
      }
    }}
    style={{
      width: "100%",
      maxWidth: "600px",
      marginTop: "20px",
      borderRadius: "10px"
    }}
  />
)}
<button
  className="primary-button"
 onClick={() => {
  const video = document.querySelector("video");

  if (!video) {
    alert("Camera is not running.");
    return;
  }

  const canvas = document.createElement("canvas");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext("2d");

  context.drawImage(
    video,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const imageData = canvas.toDataURL("image/jpeg");
  canvas.toBlob(async (blob) => {
  const formData = new FormData();

  formData.append("image", blob, "camera.jpg");
 
  const vehicleResponse = await fetch(
  "http://127.0.0.1:5000/api/vehicle-detect",
  {
    method: "POST",
    body: formData,
  }
);

const vehicleData = await vehicleResponse.json();

console.log("Vehicle Detection:", vehicleData);

alert(
  `Vehicles detected: ${vehicleData.vehicle_count}`
);

  try {
    const response = await fetch(
      "http://127.0.0.1:5000/api/pothole-detect",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log("AI Camera Detection:", data);

    alert(
      `Potholes detected: ${data.detections.length}`
    );
    try{
    const garbageResponse = await fetch(
      "http://127.0.0.1:5000/api/garbage-detect",
      {
        method: "POST",
        body: formData,
      }
    );

    const garbageData = await garbageResponse.json();

    console.log("Garbage Detection:", garbageData);

    if (garbageData.garbage_count > 0) {
      const newGarbageAlert = {
        id: Date.now(),
        type: "GARBAGE",
        message:
          `🗑️ Garbage detected by camera. ` +
          `${garbageData.garbage_count} waste object(s) found.`,
        time: new Date().toLocaleTimeString(),
      };

      setGarbageAlerts((previousAlerts) => [
        newGarbageAlert,
        ...previousAlerts,
      ]);

      alert(
        `🗑️ Garbage detected: ${garbageData.garbage_count}`
      );
    } else {
      alert("✅ No garbage detected.");
    }

  } catch (error) {
    console.error("Garbage AI error:", error);
    alert("Could not connect to Garbage AI.");
  }

  } catch (error) {
    console.error("Camera AI error:", error);
    alert("Could not connect to Pothole AI.");
  }
}, "image/jpeg");

  console.log("Captured camera image:", imageData);

  alert("Camera image captured successfully!");
}}
  style={{ marginTop: "15px" }}
>
  🕳️ Capture & Detect Potholes
</button>

      </div>

    </section>
  </>
)}
      

 

        {/* ================= AI PREDICTION ================= */}

        {activePage === "AI Prediction" && (
          <>
            <h2 className="page-title">
              AI Prediction
            </h2>

            <section className="section-card">

              <h2>
                🤖 AI Demand Prediction
              </h2>

              <p>
                AI-based passenger demand analysis
              </p>

              <div className="prediction-box">

                <span>
                  Predicted passenger demand
                  for next hour
                </span>

                <h1>
                  91 passengers
                </h1>

                <p>
                  Demand Level
                </p>

                <strong className="demand-high">
                  HIGH
                </strong>

                <div className="demand-bar">
                  <div
                    className="demand-progress"
                    style={{ width: "91%" }}
                  ></div>
                </div>

                <p>
                  Demand confidence: <b>91%</b>
                </p>

              </div>

              {/* AI RECOMMENDATION */}

              <div className="recommendation">

                💡

                <h3>
                  AI Recommendation
                </h3>

                <p>
                  Passenger demand is expected
                  to remain high during the next hour.
                </p>

                <strong>
                  ⚠️ Increase fleet capacity on
                  high-demand routes.
                </strong>

              </div>

              {/* ROUTE DEMAND */}

              <h2 style={{ marginTop: "30px" }}>
                📊 Route-wise Demand
              </h2>
<div className="route-demand">

  <div className="demand-route">
    <span>Dilsukhnagar → Mehdipatnam</span>
    <strong>72%</strong>
  </div>

  <div className="demand-route">
    <span>Mehdipatnam → Dilsukhnagar</span>
    <strong>84%</strong>
  </div>

  <div className="demand-route">
    <span>LB Nagar → Secunderabad</span>
    <strong>90%</strong>
  </div>

  <div className="demand-route">
    <span>Kukatpally → Ameerpet</span>
    <strong>76%</strong>
  </div>

  <div className="demand-route">
    <span>Gachibowli → Secunderabad</span>
    <strong>88%</strong>
  </div>

</div>
              
              <div className="peak-warning">

                🔴 <b>Peak Demand Warning</b>

                <p>
                  High passenger demand detected.
                  Additional buses are recommended
                  for selected routes.
                </p>

              </div>

            </section>

          </>
        )}

        {/* ================= ROUTES ================= */}

        {activePage === "Routes" && (
          <>
            <h2 className="page-title">
              Routes
            </h2>

            <section className="section-card">

              <h2>
                🗺️ Transport Routes
              </h2>

              <p>
                Available public transport routes
              </p>

              <div className="route-list">

                {routes.map((item, index) => (
                  <div
                    className="route-card"
                    key={index}
                  >

                    <div className="route-icon">
                      🗺️
                    </div>

                    <div>
                      <h3>
                        {item.route}
                      </h3>

                      <p>
                        Vehicle: {item.vehicle}
                      </p>
                    </div>

                    <span className="badge green">
                      ACTIVE
                    </span>

                  </div>
                ))}

              </div>

           </section>

            {/* SMART ROUTE RECOMMENDATION */}

            <section className="section-card">

              <h2>
                🧠 Smart Route Recommendation
              </h2>

              <p>
                AI recommends the best route using traffic,
                potholes and road conditions.
              </p>

              <button
                className="primary-button"
                onClick={async () => {
                const trafficResponse = await fetch(
                 "http://127.0.0.1:5000/api/traffic"
                );

                 const trafficData = await trafficResponse.json();

                 console.log("Live Traffic Data:", trafficData);
                  const routes = [
               {
                       name: "Dilsukhnagar → Mehdipatnam",
                       traffic: trafficData.congestion_score + 8,
                       potholes: 2,
                        waterlogging: 1
                },
               {
                         name: "LB Nagar → Secunderabad",
                        traffic: trafficData.congestion_score + 15,
                         potholes: 4,
                        waterlogging: 2
                 },
                {
                          name: "Kukatpally → Ameerpet",
                           traffic: trafficData.congestion_score - 5,
                           potholes: 1,
                           waterlogging: 0
                 }
                ];
                  const scoredRoutes = routes.map((route) => {

                    const score =
                      route.traffic +
                      (detections.length * 10) +
                        (route.waterlogging * 15);
                    return {
                      ...route,
                      score
                    };

                  });

                  scoredRoutes.sort(
                    (a, b) => a.score - b.score
                  );

                  alert(
                    `Recommended Route:\n\n${scoredRoutes[0].name}\n\nRoute Score: ${scoredRoutes[0].score}\n\nLower score = better route`
                  );

                }}
              >
                🧠 Find Best Route
              </button>

            </section>

          </>
        )}

        {/* ================= ALERTS ================= */}

        {activePage === "Alerts" && (
          <>
            <h2 className="page-title">
              Alerts
            </h2>

            <section className="section-card">

              <div className="section-header">

                <div>
                  <h2>
                    🔔 AI Transport Alerts
                  </h2>

                  <p>
                    Automatically generated system
                    notifications
                  </p>
                </div>

                <span className="alert-total">
                 {highDemandBuses.length +
                   delayedBuses.length +
                   garbageAlerts.length} Active 
               Alerts
              </span>
              </div>

              {/* AI HIGH DEMAND ALERTS */}

              {highDemandBuses.map((bus) => (
                <div
                  className="alert-card red-alert"
                  key={bus.id}
                >

                  <span className="alert-icon">
                    🔴
                  </span>

                  <div>

                    <h3>
                      High Passenger Demand
                    </h3>

                    <p>
                      {bus.id} on{" "}
                      <strong>
                        {bus.route}
                      </strong>{" "}
                      has {bus.passengers} passengers.
                    </p>

                    <small>
                      🤖 AI Recommendation:
                      Add an additional bus to
                      this route.
                    </small>

                  </div>

                </div>
              ))}

              {/* DELAY ALERTS */}

              {delayedBuses.map((bus) => (
                <div
                  className="alert-card yellow-alert"
                  key={bus.id}
                >

                  <span className="alert-icon">
                    🟡
                  </span>

                  <div>

                    <h3>
                      Bus Delay Detected
                    </h3>

                    <p>
                      {bus.id} on{" "}
                      <strong>
                        {bus.route}
                      </strong>{" "}
                      is currently delayed.
                    </p>

                    <small>
                      🤖 AI Recommendation:
                      Monitor route and adjust
                      fleet scheduling.
                    </small>

                  </div>

                </div>
              ))}
{/* GARBAGE AI ALERTS */}

{garbageAlerts.map((alert) => (
  <div
    className="alert-card yellow-alert"
    key={alert.id}
  >

    <span className="alert-icon">
      🗑️
    </span>

    <div>

      <h3>
        Garbage Detected
      </h3>

      <p>
        {alert.message}
      </p>

      <small>
        🤖 AI Recommendation:
        Schedule cleaning for the detected area.
      </small>

      <small>
        🕒 {alert.time}
      </small>

    </div>

  </div>
))}

              {/* SYSTEM STATUS */}

              <div className="alert-card green-alert">

                <span className="alert-icon">
                  🟢
                </span>

                <div>

                  <h3>
                    System Operational
                  </h3>

                  <p>
                    AI fleet monitoring and
                    prediction services are active.
                  </p>

                  <small>
                    ✅ All monitoring services
                    are running normally.
                  </small>

                </div>

              </div>

            </section>

          </>
        )}
        {activePage === "Fitness & Sports" && (
  <>
    <h2 className="page-title">
      Fitness & Sports
    </h2>

    <section className="section-card">

      <h2>
        🏃 AI Fitness & Safe Route
      </h2>

      <p>
        Live recommendations based on current Hyderabad traffic conditions.
      </p>

      <div className="route-list">

        {/* WALKING */}

        <div className="route-card">
          <div className="route-icon">🚶</div>

          <div>
            <h3>Walking Route</h3>

            <p>
              2.4 km • Approx. 30 min
            </p>

            <small>
              Traffic:{" "}
              {trafficData?.congestion_level || "Loading..."}
            </small>
          </div>

          <span
            className={
              trafficData?.congestion_score < 60
                ? "badge green"
                : "badge red"
            }
          >
            {trafficData?.congestion_score < 60
              ? "SAFE"
              : "CAUTION"}
          </span>
        </div>

        {/* JOGGING */}

        <div className="route-card">
          <div className="route-icon">🏃</div>

          <div>
            <h3>Jogging Route</h3>

            <p>
              3.2 km • Live Traffic Based
            </p>

            <small>
              Traffic Score:{" "}
              {trafficData?.congestion_score ?? "Loading..."}
            </small>
          </div>

          <span
            className={
              trafficData?.congestion_score < 60
                ? "badge green"
                : "badge red"
            }
          >
            {trafficData?.congestion_score < 60
              ? "SAFE"
              : "CAUTION"}
          </span>
        </div>

        {/* CYCLING */}

        <div className="route-card">
          <div className="route-icon">🚴</div>

          <div>
            <h3>Cycling Route</h3>

            <p>
              4.1 km • Live Road Analysis
            </p>

            <small>
              Average Speed:{" "}
              {trafficData?.average_speed ?? "Loading..."} km/h
            </small>
          </div>

          <span
            className={
              trafficData?.congestion_score < 60
                ? "badge green"
                : "badge red"
            }
          >
            {trafficData?.congestion_score < 60
              ? "SAFE"
              : "CAUTION"}
          </span>
        </div>

      </div>

    </section>

    {/* LIVE FITNESS STATUS */}

    <section className="section-card">

      <h2>
        📡 Live Fitness Environment
      </h2>

      <div className="route-list">

        <div className="route-card">
          <div className="route-icon">🚦</div>

          <div>
            <h3>Traffic Condition</h3>

            <p>
              {trafficData?.congestion_level || "Loading..."}
            </p>
          </div>
        </div>

        <div className="route-card">
          <div className="route-icon">🚗</div>

          <div>
            <h3>Vehicles Detected</h3>

            <p>
              {trafficData?.vehicle_count ?? "Loading..."}
              {" "}vehicles
            </p>
          </div>
        </div>

        <div className="route-card">
          <div className="route-icon">⚡</div>

          <div>
            <h3>Traffic Score</h3>

            <p>
              {trafficData?.congestion_score ?? "Loading..."}
              /100
            </p>
          </div>
        </div>

      </div>

    </section>

    {/* SPORTS FACILITIES */}

    <section className="section-card">

      <h2>
        ⚽ Nearby Sports Facilities
      </h2>

      <div className="route-list">

        <div className="route-card">

          <div className="route-icon">
            🌳
          </div>

          <div>
            <h3>Public Park</h3>
            <p>Walking & Jogging</p>
          </div>

        </div>

        <div className="route-card">

          <div className="route-icon">
            🏟️
          </div>

          <div>
            <h3>Sports Ground</h3>
            <p>Outdoor Sports</p>
          </div>

        </div>

      </div>

    </section>

  </>
)}

        {/* FOOTER */}

        <footer>
          SIH26124 • AI-Powered Mobile Urban
          Intelligence Platform Using Public
          Transport Fleet
        </footer>

      </main>

    </div>
  );
}

export default App;