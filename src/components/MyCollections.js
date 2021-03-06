import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CollectionListItem from "./CollectionListItem";
import SvgAdd from "./svg/SvgAdd";
import LoadMoreButton from "./LoadMoreButton";
import HeaderNav from "./HeaderNav";

class MyCollections extends Component {
  state = {
    collections: [],
    pageLink: ""
  };

  fetchMoreCollections() {
    const userId = sessionStorage.getItem("pinster-user-id");
    const pageLink =
      this.state.pageLink === ""
        ? process.env.REACT_APP_API_URL + `/v1/users/${userId}/collections`
        : this.state.pageLink;
    const { getAccessToken } = this.props.auth;

    fetch(pageLink, {
      headers: { Authorization: "Bearer " + getAccessToken() }
    })
      .then(
        results => {
          return results.json();
        },
        error => {
          console.error(error);
        }
      )
      .then(response => {
        // Display the pins
        this.setState(prevState => {
          return {
            collections: [...prevState.collections, ...response.data],
            pageLink: response.links.next ? response.links.next : ""
          };
        });
      });
  }

  addNewCollection = () => {
    this.props.history.push("/collections/create");
  };

  isLoggedIn = () => {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      return true;
    }
    return false;
  };

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      this.fetchMoreCollections();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    if (!isAuthenticated()) {
      return <Redirect to="/login" />;
    }

    return (
      <React.Fragment>
        <HeaderNav label="My Collections" history={this.props.history} />
        <main className="container with-fixed-header">
          <React.Fragment>
            <div className="pin-collection">
              {Object.keys(this.state.collections).map(key => (
                <CollectionListItem
                  key={key}
                  userId={this.props.userId}
                  collectionData={this.state.collections[key]}
                  history={this.props.history}
                />
              ))}
              <div className="pin-list-item add-new" onClick={this.addNewCollection} >
                <SvgAdd classType="white pin-list-img" />
                <div className="pin-list-title">add new collection</div>
              </div>
            </div>
            <LoadMoreButton pageLink={this.state.pageLink} fetchMoreItems={this.fetchMoreCollections} />
          </React.Fragment>
        </main>
      </React.Fragment>
    );
  }
}

export default MyCollections;
