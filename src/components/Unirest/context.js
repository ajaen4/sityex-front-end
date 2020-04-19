import React from 'react';

const UnirestContext = React.createContext(null);

export const withUnirest = Component => props => (
  <UnirestContext.Consumer>
    {unirest => <Component {... props} unirest = {unirest} />}
  </UnirestContext.Consumer>
);

export default UnirestContext;
