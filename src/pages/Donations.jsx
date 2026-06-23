import { useEffect, useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";

function Donations() {
  const [donors, setDonors] = useState([]);
  const [donations, setDonations] = useState([]);

  const [form, setForm] = useState({
    donor_id: "",
    amount: "",
    payment_mode: "Cash",
    purpose: "Temple Donation",
  });

  useEffect(() => {
    fetchDonors();
    fetchDonations();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await api.get("/donors");
      setDonors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDonations = async () => {
    try {
      const response = await api.get("/donations");
      setDonations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/donations", {
        donor_id: Number(form.donor_id),
        amount: Number(form.amount),
        payment_mode: form.payment_mode,
        purpose: form.purpose,
      });

      setForm({
        donor_id: "",
        amount: "",
        payment_mode: "Cash",
        purpose: "Temple Donation",
      });

      fetchDonations();

      alert("Donation added successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to create donation");
    }
  };

  return (
    <>
      <PageHeader title="Donations" />

      {/* Donation Form */}

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h5>Create Donation</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Donor</label>

                <select
                  className="form-select"
                  value={form.donor_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      donor_id: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">
                    Select Donor
                  </option>

                  {donors.map((donor) => (
                    <option
                      key={donor.id}
                      value={donor.id}
                    >
                      {donor.name} - {donor.village?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label>Amount</label>

                <input
                  type="number"
                  className="form-control"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      amount: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Payment Mode</label>

                <select
                  className="form-select"
                  value={form.payment_mode}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      payment_mode: e.target.value,
                    })
                  }
                >
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>PhonePe</option>
                  <option>Google Pay</option>
                  <option>Bank Transfer</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label>Purpose</label>

                <input
                  className="form-control"
                  value={form.purpose}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      purpose: e.target.value,
                    })
                  }
                />
              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Donation
            </button>

          </form>
        </div>
      </div>

      {/* Donations Table */}

      <div className="card shadow-sm">
        <div className="card-header">
          <h5>Recent Donations</h5>
        </div>

        <div className="card-body table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-light">
              <tr>
                <th>Receipt No</th>
                <th>Donor</th>
                <th>Village</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Receipt</th>
              </tr>
            </thead>

            <tbody>

              {donations.map((donation) => (
                <tr key={donation.id}>

                  <td>{donation.receipt_number}</td>

                  <td>
                    {donation.donor?.name}
                  </td>

                  <td>
                    {donation.donor?.village?.name}
                  </td>

                  <td>
                    ₹ {Number(donation.amount).toLocaleString()}
                  </td>

                  <td>
                    {donation.payment_mode}
                  </td>

                  <td>
                    {new Date(
                      donation.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <a
                      href={`http://localhost:8080/receipts/${donation.receipt_number}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-success btn-sm"
                    >
                      Download
                    </a>
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

export default Donations;