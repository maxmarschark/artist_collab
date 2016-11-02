import React from 'react';
import request from 'superagent';

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      searchInput: '',
      selectedArtist: {},
      selectAlbums: {},
      artistCounts: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchForArtist = this.searchForArtist.bind(this);
    this.getArtistAlbums = this.getArtistAlbums.bind(this);
    this.getArtistAlbumTracks = this.getArtistAlbumTracks.bind(this);
    this.getTrackDetails = this.getTrackDetails.bind(this);
  }

  handleChange (e) {
    e.preventDefault();
    this.setState({
      searchInput: e.target.value
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.searchForArtist();
  }

  getArtistAlbums() {
    const { id } = this.state.selectedArtist;
    request.get(`https://api.spotify.com/v1/artists/${id}/albums`)
           .then((response) => {
             response.body.items.forEach(this.getArtistAlbumTracks)
           });
  }

  getArtistAlbumTracks(album) {
    request.get(`https://api.spotify.com/v1/albums/${album.id}/tracks`)
           .then((tracks) => {
             tracks.body.items.forEach(this.getTrackDetails)
           })
  }
// artistCounts = {
//   'kanye': 1,
//   'fetty': 2
// }
  getTrackDetails(track) {
     request.get(`https://api.spotify.com/v1/tracks/${track.id}`)
      .then((track) => {
        // console.log(track.body.artists);
        let { artists } = track.body;
        for(let i = 0; i < artists.length; i++) {
          let artist = artists[i];
          let artistName = artist.name;

          console.log(artists[i].name);
          if (this.state.artistCounts[artistName]) {
            // pull artist out of artistCounts
            console.log(artistCounts);


            // add 1 to count
            // put artist back in state with updated count
            this.state.artistCounts[artistName] += 1;
          }
          else {
            this.setState({
              artistCounts: {
                [artistName]: 1
              }
            })
          }
        }
      })
  }

  searchForArtist() {
    const query = this.state.searchInput.replace(' ', '%20');
    request.get(`https://api.spotify.com/v1/search?q=${query}&type=artist`)
      .then((response) => {
        const artist = response.body.artists.items[0];
        const name = artist.name;
        const id = artist.id;
        const img_url = artist.images[0].url;
        this.setState({
          selectedArtist: {
            name,
            id,
            img_url,
          },
        });
      })
      .then(() => {
        this.getArtistAlbums();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='searchInput' className="searchInput" placeholder="Artist" onChange={this.handleChange} />
          <input type='submit' className="button" />
        </form>
        <div className="Artist">{this.state.selectedArtist.name}</div>
      </div>
    );
  }
}
