import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total_villages: 0,
    total_donors: 0,
    total_donations: 0,
    total_collection: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Total Villages</h6>
              <h2>{stats.total_villages}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Total Donors</h6>
              <h2>{stats.total_donors}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Total Donations</h6>
              <h2>{stats.total_donations}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Total Collection</h6>
              <h2>
                ₹ {stats.total_collection?.toLocaleString()}
              </h2>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Dashboard;