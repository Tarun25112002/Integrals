import { Outlet } from "react-router-dom";
import Navbar from "../../components/educator/Navbar";
const Educator = () => {
  return (
    <div>
     <Navbar/>
      <div>
        <Outlet />
      </div>
      <h1>Footer</h1>
    </div>
  );
};

export default Educator;
