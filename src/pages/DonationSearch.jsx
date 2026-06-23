import { useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";

function DonationSearch() {
  const [search, setSearch] = useState("");
  const [donations, setDonations] = useState([]);

  const handleSearch = async () => {
    if (!search) return;

    try {
      const response = await api.get(
        `/donations/search?name=${search}`
      );

      setDonations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setDonations([]);
  };

  return (
    <>
      <PageHeader title="Donation Search" />

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row">

            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Search by donor name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <button
                className="btn btn-primary me-2"
                onClick={handleSearch}
              >
                Search
              </button>

              <button
                className="btn btn-secondary"
                onClick={clearSearch}
              >
                Clear
              </button>
            </div>

          </div>
        </div>
      </div>

      {donations.length > 0 && (
        <div className="card shadow-sm">
          <div className="card-header">
            <h5>Search Results</h5>
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

                    <td>{donation.donor?.name}</td>

                    <td>{donation.donor?.village?.name}</td>

                    <td>
                      ₹ {Number(
                        donation.amount
                      ).toLocaleString()}
                    </td>

                    <td>{donation.payment_mode}</td>

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
                        PDF
                      </a>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default DonationSearch;