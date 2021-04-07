import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MapMarkers from './source/MapMarkers'

function App() {
  return (
    <div>
    <BrowserRouter>
    <Switch>
    <Route exact path={"/"} component={MapMarkers} />
    <MapMarkers/>
    </Switch>
    </BrowserRouter>
    </div>
  )
  
  
}

export default App;
