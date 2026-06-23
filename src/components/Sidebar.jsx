import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
      <h4>Renuka Trust</h4>

      <hr />

      <ul className="nav flex-column">

        <li className="nav-item">
          <Link className="nav-link text-white" to="/">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/donors">
            Donors
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/donations">
            Donations
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/reports">
            Reports
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/receipts">
            Receipts
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;