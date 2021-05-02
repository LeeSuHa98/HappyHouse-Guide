import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MapMarkers from './source/MapMarkers'
import Communities from './source/communities'
import Reviews from './source/reviews'
import Header from './source/Header';

function App() {
  return (
    <div>
      <Header/>
      <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={MapMarkers} />
        <Route path={"/communities"} component={Communities} />
        <Route path={"/reviews"} component={Reviews} />
      </Switch>
      </BrowserRouter>
    </div>
  )
  
  
}

export default App;
