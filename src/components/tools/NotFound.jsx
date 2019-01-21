import React from 'react';
import SvgSymbol from './SvgSymbol';

const NotFound = props => (
  <div className="not-found">
    <h1>Zoink!</h1>
    <div className="not-found-icon">
      <div className="icon-gear">
        <SvgSymbol symbolId="#icon-gear-large" />
      </div>
      <div className="icon-gear">
        <SvgSymbol symbolId="#icon-gear-small" />
      </div>
    </div>
    <p>Didn&apos;t find that one.</p>
  </div>
);

export default NotFound;
