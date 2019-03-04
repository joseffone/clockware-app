import React from 'react';
import { Table, Dropdown, Icon } from 'semantic-ui-react';
import moment from 'moment';

const dateNavBar = (props) => {

    let dateContext = moment(Object.assign({}, props.dateContext));
    let currentYear = dateContext.format('YYYY');
    let currentMonth  = dateContext.format('MMMM');
    let monthsOptions = moment.months().map((elem) => { return {key: elem, value: elem, text: elem}; });
    let dayCell = null;

    if (props.withDay) {
        dayCell = (
            <Table.Cell 
                width={1}
                selectable
                content={dateContext.format('D')}
                style={{cursor: 'pointer', padding: 0}}
                onClick={(event) => props.dayClicked(event, dateContext)}
            />
        );
    }

    return (
        <Table unstackable attached='top' textAlign='center' style={{height: '3em'}}>
            <Table.Body>
                <Table.Row>
                    <Table.Cell 
                        width={1}
                        selectable
                        content={<Icon name='chevron left' />}
                        style={{cursor: 'pointer', padding: 0}}
                        onClick={(event) => props.prevClicked(event, dateContext)}
                    />
                    {dayCell}
                    <Table.Cell 
                        width={3}
                        selectable
                        content={
                            <Dropdown 
                                scrolling 
                                value={currentMonth} 
                                options={monthsOptions}
                                onChange={(event) => props.monthChanged(event, dateContext)}
                            />
                        }
                        style={{cursor: 'pointer', padding: 0}}
                        onClick={(event) => props.monthClicked(event, dateContext)}
                        onFocus={(event) => props.monthClicked(event, dateContext)}
                    />
                    <Table.Cell 
                        width={2}
                        content={currentYear}
                        style={{padding: 0}}
                    />
                    <Table.Cell 
                        width={1}
                        selectable
                        content={<Icon name='chevron right' />}
                        style={{cursor: 'pointer', padding: 0}}
                        onClick={(event) => props.nextClicked(event, dateContext)}
                    />
                </Table.Row>
            </Table.Body>
        </Table>
    );

};

export default dateNavBar;