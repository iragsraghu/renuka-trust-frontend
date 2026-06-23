import { useEffect, useState } from "react";
import api from "../services/api";
import PageHeader from "../components/PageHeader";

function Reports() {

  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);


  const fetchReports = async () => {
    try {
      const response = await api.get("/reports/villages");
      setReports(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const totalCollection = reports.reduce(
    (sum, item) => sum + item.total_collection,
    0
  );


  const totalVillages = reports.length;


  const totalDonors = reports.reduce(
    (sum, item) => sum + item.total_donors,
    0
  );


  return (
    <>

      <PageHeader title="Village Collection Reports" />


      {/* Summary Cards */}

      <div className="row mb-4">


        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Total Villages</h6>
              <h3>{totalVillages}</h3>
            </div>
          </div>
        </div>


        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Total Donors</h6>
              <h3>{totalDonors}</h3>
            </div>
          </div>
        </div>


        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6>Total Collection</h6>
              <h3>
                ₹ {totalCollection.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>


      </div>



      {/* Report Table */}

      <div className="card shadow-sm">

        <div className="card-header">
          <h5>
            Village Wise Collection
          </h5>
        </div>


        <div className="card-body table-responsive">


          <table className="table table-bordered table-hover">


            <thead className="table-light">

              <tr>
                <th>#</th>
                <th>Village</th>
                <th>Total Donors</th>
                <th>Total Collection</th>
              </tr>

            </thead>


            <tbody>


              {reports.map((report, index) => (

                <tr key={report.village_id}>

                  <td>
                    {index + 1}
                  </td>


                  <td>
                    {report.village_name}
                  </td>


                  <td>
                    {report.total_donors}
                  </td>


                  <td>
                    ₹ {report.total_collection.toLocaleString()}
                  </td>


                </tr>

              ))}


              <tr className="fw-bold">

                <td colSpan="3">
                  Grand Total
                </td>

                <td>
                  ₹ {totalCollection.toLocaleString()}
                </td>

              </tr>


            </tbody>


          </table>


        </div>

      </div>


    </>
  );
}


export default Reports;