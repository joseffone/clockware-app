import React from 'react';
import {Sidebar} from 'semantic-ui-react';
import SideBar from '../../components/sidebar';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

const SideBarWrapper = (props) => {
    let {mobile, content, dimmed, children} = props;
    return (
        <Sidebar.Pushable
            className={mobile ? styles.mobileWrapper : styles.wrapper}
        >
            <SideBar 
                content={content} 
            />
            <Sidebar.Pusher 
                dimmed={dimmed}
            >
                {children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );

};

SideBarWrapper.propTypes = {
    mobile: PropTypes.bool,
    content: PropTypes.node.isRequired,
    dimmed: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};

export default SideBarWrapper;