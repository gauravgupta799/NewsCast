import React,{ Component} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';

class App extends React.Component {
  c = "Gaurav";
  render() {
    return (
      <>
        <Navbar/>
        <News pageSize= {6}/>
      </>
    )
  }
}
export default App;

