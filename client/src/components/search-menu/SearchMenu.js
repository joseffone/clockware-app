import React, {Component} from 'react';
import {Menu, Select, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class SearchMenu extends Component {

    state = {
        activeItem: 'asc'
    }

    onSetActiveItemHandler = (event, {name}) => {
        this.setState({activeItem: name}, () => {
            return this.props.onOrderChange ? this.props.onOrderChange(name === 'asc' ? false : true) : null;
        });
    };

    onSelectKeyHandler = (event, {value}) => {
        return this.props.onTargetChange ? this.props.onTargetChange(value === '' ? null : value) : null;
    };

    render() {
        return (
            <Menu 
                secondary
                stackable
            >
                <Menu.Menu
                    position='right'
                >
                    <Menu.Item 
                        header
                        fitted='vertically'
                    >
                        Sort by:
                    </Menu.Item>
                    <Menu.Item
                        fitted={this.props.mobile ? 'horizontally' : true}
                    >
                        <Select
                            fluid 
                            compact
                            clearable
                            placeholder='Select key'
                            options={this.props.options}
                            text={this.props.text}
                            onChange={this.onSelectKeyHandler}
                        />
                    </Menu.Item>
                    <Menu.Item
                        name='asc'
                        active={this.state.activeItem === 'asc'}
                        onClick={this.onSetActiveItemHandler}
                    >
                        <Icon name='long arrow alternate up' />
                        asc
                    </Menu.Item>
                    <Menu.Item
                        name='desc'
                        active={this.state.activeItem === 'desc'}
                        onClick={this.onSetActiveItemHandler}
                    >
                        <Icon name='long arrow alternate down' />
                        desc
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

SearchMenu.propTypes = {
    mobile: PropTypes.bool,
    text: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            text: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired
        })
    ),
    onTargetChange: PropTypes.func,
    onOrderChange: PropTypes.func
};

export default SearchMenu;
