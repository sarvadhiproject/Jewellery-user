import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Animated } from "react-animated-css";
import FormContact from "./Form";

class GetInTouch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      msgSendSuccess: false,
    };
  }

  handleSubmit = () => {
    let emailPattern = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

    if (this.state.email !== "" && emailPattern.test(this.state.email)) {
      this.setState({ msgSendSuccess: true });

      setTimeout(() => {
        this.setState({ email: "", msgSendSuccess: false });
      }, 5000);
    }
  };

  onInputChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <React.Fragment>
        <section className="section" id="contact" style={{paddingTop:'0px'}}>
          <Container>
            <Row>
              <Col sm="12">
                <div className="title-box text-center" style={{fontFamily:'Nunito Sans sans-serif', color:'#832729'}}>
                  <h1>Shine Brighter Than Ever</h1>
                  <h4 style={{fontWeight:'500'}}>Be First in Line for Exclusive Offers & Dazzling New Jewelry Designs!</h4>
                </div>
              </Col>
            </Row>

            
            <Row>
              <Col sm="12">
                <div id="message">
                  {this.state.msgSendSuccess && (
                    <Animated
                      animationIn="bounceInLeft"
                      animationOut="zoomOutDown"
                      animationInDuration={1000}
                      animationOutDuration={1000}
                      isVisible={true}
                    >
                      <fieldset>
                        <div id="success_page">
                          <h3>Email Sent Successfully.</h3>
                          <p>
                            Thank you for your message.
                          </p>
                        </div>
                      </fieldset>
                    </Animated>
                  )}
                </div>
                <FormContact
                  email={this.state.email}
                  onInputChange={this.onInputChangeHandler}
                  handleSubmit={this.handleSubmit}
                />
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default GetInTouch;
