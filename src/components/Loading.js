import React, { Component } from 'react';
import '../css/loadingWindow.css';

class Loading extends Component {
    render() {
        return (
            <div id="loading-screen">
                <div className="load-ball" id="load-ball-1"></div>
                <div className="load-ball" id="load-ball-2"></div>
                <div className="load-ball" id="load-ball-3"></div>
            </div>
        )
    }
}

export default Loading;