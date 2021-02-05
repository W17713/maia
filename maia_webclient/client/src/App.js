import React,{ Component } from "react";


class App extends Component{
  constructor(props){
    super(props);
    this.state={response:''}
  }

  fetchPage(){
    fetch('http://localhost:3000/home')
    .then(res => res.text())
    .then(res => this.setState({response:res}))
    .catch(err => err);
  }
  componentDidMount(){
    this.fetchPage();
  }

  render(){
    return (
      <div>{this.state.response}</div>
    );
  }
}

export default App;
