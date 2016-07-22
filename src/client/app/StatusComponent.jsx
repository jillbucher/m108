import React from 'react';
import ReactDOM from 'react-dom';

import {InlineEditorComponent} from "./InlineEditorComponent.jsx";

export class StatusComponent extends React.Component {

    componentDidMount() {
        this.setWidths();
        window.addEventListener('resize', this.setWidths.bind(this));
    }

    componentDidUnmount() {
        window.removeEventListener('resize', this.setWidths.bind(this));
    }

    setWidths() {
        let status = ReactDOM.findDOMNode(this.refs.status);
        let width = (parseInt(window.getComputedStyle(status.parentNode).getPropertyValue('width'), 10) / 8 * 2) - 31;
        status.style.width = width + 'px';
    }

    render() {
        return <div className="status" ref="status">
            <div className="preamp-id">
                <label>Preamp ID</label>
                <div class="value">{this.props.sys.id}</div>
            </div>
            <div className="preamp-name">
                <label>Name</label>
                <InlineEditorComponent value={this.props.sys.name} name="NMDV" maxLength="11" />
            </div>
            <div className="indicator on">
                <span className="on"></span>
                Online
            </div>
        </div>;
    }
}