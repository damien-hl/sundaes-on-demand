import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    const currentValue = event.target.value;

    const currentValueFloat = parseFloat(currentValue);

    const valueIsValid =
      0 <= currentValueFloat &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === currentValueFloat;

    setIsValid(valueIsValid);

    // Only update the count if the value is valid
    if (valueIsValid) {
      updateItemCount(name, currentValue);
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            isInvalid={!isValid}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
