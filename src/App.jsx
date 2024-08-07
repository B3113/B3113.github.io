import { useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price)

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code)

    const newItem = {
      item: item.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      discount: discountRef.current.value,
    };

    setDataItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (v) => v.item === newItem.item && v.ppu === newItem.ppu
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].qty = parseInt(updatedItems[existingItemIndex].qty) + parseInt(newItem.qty);
        updatedItems[existingItemIndex].discount = parseInt(updatedItems[existingItemIndex].discount) + parseInt(newItem.discount);
        return updatedItems;
      }

      return [...prevItems, newItem];
    });
  };

  const clearDataItems = () => {
    setDataItems([]);
  }

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  }

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code)
    setPpu(item.price)
  }

  return (
    <Container style={{ padding: "50px" }}>
      <Row>
        <Col md={4} style={{
          backgroundColor: "#F7EEE4", borderRadius: "10px", padding: "10px"
        }}>
          <Row>
            <Col>
              Item
              <Form.Select ref={itemRef} onChange={productChange}>
                {
                  products.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))
                }
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control type="number" ref={ppuRef} value={ppu} onChange={e => setPpu(ppuRef.current.value)} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} defaultValue={1} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" ref={discountRef} defaultValue={0} />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem} style={{ backgroundColor: "#F0BDB4", borderRadius: "10px" }}>
              Add
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            deleteByIndex={deleteByIndex} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;


