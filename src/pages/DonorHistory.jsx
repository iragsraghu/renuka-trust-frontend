import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import PageHeader from "../components/PageHeader";

function DonorHistory() {

  const { id } = useParams();

  const [history, setHistory] = useState(null);


  useEffect(() => {
    fetchHistory();
  }, []);


  const fetchHistory = async () => {

    try {

      const response = await api.get(
        `/donors/${id}/donations`
      );

      setHistory(response.data);

    } catch(error) {

      console.error(error);

    }

  };


  if (!history) {
    return <h5>Loading...</h5>;
  }


  return (
    <>

      <PageHeader title="Donor Donation History" />


      {/* Donor Details */}

      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <div className="row">

            <div className="col-md-4">
              <h6>Name</h6>
              <p>
                {history.donor.name}
              </p>
            </div>


            <div className="col-md-4">

              <h6>Mobile</h6>

              <p>
                {history.donor.mobile}
              </p>

            </div>


            <div className="col-md-4">

              <h6>Village</h6>

              <p>
                {history.donor.village}
              </p>

            </div>

          </div>

        </div>

      </div>



      {/* Summary */}

      <div className="row mb-4">


        <div className="col-md-6">

          <div className="card shadow-sm">

            <div className="card-body">

              <h6>Total Donations</h6>

              <h2>
                {history.total_donations}
              </h2>

            </div>

          </div>

        </div>



        <div className="col-md-6">

          <div className="card shadow-sm">

            <div className="card-body">

              <h6>Total Amount</h6>

              <h2>
                ₹ {history.total_amount.toLocaleString()}
              </h2>

            </div>

          </div>

        </div>


      </div>




      {/* Donation History Table */}


      <div className="card shadow-sm">


        <div className="card-header">

          <h5>
            Donation Details
          </h5>

        </div>


        <div className="card-body table-responsive">


          <table className="table table-bordered table-hover">


            <thead className="table-light">

              <tr>

                <th>Receipt No</th>

                <th>Amount</th>

                <th>Payment Mode</th>

                <th>Purpose</th>

                <th>Date</th>

                <th>Receipt</th>

              </tr>

            </thead>



            <tbody>


              {
                history.donations.map((donation,index)=>(

                  <tr key={index}>


                    <td>
                      {donation.receipt_number}
                    </td>


                    <td>
                      ₹ {donation.amount.toLocaleString()}
                    </td>


                    <td>
                      {donation.payment_mode}
                    </td>


                    <td>
                      {donation.purpose}
                    </td>


                    <td>

                      {
                        new Date(
                          donation.created_at
                        ).toLocaleDateString()
                      }

                    </td>


                    <td>

                      <a
                        href={
                          `http://localhost:8080/receipts/${donation.receipt_number}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-success btn-sm"
                      >
                        PDF
                      </a>

                    </td>


                  </tr>

                ))
              }


            </tbody>


          </table>


        </div>


      </div>


    </>
  );
}


export default DonorHistory;