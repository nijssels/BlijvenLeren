import React, { Component } from 'react';
import { Container } from 'reactstrap'; 
import { LeerResourceList } from './components/LeerResourceList';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Container>
        <LeerResourceList/>
       </Container>
    );
  }
}
