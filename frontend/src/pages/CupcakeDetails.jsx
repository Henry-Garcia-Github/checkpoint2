import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cupcake from "../components/Cupcake";

function CupcakeDetails() {
  const [cupCakeSelected, setCupcakeSelected] = useState([]);
  const { id } = useParams();
  const CupcakeID = `http://localhost:4000/cupcakes/${id}`;
  useEffect(() => {
    axios.get(CupcakeID).then((response) => setCupcakeSelected(response.data));
  }, []);

  return (
    <div>
      <Cupcake cupcake={cupCakeSelected} />
    </div>
  );
}

export default CupcakeDetails;
