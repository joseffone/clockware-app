import React from 'react';
import {Container, Grid, List, Header} from 'semantic-ui-react';

const Footer = (props) => {
    return(
        <Container>
            <Grid 
                divided 
                stackable
                {...props}
            >
                <Grid.Row>
                    <Grid.Column width={5}>
                        <Header 
                            as='h4' 
                            content='Contacts' 
                            {...props}
                        />
                        <List>
                            <List.Item icon='user' content='Kirill Kopitsa' />
                            <List.Item icon='marker' content='Dnipro, Ukraine' />
                            <List.Item
                                icon='mail'
                                content={<a href='mailto:joseff.knecht@gmail.com'>joseff.knecht@gmail.com</a>}
                            />
                            <List.Item
                                icon='github'
                                content={<a href='https://github.com/joseffone'>github.com/joseffone</a>}
                            />
                        </List>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Header 
                            as='h4' 
                            content='About project' 
                            {...props}
                        />
                            <p>
                                A site is a simple version of a booking service which allows users to filter search results via a variety of different parameters, 
                                letting them book watchmakers in a given area. This service, also, allows to manage lists of data: create, update and delete them.
                            </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default Footer;