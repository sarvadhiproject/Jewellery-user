import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Animated } from "react-animated-css";
import FormWebsiteReview from "./Form";

class WebsiteReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgSendSuccess: false,
    };
  }

  handleSubmit = () => {
    this.setState({ msgSendSuccess: true });
    setTimeout(() => {
      this.setState({ msgSendSuccess: false });
    }, 5000);
  };

  render() {
    return (
      <React.Fragment>
        <section className="section" id="contact" style={{ paddingTop: '0px' }}>
          <Container>
            <Row>
              <Col sm="12">
                <div
                  className="title-box text-center"
                  style={{ fontFamily: 'Nunito Sans sans-serif', color: '#832729' }}
                >
                  <h1>Share Your Thoughts with Us</h1>
                  <h4 style={{ fontWeight: '500' }}>
                    Your feedback helps us improve and provide better experiences for everyone.
                  </h4>
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
                          <h3>Review Sent Successfully.</h3>
                          <p>Thank you for your review.</p>
                        </div>
                      </fieldset>
                    </Animated>
                  )}
                </div>
                <FormWebsiteReview handleSubmit={this.handleSubmit} />
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default WebsiteReview;