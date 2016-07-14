import React from 'react';

export class StatusComponent extends React.Component {

    render() {
        return <div className="status">
            <span className="preamp-id">Preamp ID <span>2</span></span>
            <span className="indicator on">
                <span className="on"></span>
                Online
            </span>
        </div>;
    }
}