import React from 'react';
import request from 'superagent';

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      searchInput: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.getFromSpotify();
  }

  getFromSpotify() {
    const query = this.state.searchInput.replace(' ', '%20');
    request.get(`https://api.spotify.com/v1/search?q=${query}&type=artist`)
      .then((response) => {
        console.log(response);
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
      </div>
    );
  }
}
