import React from 'react';

const Stars: React.FunctionComponent<{ stars: number }> = ({stars}) => {
  if (stars === 1) {
    return <h3>★☆☆☆☆</h3>;
  } else if (stars === 2) {
    return <h3>★★☆☆☆</h3>;
  } else if (stars === 3) {
    return <h3>★★★☆☆</h3>;
  } else if (stars === 4) {
    return <h3>★★★★☆</h3>;
  } else if (stars === 5) {
    return <h3>★★★★★</h3>;
  } else {
    return <></>
  }
};

export default Stars;
