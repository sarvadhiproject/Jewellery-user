import React, { Component } from 'react';

class FooterLinks extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="footer-alt" style={{backgroundColor:'#F2E9E9'}}>
                    <p className="copy-rights" style={{color:'#832729'}}>  {new Date().getFullYear()} © Sarvadhi.</p>
                </div>
            </React.Fragment>
        );
    }
}

export default FooterLinks;