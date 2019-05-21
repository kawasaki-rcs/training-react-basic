import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component
{
  constructor (props) {
    super(props);
    this.state = {
      tmp: "",
      text: "",
    };
  }

  //handleChange = e => this.setState({ tmp: e.target.value, });
  handleChange = ({ target: { value } }) => this.setState({ tmp: value, });

  handleSubmit = e => {
    const { text, tmp } = this.state;
    this.setState({
      text: text + ' ' + tmp,
      tmp: "",
    });
  }

  render () {
    const { text, tmp } = this.state;
    return (
      <div className="App">
      Hello World !!
      {/** ここにコードを追記していく */}
        <div>
          <input type="text" value={tmp} onChange={this.handleChange} />
          <button type="button" onClick={this.handleSubmit} >送信</button>
        </div>
        <h1>{text}</h1>
      </div>
    );
  }
}

export default App;
