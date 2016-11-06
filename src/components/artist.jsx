import React from 'react';
import request from 'superagent';

const propTypes = {
  artistOnClick: React.PropTypes.func.isRequired,
};

export default class Artist extends React.Component {
  constructor(props) {
    super(props);
    this.handleArtistImg = this.handleArtistImg.bind(this);
  }

  handleArtistImg(event, id) {
    request.get(`https://api.spotify.com/v1/search?q=${id}&type=artist`)
    .then((response) => {
      const artist = response.body.artists.items[0].images[0].url;
      let img_url = artist;
    })
  }

  render() {

    return (
      <div>
        <div onClick={this.props.artistOnClick}>
        <h1 className="artist-list animated rubberBand">{ this.props.name }</h1>
        <div onClick={this.handleArtistImg}>
        </div>
        </div>
        <div onClick={this.handleArtistImg}></div>
      </div>
    )
  }
}

Artist.propTypes = propTypes;
