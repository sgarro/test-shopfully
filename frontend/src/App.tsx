import React, {useState, useContext} from 'react';
import './App.css';
import FlyersContainer from './components/FlyersContainer';
import FavouritesSidebar from './components/sidebar';
import  {Icon, Header, Container}  from 'semantic-ui-react'
import { Store } from './context/context-flyers';


const App: React.FC = () => {
  const globalState = useContext(Store);
  const {flyers} = globalState.state 
  const [visible, setVisible] = useState(false)
   
  const toggleVisible = () => setVisible(!visible);
  return (
    <div className="App">
      <Header as='h2' block>
        <span style={{float: "left"}}>
        <Icon name='bars' onClick={()=>toggleVisible()} />

        </span>
     Shopfully
        
      </Header>
      <FavouritesSidebar
        visible={visible} 
        setVisible={setVisible}
        flyers={flyers.favourites}
        />
      <Container>
      <FlyersContainer />
      </Container>
    </div>
  );
}

export default App