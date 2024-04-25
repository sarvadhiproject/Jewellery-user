import React from "react";
import { Button, Input, Form, FormFeedback, FormGroup,Row, Col } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

const FormContact = ({ handleSubmit }) => {
  const validation = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please Enter Your Email"),
    }),
    onSubmit: (values) => {
      handleSubmit(values.email);
    },
  });

  return (
    <React.Fragment>
      <Form onSubmit={validation.handleSubmit}>
        <FormGroup>
          <Row style={{ alignItems:'center'}}>
            <Col xs={5}>
              <Input type="text" name="name" id="name" placeholder="Your Name.." />
            </Col>
            <Col xs={5}>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Your email..."
                value={validation.values.email}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={validation.touched.email && !!validation.errors.email}
              />
              {validation.touched.email && validation.errors.email && (
                <FormFeedback>{validation.errors.email}</FormFeedback>
              )}
            </Col>
            <Col>
              <Button type="submit" className="sign-button">Sign Up</Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </React.Fragment>
  );
};

export default FormContact;
