import React,{ Component} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageize = 9
  state={progress:0}
  // apikey = process.env.REACT_APP_NEWS_API ;

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <Router>
            <Navbar/>
            <LoadingBar
              height= {3}
              color='#f11946'
              progress={this.state.progress}
              // onLoaderFinished={() => setProgress(0)}
            />
              <Switch>
                <Route exact path="/general"><News setProgress =  {this.setProgress}  key="general" pageSize= {this.pagesize} country= "in" category="general"/></Route>
                <Route exact path="/business"><News setProgress =  {this.setProgress} key="business" pageSize= {this.pagesize} country= "in" category="business"/></Route>
                <Route exact path="/sports"> <News setProgress =  {this.setProgress}  key="sports"  pageSize= {this.pagesize} country= "in" category="sports"/></Route>
                <Route exact path="/health"> <News setProgress =  {this.setProgress}  key="health"  pageSize= {this.pagesize} country= "in" category="health"/></Route>
                <Route exact path="/science"><News setProgress =  {this.setProgress} key="science" pageSize= {this.pagesize} country= "in" category="science"/></Route>
                <Route exact path="/technology"><News setProgress =  {this.setProgress}  key="technology" pageSize= {this.pagesize} country= "in" category="technology"/></Route>
                <Route exact path="/entertainment"><News setProgress =  {this.setProgress} key="entertainment" pageSize= {this.pagesize} country= "in" category="entertainment"/></Route>
              </Switch>
        </Router>
      </div>
    )
  }
}

