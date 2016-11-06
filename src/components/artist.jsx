import React from 'react';
import request from 'superagent';

const propTypes = {
  artistOnClick: React.PropTypes.func.isRequired,
};


//artistOnClick undefined...figure out how to render collab img

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
        <h1>{ this.props.name }</h1>
        <div onClick={this.handleArtistImg}>
          <img src={this.props.image} />
        </div>
        </div>
        <div onClick={this.handleArtistImg}></div>
      </div>
    )
  }
}

Artist.propTypes = propTypes;

// class Artist extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       image: {},
//     };
//


// export default class Artist extends React.Component {
//   constructor(props) {
//     super();
//     this.state = {
//       image: {}
//     }
//   }


//
//   render() {

//     const name = this.name;
//     return (
//       <div>
//       <img className="artist-img" src={this.state.image.img_url} />
//         <div name={name} img={image} onClick={artistOnClick}>
//           {name, image}
//         </div>
//       </div>
//     )
//   }
// }
