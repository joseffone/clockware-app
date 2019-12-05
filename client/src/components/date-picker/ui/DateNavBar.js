import React from 'react';
import {Table, Dropdown, Icon} from 'semantic-ui-react';
import moment from 'moment';
import styles from '../styles.module.css';
import PropTypes from 'prop-types';

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
                onClick={() => props.onDayClick(dateContext)}
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
                        content={
                            <Icon name='chevron left' />
                        }
                        onClick={() => props.onPrevClick(dateContext)}
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
                                onChange={(event) => props.onMonthChange(event, dateContext)}
                            />
                        }
                    />
                    <Table.Cell 
                        width={2}
                        content={currentYear}
                    />
                    <Table.Cell 
                        width={1}
                        selectable
                        content={
                            <Icon name='chevron right' />
                        }
                        onClick={() => props.onNextClick(dateContext)}
                    />
                </Table.Row>
            </Table.Body>
        </Table>
    );
};

DateNavBar.propTypes = {
    withDay: PropTypes.bool,
    dateContext: PropTypes.object.isRequired,
    onNextClick: PropTypes.func.isRequired,
    onPrevClick: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func.isRequired,
    onDayClick: PropTypes.func
};

export default DateNavBar;