import React, {useState, useContext} from 'react';
import './App.css';
import FlyersContainer from './components/FlyersContainer';
import FavouritesSidebar from './components/sidebar';
import  {Icon, Header, Container}  from 'semantic-ui-react'
import { Store } from './context/context-flyers';


const App: React.FC = () => {
  // i'm used to work with redux as a state management and Reacts HOC components, however i took advantage of this test 
  // to experiment a bit more with new React hooks to have a simpler code as it is a best-practice
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