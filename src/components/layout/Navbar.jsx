import "../../styles/layout.css";
import {Link} from "react-router-dom";
function Navbar(){
    return(
        <nav className="navbar">
            <h2>finly.</h2>

            <div>
                <Link to="/home">Home</Link>
                <Link to="/transactions">Transactions</Link>
                <Link to="/budget">Budget</Link>
                <Link to="/analytics">Analytics</Link>
            </div>

        </nav>
    );
}
export default Navbar