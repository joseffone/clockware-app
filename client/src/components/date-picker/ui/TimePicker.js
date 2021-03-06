import React from 'react';
import {Table} from 'semantic-ui-react';
import moment from 'moment';
import styles from '../styles.module.css';
import PropTypes from 'prop-types';

const TimePicker = (props) => {
    let dateContext = moment(Object.assign({}, props.dateContext));
    let currentHour = dateContext.format('H');
    let currentMinutes  = dateContext.format('m');
    let cells = [];
    let rows = [];

    if (props.view === 'hours') {
        for (let h = 0; h <= 23; h++) {
            cells.push(
                <Table.Cell 
                    key={h} 
                    selectable
                    active = {(h === +currentHour) ? true : false}
                    content={moment().hours(h).minutes(0).format('HH:mm')}
                    onClick={(event) => props.onTimeClick(event, dateContext)}
                />
            );
            if ((h + 1) % 4 === 0) {
                rows.push(
                    <Table.Row key={h*24}>
                        {cells.slice()}
                    </Table.Row>
                );
                cells = [];
            }
        }
    }

    if (props.view === 'minutes') {
        for (let m = 0; m <= 55; m+=5) {
            cells.push(
                <Table.Cell 
                    key={m} 
                    selectable
                    active = {(m === Math.round(currentMinutes/5)*5) ? true : false}
                    content={moment(dateContext).minutes(m).format('HH:mm')}
                    onClick={(event) => props.onTimeClick(event, dateContext)}
                />
            );
            if (m % 3 === 1) {
                rows.push(
                    <Table.Row key={m*60}>
                        {cells.slice()}
                    </Table.Row>
                );
                cells = [];
            }
        }
    }

    return (
        <Table 
            unstackable 
            attached 
            celled 
            textAlign='center' 
            className={styles.timePicker}
        >
            <Table.Body>
                {rows}
            </Table.Body>
        </Table>
    );

};

TimePicker.propTypes = {
    dateContext: PropTypes.object.isRequired,
    onTimeClick: PropTypes.func.isRequired,
    view: PropTypes.oneOf(['hours', 'minutes']).isRequired
};

export default TimePicker;