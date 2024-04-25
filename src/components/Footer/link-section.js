import React, { Component } from 'react';
import { Link } from "react-router-dom";

class LinkSection extends Component {
    render() {
        return (
            <React.Fragment>
                    <h5>{this.props.title}</h5>
                    <ul className="list-unstyled footer-list">
                        {
                            this.props.links.map((fLink, key) =>
                                <li key={key}><Link to={fLink.link}>{fLink.title}</Link></li>
                            )
                        }
                    </ul>
            </React.Fragment>
        );
    }
}

export default LinkSection;