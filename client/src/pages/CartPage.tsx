import { useContext } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";

export default function CartPage() {
  const navigate = useNavigate();

  const {
    state: {
      mode,
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const updateCartHandler = (item: CartItem, countInStock: number) => {
    if (item.countInStock < countInStock) {
      toast.warn("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, countInStock },
    });
  };
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item: CartItem) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={5}>
                      <img
                        src={item.url}
                        alt={item.name}
                        className="img-fluid rounded thumbnail"
                      ></img>{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.countInStock - 1)
                        }
                        variant={mode}
                        disabled={item.countInStock === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.countInStock}</span>
                      <Button
                        variant={mode}
                        onClick={() =>
                          updateCartHandler(item, item.countInStock + 1)
                        }
                        disabled={item.countInStock === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant={mode}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal (
                    {cartItems.reduce((a, c) => a + c.countInStock, 0)} items) :
                    $
                    {cartItems.reduce(
                      (a, c) => a + c.price * c.countInStock,
                      0
                    )}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
