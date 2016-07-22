import React from 'react';

import {DataService} from "./DataService.js";

export class DropdownComponent extends React.Component {

    constructor() {
        super();
        this.dataService = new DataService();
        this.state = {
            expanded: false,
            selected: null
        };
    }

    componentDidMount() {
        let selected = this.props.selected;
        let found = this.props.options.find(option => option.value === this.props.selected);
        if (found) {
            selected = found.label;
        } else {
            selected = this.props.options[0].label;
        }
        this.setState({
            expanded: false,
            selected: selected
        });
    }

    expand() {
        this.setState({
            expanded: true,
            selected: this.state.selected
        });
    }

    collapse() {
        this.setState({
            expanded: false,
            selected: this.state.selected
        });
    }

    select(option) {
        this.setState({
            expanded: false,
            selected: option.label
        });
        this.dataService.save(this.props.name, option.value, null, response => {
            console.log(response);
        });
    }

    render() {
        let dropdown;
        if (this.state.expanded){
            let listItems = this.props.options.map(option => {
                return <li key={option.value} onClick={this.select.bind(this, option)}>
                    {option.label}
                </li>;
            });
            dropdown = <ul className="dropdown-items">
                    {listItems}
                </ul>;
        }

        return (
            <div className="dropdown-menu" tabIndex="0" onBlur={ this.collapse.bind(this)} >
                <div className="selected" onClick={this.expand.bind(this)}>
                    <span>{this.state.selected}</span>
                </div>
                {dropdown}
            </div>
        );
    }
}