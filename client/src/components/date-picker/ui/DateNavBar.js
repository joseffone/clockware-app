import React from 'react';
import {Table, Dropdown, Icon} from 'semantic-ui-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';

const DateNavBar = (props) => {

    let dateContext = moment(Object.assign({}, props.dateContext));
    let currentYear = dateContext.format('YYYY');
    let currentMonth  = dateContext.format('MMMM');
    let monthsOptions = moment.months().map((elem) => {
        return {key: elem, value: elem, text: elem};
    });
    let dayCell = null;

    if (props.withDay) {
        dayCell = (
            <Table.Cell 
                width={1}
                selectable
                content={dateContext.format('D')}
                onClick={() => props.dayClicked(dateContext)}
            />
        );
    }

    return (
        <Table 
            unstackable 
            attached='top' 
            textAlign='center' 
            className={styles.dateNavBar}
        >
            <Table.Body>
                <Table.Row>
                    <Table.Cell 
                        width={1}
                        selectable
                        content={<Icon name='chevron left' />}
                        onClick={() => props.prevClicked(dateContext)}
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
                        onClick={() => props.monthClicked(dateContext)}
                        onFocus={() => props.monthClicked(dateContext)}
                    />
                    <Table.Cell 
                        width={2}
                        content={currentYear}
                    />
                    <Table.Cell 
                        width={1}
                        selectable
                        content={<Icon name='chevron right' />}
                        onClick={() => props.nextClicked(dateContext)}
                    />
                </Table.Row>
            </Table.Body>
        </Table>
    );

};

DateNavBar.propTypes = {
    withDay: PropTypes.bool,
    dateContext: PropTypes.object.isRequired,
    monthClicked: PropTypes.func.isRequired,
    nextClicked: PropTypes.func.isRequired,
    prevClicked: PropTypes.func.isRequired,
    monthChanged: PropTypes.func.isRequired,
    dayClicked: PropTypes.func
};

export default DateNavBar;