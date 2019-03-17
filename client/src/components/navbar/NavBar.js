import React, { Component } from 'react';
import { Menu, Header, Button } from 'semantic-ui-react';

class NavBar extends Component {
    render () {
        return(
            <Menu
                borderless
                inverted
                fixed={this.props.fixed}
            >
                <Menu.Item
                    content={
                        <Header
                            inverted
                            as='h3'
                            icon='clock outline'
                            content='Clockwise Clockware'
                        />
                    }
                />
                <Menu.Item
                    position='right'
                    name='authTrigger'
                    content={
                        <Button
                            inverted
                            content='Log in'
                        />
                    }
                />
            </Menu>
        );
    }
}

export default NavBar;