import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import ReactDOM from 'react-dom';
import { Container, Footer, Row, Col, Navbar } from 'react-materialize';

import { ToDo } from './components/ToDo';

import 'antd/dist/antd.css'
import './index.css';



const App = () => {
  return (
    <Container>
      <Container>
        <Row>
          <Col>
            <ToDo />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));