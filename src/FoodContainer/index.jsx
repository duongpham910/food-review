import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap';
import ReviewForm from './ReviewForm'

class FoodContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render(){
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={2}>
            </Col>
            <Col md={8}>
              <ReviewForm />
            </Col>
            <Col md={2}>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default FoodContainer
