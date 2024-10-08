// src/pages/HomePage.tsx
import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { useGetProductsQuery } from "../hooks/productHooks";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <Helmet>
        <title>TS HomeLine</title>
      </Helmet>

      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">
          {getError(error as unknown as ApiError)}
        </MessageBox>
      ) : (
        <Row className="product-row">
          {products!.map((product) => (
            <Col
              key={product.slug}
              sm={6}
              md={4}
              lg={3}
              className="product-col"
            >
              <ProductItem product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
