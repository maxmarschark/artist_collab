import React from 'react';
import request from 'superagent';

const Artist = ({name, artistOnClick}) => {
  console.log('rendering')
  return (
    <div onClick={artistOnClick}>
      <h1>{name}</h1>
    </div>
  )
}

export default Artist;
