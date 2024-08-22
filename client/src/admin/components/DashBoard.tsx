import { useState } from "react";
import { Button } from "react-bootstrap";
import AddProductForm from "../../components/AddProductForm";

function DashBoard() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  return (
    <div>
      {" "}
      <Button onClick={() => setShowAddProduct(!showAddProduct)}>
        {showAddProduct ? "Cancel" : "Add New Product"}
      </Button>
      {showAddProduct && <AddProductForm />}{" "}
    </div>
  );
}

export default DashBoard;
