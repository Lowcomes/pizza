import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletoPizza = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={1.5}
    width={280}
    height={490}
    viewBox="0 0 280 490"
    backgroundColor="#d9e0e3"
    foregroundColor="#d5a4a4"
    {...props}>
    <rect x="0" y="316" rx="6" ry="6" width="280" height="88" />
    <rect x="0" y="269" rx="0" ry="0" width="280" height="27" />
    <rect x="0" y="0" rx="200" ry="200" width="260" height="260" />
    <rect x="0" y="424" rx="0" ry="0" width="90" height="27" />
    <rect x="128" y="424" rx="30" ry="30" width="152" height="45" />
  </ContentLoader>
);

export default SkeletoPizza;
