import React from 'react';
import {Sidebar} from 'semantic-ui-react';
import SideBar from '../../components/sidebar';
import PropTypes from 'prop-types';

const SideBarWrapper = (props) => {
    return (
        <Sidebar.Pushable>
            <SideBar 
                content={props.content} 
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
    content: PropTypes.node.isRequired,
    dimmed: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};

export default SideBarWrapper;