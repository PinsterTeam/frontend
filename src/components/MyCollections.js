import React, { Component } from 'react';
import Collection from './Collection';

class MyCollections extends Component {
    state = {
        collections: [],
        pageLink: ''
    };

    makeFetch() {
        const blah = '6f22c875-f795-436b-8528-e1cb9e35a412';
        fetch(`https://api-dev.pinster.io/v1/users/${blah}/collections`)
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
                console.log(response);
                this.setState({
                    collections: response.data,
                    pageLink: response.links.next
                });
            });
    }

    componentDidMount() {
        this.makeFetch();
    }

    render() {
        return (
            <main className="container">
                <div className="pin-collection">
                    {Object.keys(this.state.collections).map(key => (
                        <Collection
                            key={key}
                            userId={this.props.userId}
                            collectionData={this.state.collections[key]}
                            history={this.props.history}
                        />
                    ))}
                </div>
                <button className="btn-load-more" onClick={this.makeFetch}>
                    Load more
                </button>
            </main>
        );
    }
}

export default MyCollections;