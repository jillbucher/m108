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
        this.setSelectedFromProps();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selected !== this.state.selected.value) {
            this.setSelectedFromProps();
        }
    }

    setSelectedFromProps() {
        let found = this.props.options.filter(option => option.value === this.props.selected);

        let selected = null;
        if (found.length > 0) {
            selected = found[0];
        } else {
            selected = this.props.options[0];
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
            selected: option
        });
        this.dataService.save(this.props.name, option.value, null, response => {});
    }

    render() {
        let dropdown;
        if (this.state.expanded){
            let listItems = this.props.options.map(option => {
                return <li key={option.value} onClick={this.select.bind(this, option)}>
                    {option.text}
                </li>;
            });
            dropdown = <ul className="dropdown-items">
                    {listItems}
                </ul>;
        }

        let label = this.state.selected ? this.state.selected.text : '';
        return (
            <div className="dropdown-menu" tabIndex="0" onBlur={ this.collapse.bind(this)} >
                <div className="selected" onClick={this.expand.bind(this)}>
                    <span>{label}</span>
                </div>
                {dropdown}
            </div>
        );
    }
}