import React, { useReducer, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import apiClient from "../apiClient";
// import { Product } from "../types/Product";

// type FormState = Omit<Product, "_id" | "rating" | "numReviews">;

// type FormAction = {
//   field: keyof FormState;
//   value: string | number;
// };

// const initialState: FormState = {
//   name: "",
//   slug: "",
//   url: "",
//   category: "",
//   price: 0,
//   countInStock: 0,
//   description: "",
//   color: "",
//   style: "",
// };

// function reducer(state: FormState, action: FormAction): FormState {
//   return { ...state, [action.field]: action.value };
// }

export default function AddProductForm() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value =
  //     e.target.type === "number" ? Number(e.target.value) : e.target.value;
  //   dispatch({ field: e.target.name as keyof FormState, value });
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (
  //     Object.values(state).some((value) => value === "" || value === undefined)
  //   ) {
  //     alert("Please fill in all fields.");
  //     return;
  //   }

  //   try {
  //     const newProduct: Omit<Product, "_id" | "rating" | "numReviews"> = {
  //       ...state,
  //     };
  //     await apiClient.post<Product>("/api/products", newProduct);
  //     alert("Product added successfully");
  //   } catch (error) {
  //     console.error("Failed to add product:", error);
  //     alert("Error adding product");
  //   }
  // };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        try {
          let products = JSON.parse(content);

          // Ensure products is always an array
          if (!Array.isArray(products)) {
            products = [products];
          }

          // Validate and transform products
          const validProducts = products.map((product) => {
            if (typeof product !== "object" || product === null) {
              throw new Error("Invalid product object");
            }

            // Ensure required fields are present
            if (
              !product.name ||
              !product.slug ||
              !product.url ||
              !product.style
            ) {
              throw new Error(
                "Missing required fields: name, slug, url, or style"
              );
            }

            // Transform price to number if it's a string
            if (typeof product.price === "string") {
              product.price = parseFloat(
                product.price.replace(/[^0-9.-]+/g, "")
              );
            }

            // Set default values for required fields if they're missing
            return {
              ...product,
              category: product.category || "Uncategorized",
              description: product.description || "No description provided",
              color: product.color || "N/A",
              price: product.price || 0,
              countInStock: product.countInStock || 0,
            };
          });

          console.log("Sending products:", validProducts);

          const response = await apiClient.post<{
            message: string;
            count: number;
          }>("/api/products/bulk", validProducts);

          alert(
            `Success: ${response.data.message}. Added ${response.data.count} products.`
          );
        } catch (error) {
          console.error("Failed to add products:", error);
          if (error.response) {
            console.error("Error response:", error.response.data);
            alert(
              `Error: ${
                error.response.data.message || "Unknown server error"
              }. ${error.response.data.error || ""}`
            );
          } else if (error.request) {
            console.error("Error request:", error.request);
            alert(
              "Error: No response from server. Please check your connection."
            );
          } else {
            console.error("Error message:", error.message);
            alert(`Error: ${error.message || "Unknown error occurred"}`);
          }
        }
      };
      reader.readAsText(file);
    }
  };
  const handleBulkUploadClick = () => {
    fileInputRef.current?.click();
  };

  // const createFormField = (
  //   id: keyof FormState,
  //   label: string,
  //   value: string | number | undefined,
  //   type: string = "text"
  // ) => (
  //   <Form.Group controlId={id} key={id}>
  //     <Form.Label>{label}</Form.Label>
  //     <Form.Control
  //       type={type}
  //       name={id}
  //       placeholder={`Enter ${label.toLowerCase()}`}
  //       value={value ?? ""}
  //       onChange={handleChange}
  //       required
  //     />
  //   </Form.Group>
  // );

  // const formFields: Array<{
  //   id: keyof FormState;
  //   label: string;
  //   type?: string;
  // }> = [
  //   { id: "name", label: "Name" },
  //   { id: "slug", label: "Slug" },
  //   { id: "url", label: "Image URL" },
  //   { id: "category", label: "Category" },
  //   { id: "description", label: "Description" },
  //   { id: "price", label: "Price", type: "number" },
  //   { id: "countInStock", label: "Count in Stock", type: "number" },
  //   { id: "color", label: "Color" },
  //   { id: "style", label: "Style" },
  // ];

  return (
    // <Form onSubmit={handleSubmit}>
    //   {formFields.map((field) =>
    //     createFormField(field.id, field.label, state[field.id], field.type)
    //   )}

    //   <Button variant="primary" type="submit">
    //     Add Product
    //   </Button>
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
        accept=".json"
      />
      <Button
        variant="secondary"
        onClick={handleBulkUploadClick}
        style={{ marginLeft: "10px" }}
      >
        Bulk Upload from JSON
      </Button>
    </>
    // </Form>
  );
}
