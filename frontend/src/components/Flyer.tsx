import React, { useContext } from "react";
import { Grid, Card, Icon } from "semantic-ui-react";
import ProgressiveImage from "react-progressive-graceful-image";
import styled from "styled-components";
import { Store } from "../context/context-flyers";

const ImgDiv = styled.div`
  height: 15rem; /* Equals maximum image height */
  position: relative;
  background: #3a6f9a;
`;

const Img = styled.img`
  vertical-align: middle;
  max-height: 15rem;
  max-width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

interface Props {
  flyer: ApiType.Flyer;
}

const Flyer: React.FC<Props> = ({ flyer }) => {
  const { id, title, retailer, category, image, isFavourite } = flyer;
  const globalState = useContext(Store);
  const {flyersDispatch} = globalState.dispatch 
  const icon = (isFavourite)? 'heart' : 'heart outline'
  const type = (!isFavourite)? 'ADD_FAVOURITES' : 'REMOVE_FAVOURITES'
  return (
    <Grid.Column mobile={8} tablet={4} computer={3} key={id}>
      <Card>
        <ImgDiv>
          <ProgressiveImage src={`//${image}`} placeholder="tiny-image.jpg">
            {(src) => {
              return <Img src={src} />;
            }}
          </ProgressiveImage>
        </ImgDiv>
        <Card.Content>
          <Card.Meta>
            <span className="date">{retailer}</span>
          </Card.Meta>
          <Card.Header
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Card.Header>

          <Card.Description>{category}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name={icon} onClick={() =>{flyersDispatch({type, id, title})}}/>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default Flyer;
