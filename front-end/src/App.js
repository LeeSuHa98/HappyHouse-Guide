import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MapMarkers from './source/MapMarkers'
import communities from './source/communities'
import Reviews from './source/reviewTest'
import Menubar from './source/Menubar';
import ReadCommunity from './source/ReadCommunity'
import ReplyCommunity from './source/ReplyCommunity'
import CreateReview from './source/CreateReview';
import ReadReview from './source/ReadReview'
import HappyChatbot from './source/Chatbot'
import './App.css'
import './source/css/SearchBar.css';
import './source/css/Menubar.css';
import './source/css/Sidebar.css';

function App() {
    
  return (
    <div className = "App">
      
      <div className = "header_container">
        <Menubar/>
      </div>

      <div className = "body_container">
        <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={MapMarkers}/>
          <Route exact path={"/reviews"} component={Reviews} />
          <Route exact path={"/communities"} component={communities} />
          <Route exact path={"/communities/reply"} component={ReplyCommunity} />
          <Route exact path={"/communities/detail"} component={ReadCommunity} />
          <Route exact path={"/reviews/detail"} component={ReadReview} />
          <Route exact path={"/reviews/create"} component={CreateReview} />
        </Switch>
        </BrowserRouter>
        <HappyChatbot/>
      </div>
    </div>
  )
}

export default App;
