import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Donors() {
  const [villages, setVillages] = useState([]);
  const [donors, setDonors] = useState([]);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    village_id: "",
  });

  useEffect(() => {
    fetchVillages();
    fetchDonors();
  }, []);

  const fetchVillages = async () => {
    try {
      const response = await api.get("/villages");
      setVillages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDonors = async () => {
    try {
      const response = await api.get("/donors");
      setDonors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/donors", {
        name: form.name,
        mobile: form.mobile,
        address: form.address,
        village_id: Number(form.village_id),
      });

      setForm({
        name: "",
        mobile: "",
        address: "",
        village_id: "",
      });

      fetchDonors();

      alert("Donor added successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add donor");
    }
  };

  return (
    <>
      <h2 className="mb-4">Donors</h2>

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h5>Add Donor</h5>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Name</label>

                <input
                  className="form-control"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Mobile</label>

                <input
                  className="form-control"
                  value={form.mobile}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      mobile: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Village</label>

                <select
                  className="form-select"
                  value={form.village_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      village_id: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">
                    Select Village
                  </option>

                  {villages.map((village) => (
                    <option
                      key={village.id}
                      value={village.id}
                    >
                      {village.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label>Address</label>

                <input
                  className="form-control"
                  value={form.address}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: e.target.value,
                    })
                  }
                />
              </div>

            </div>

            <button
              className="btn btn-primary"
              type="submit"
            >
              Save Donor
            </button>

          </form>

        </div>
      </div>

      <div className="card shadow-sm">

        <div className="card-header">
          <h5>Donor List</h5>
        </div>

        <div className="card-body">

          <table className="table table-bordered">

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Village</th>
              </tr>
            </thead>

            <tbody>
              {donors.map((donor) => (
                <tr key={donor.id}>
                  <td>{donor.id}</td>
                  <td>{donor.name}</td>
                  <td>{donor.mobile}</td>
                  <td>
                    {donor.village?.name}
                  </td>
                  <td>
                    <Link to={`/donors/${donor.id}/history`} className="btn btn-primary btn-sm">
                        History
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

export default Donors;