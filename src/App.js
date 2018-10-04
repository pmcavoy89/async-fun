import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios';

class App extends Component {
  state = {
    imgSrc: null,
  }
  
  callbackExample() {
    console.log('Before timeout.');
  
    setTimeout((e) => {
      console.log('Executing timeout callback.');
    }, 0);
  
    console.log('After timeout.');
  };
  
  getByPromise(){
    console.log('Calling promise.');
    
    // Note: Source URL
    axios.get('https://raw.githubusercontent.com/LearnWebCode/json-example/master/pet-of-the-day.jso')
      .then(this.updateImageSource)
      .catch(this.failedImage);
      
    console.log('Done with getByPromise.');
  }
  
  updateImageSource({ data }) {
    console.log('Updating image source.');
    
    this.setState({
      imgSrc: data.photo,
    });
    
    console.log('Done updating image source. But not really, why?');
  }
  
  failedImage(error) {
    console.log('error = ', error);
  }
  
  async getByAsyncAwait() {
    console.log('Calling by awaiting.');
    
    const result = await axios.get('https://raw.githubusercontent.com/LearnWebCode/json-example/master/pet-of-the-day.json');
    this.updateImageSource(result);

    console.log('Done with awaiting.');
  }
  
  render() {
    // Are we missing something?

    return (
      <div className="App">
      <Container>
        <Row>
        <Col>
          <Button color="primary" onClick={this.callbackExample}>Callback Example</Button>
        </Col>
        <Col>
          <Button color="secondary" onClick={this.getByPromise}>Get By Promise</Button>
        </Col>
        <Col>
          <Button color="info" onClick={this.getByAsyncAwait.bind(this)}>Get By Async Await</Button>
        </Col>
        </Row>
        <Row>
          <Col>
            <img src={this.state.imgSrc} alt="No Image Yet" />
          </Col>
        </Row>
      </Container>
        
      </div>
    );
  }
}

export default App;
