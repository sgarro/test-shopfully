import React, {useEffect, useContext} from 'react'
import { Grid } from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Flyer from './Flyer';
import { Store } from '../context/context-flyers';
import { FETCHING_FLYERS, STACK_FLYERS, FETCHING_FLYERS_ERROR, ADVANCE_PAGE } from '../context/action_types';

const FlyersContainer: React.FC = () => {
  const globalState = useContext(Store);
  const {pager, flyers} = globalState.state 
  const {pagerDispatch, flyersDispatch} = globalState.dispatch 

  
  
  // whenever a page is incremented, i'll fetch new flyers
  // a better solution would be moving the api call for fetching data to a reducer
  useEffect(() => {
    flyersDispatch({ type: FETCHING_FLYERS, fetching: true })
    fetch(`https://dsbuqiyu7a.execute-api.us-east-1.amazonaws.com/dev/api/flyers?page=${pager.page}&limit=${pager.limit}`)
      .then(data => data.json())
      .then(flyers => {
        flyersDispatch({ type: STACK_FLYERS, flyers })
        flyersDispatch({ type: FETCHING_FLYERS, fetching: false })
      })
      .catch(e => {
        // handle error
        flyersDispatch({ type: FETCHING_FLYERS_ERROR, fetching: false })
        return e
      })
  }, [flyersDispatch, pager ])
  // filtering published flyers
  const toDisply = flyers.flyers.filter(filter => filter.is_published > 0)
  // using infiniteScroll to call the page reducer
  return (<React.Fragment>
    { 
      flyers.error ? "Ops, qualcosa é andato storto"
      :
      flyers.flyers.length === 0 ?
      "Nessun Flyer disponibile"
      :
      <InfiniteScroll
      dataLength = {toDisply.length}
      next={() => {pagerDispatch({ type: ADVANCE_PAGE })}}
      hasMore={true || false}
      loader={<div className="loader" key={0}>Loading ...</div>}
      >
      <Grid>
        {toDisply.map(flyer => {
         return(<Flyer flyer={flyer} key={flyer.id}/>)
        })}
      </Grid>
      </InfiniteScroll>
      
    }
   </React.Fragment>
  )
}

export default FlyersContainer