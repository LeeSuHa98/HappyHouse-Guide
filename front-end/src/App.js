import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MapMarkers from './source/MapMarkers'
import communities from './source/communities'
import Reviews from './source/reviewTest'
import Menubar from './source/Menubar';
import SearchBar from './source/SearchBar'
import './App.css'

function App() {
  return (
    <div className = "App">
      <div className = "header_container">
        <Menubar/>
      </div>

      <div className = "body_container">
        <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={MapMarkers} />
          <Route path={"/reviews"} component={Reviews} />
          <Route path={"/communities"} component={communities} />
        </Switch>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App;
