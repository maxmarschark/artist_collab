import React from 'react';
import request from 'superagent';
import Artist from './artist.jsx';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      selectedArtist: {},
      selectAlbums: {},
      artistCounts: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchForArtist = this.searchForArtist.bind(this);
    this.getArtistAlbums = this.getArtistAlbums.bind(this);
    this.getArtistAlbumTracks = this.getArtistAlbumTracks.bind(this);
    this.getTrackDetails = this.getTrackDetails.bind(this);
    this.getNextCollabs = this.getNextCollabs.bind(this);
    this.artistOnClick = this.artistOnClick.bind(this);
  }

  getArtistAlbums() {
    const { id } = this.state.selectedArtist;
    request.get(`https://api.spotify.com/v1/artists/${id}/albums`)
           .then((response) => {
             response.body.items.forEach(this.getArtistAlbumTracks);
           });
  }

  getArtistAlbumTracks(album) {
    request.get(`https://api.spotify.com/v1/albums/${album.id}/tracks`)
           .then((tracks) => {
             tracks.body.items.forEach(this.getTrackDetails);
           });
  }

  getTrackDetails(track) {
    request.get(`https://api.spotify.com/v1/tracks/${track.id}`)
      .then((track) => {
        const { artists } = track.body;
        const artistCounts = this.state.artistCounts;
        for (let i = 0; i < artists.length; i++) {
          const artist = artists[i];
          const artistName = artist.name;
          if (artistCounts[artistName]) {
            artistCounts[artistName] += 1;
          }
          else {
            artistCounts[artistName] = 1;
          }
// take local variable artistCounts, run lodash sort then slice first 5 from that into new Object
// the set state below should use the new variable with only those first 5 objects
        }
        this.setState({ artistCounts });
      });
  }

  searchForArtist(query) {
    request.get(`https://api.spotify.com/v1/search?q=${query}&type=artist`)
      .then((response) => {
        const artist = response.body.artists.items[0];
        const name = artist.name;
        const id = artist.id;
        let img_url = artist.images[0].url;
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
      });
  }

  getNextCollabs(artist) {
   this.setState({
     selectedArtist: {},
     selectedAlbums: {},
     artistCounts: {},
   });
   this.searchForArtist(artist);
  }

  handleChange(e) {
    this.setState({
      searchInput: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const query = this.state.searchInput.replace(' ', '%20');
    this.searchForArtist(query);
    this.setState({
      selectedArtist: {},
      selectedAlbums: {},
      artistCounts: {},
    });
  }

  artistOnClick(e) {
    let artist = e.target.innerHTML;
    this.getNextCollabs(artist);
    document.getElementById("searchInput").value = artist;
  }

  render() {
    const img_url = this.state.selectedArtist.img_url;
    const { artistCounts } = this.state;
    return (
      <div>
        <div className="header">
          <h1 className="top-text animated rubberBand">.FEATURING.</h1>

          <form onSubmit={this.handleSubmit}>
            <input id='searchInput' type='text' name="searchInput" className="searchInput" placeholder="Search Artist" onChange={this.handleChange} />
          <input type="submit" className="button" />
        </form>
        </div>
        <img alt="" className="artist-img" src={this.state.selectedArtist.img_url} />
        <div id="collabs">
          {
            Object.keys(artistCounts).map((artist, index) => {
              return (
                <Artist
                  name={artist}
                  artistOnClick={this.artistOnClick}
                  key={index}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}
