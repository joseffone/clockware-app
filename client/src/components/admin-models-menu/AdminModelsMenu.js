import React from 'react';
import {Menu, Icon} from 'semantic-ui-react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

const AdminModelsMenu = (props) => {
    return (
        <Menu 
            className={styles.adminModelsMenu}
            icon={props.mobile ? null : 'labeled'}
            secondary={!props.mobile}
            fluid
            vertical
        >
            {props.options.map((item, index) => (
                <Menu.Item
                    key={index}
                    name={item.name}
                    active={props.currentModel === item.name}
                    onClick={props.onItemClick}
                >
                    <Icon name={item.icon} />
                    {item.name.split('')[0].toUpperCase() + item.name.split('').slice(1).join('')}
                </Menu.Item>
            ))}
        </Menu>
    );
};

AdminModelsMenu.propTypes = {
    mobile: PropTypes.bool,
    currentModel: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired
        })
    ).isRequired,
    onItemClick: PropTypes.func.isRequired
};

export default AdminModelsMenu;

