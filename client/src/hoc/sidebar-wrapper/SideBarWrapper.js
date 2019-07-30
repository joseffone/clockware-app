import React from 'react';
import { Sidebar } from 'semantic-ui-react';

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

export default SideBarWrapper;