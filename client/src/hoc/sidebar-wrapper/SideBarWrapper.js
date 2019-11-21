import React from 'react';
import {Sidebar} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SideBarWrapper = (props) => {
    const CustomSideBar = props.sidebar;
    return (
        <Sidebar.Pushable>
            <CustomSideBar 
                admin={props.admin} 
            />
            <Sidebar.Pusher 
                dimmed={props.dimmed}
            >
                {props.children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );

};

SideBarWrapper.propTypes = {
    admin: PropTypes.bool.isRequired,
    dimmed: PropTypes.bool.isRequired,
    sidebar: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default SideBarWrapper;