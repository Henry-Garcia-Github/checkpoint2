import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cupcake from "../components/Cupcake";

export default function CupcakeList() {
  // Step 1: get all cupcakes
  const urlCupcake = "http://localhost:4000/cupcakes";
  const urlAccessories = "http://localhost:4000/accessories";
  const [cupcakes, setCupcakes] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [accessorieSelected, setAccessorieSelected] = useState("");
  useEffect(() => {
    axios.get(urlCupcake).then((response) => setCupcakes(response.data));
    // Step 3: get all accessories
    axios.get(urlAccessories).then((response) => setAccessories(response.data));
  }, []);
  const handleSelectChange = (event) => {
    setAccessorieSelected(event.target.value);
  };
  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select id="cupcake-select" onChange={handleSelectChange}>
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
            {accessories.map((accessorie) => (
              <option key={accessorie.id} value={accessorie.id}>
                {accessorie.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {cupcakes &&
          cupcakes
            .filter(
              (cupcake) =>
                !accessorieSelected ||
                cupcake.accessory_id === accessorieSelected
            )
            .map((cupcake) => (
              <Link to={`/cupcakes/${cupcake.id}`}>
                <li className="cupcake-item" key={cupcake.id}>
                  <Cupcake cupcake={cupcake} />
                </li>
              </Link>
            ))}
        {/* end of block */}
      </ul>
    </>
  );
}
