import { useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://offers-api.digistos.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({ type: "success", message: "Inscription réussie" });
        console.log("Form submitted:", formData);

        setTimeout(() => {
          navigate("/connexion");
        }, 1500);
      } else {
        const errorMessage = data.message || "Une erreur est survenue.";
        setAlert({ type: "warning", message: errorMessage });
        console.log("Form submitted:", formData);
      }
    } catch (err) {
      console.error("Erreur:", err);
      setAlert({ type: "danger", message: "Erreur. Veuillez réessayer." });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow-lg">
            <h1 className="text-center mb-4">Créer un compte</h1>

            {alert.message && (
              <div className={`alert alert-${alert.type}`}>
                {alert.message}
              </div>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                S'inscrire
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
