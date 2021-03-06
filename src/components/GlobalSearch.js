import React, { Component } from "react";
import SvgSearch from "./svg/SvgSearch";

class GlobalSearch extends Component {
  state = {
    value: ""
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.fetchResults(this.state.value);
  };

  componentDidMount() {
    this.props.fetchResults(this.state.value);
  }

  render() {
    return (
      <header className="container">
        <form
          className="global-search-form full-bleed container"
          onSubmit={this.handleSubmit}
        >
          <label className="sr-only" htmlFor="search">
            search
          </label>
          <div className="global-search-wrapper">
            <button type="submit">
              <SvgSearch />
              <span className="sr-only">Submit</span>
            </button>
            <input
              id="search"
              name="query"
              placeholder="Search pins"
              type="search"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
        </form>
      </header>
    );
  }
}

export default GlobalSearch;
