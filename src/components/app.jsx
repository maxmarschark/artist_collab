import React from 'react';
import request from 'superagent';

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      searchInput: '',
      selectedArtist: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchForArtist = this.searchForArtist.bind(this);
  }

  handleChange (e) {
    e.preventDefault();
    const key = e.target.name;
    const update = {};
    update[key] = e.target.value;
    this.setState(update);
  }

  handleSubmit (e) {
    e.preventDefault();
    this.searchForArtist();
  }

  getArtistInfo () {
    const id = this.state.selectedArtist.id;
    request.get(`https://api.spotify.com/v1/artists/${id}`)
           .then((response) => {
             console.log(response);
           });
  }

  // 

  searchForArtist() {
    const query = this.state.searchInput.replace(' ', '%20');
    request.get(`https://api.spotify.com/v1/search?q=${query}&type=artist`)
      .then((response) => {
        const artist = response.body.artists.items[0];
        const name = artist.name;
        const id = artist.id;
        this.setState({
          selectedArtist: {name: name, id: id},
        });
      })
      .then(() => {
        this.getArtistInfo();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='searchInput' onChange={this.handleChange} />
          <input type='submit' />
        </form>
        <div>{this.state.selectedArtist.name}</div>
      </div>
    );
  }
}
