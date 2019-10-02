import React from 'react';
import { Sidebar } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SideBarWrapper = (props) => {
    const CustomSideBar = props.sidebar;
    return (
        <Sidebar.Pushable>
            <CustomSideBar />
            <Sidebar.Pusher dimmed={props.dimmed}>
                {props.children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );

};

SideBarWrapper.propTypes = {
    dimmed: PropTypes.bool,
    sidebar: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    children: PropTypes.node.isRequired
};

export default SideBarWrapper;