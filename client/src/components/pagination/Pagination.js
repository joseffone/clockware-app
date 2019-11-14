import React from 'react';
import {Pagination, Dropdown} from 'semantic-ui-react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

const CustomPagination = (props) => {
    return (
        <div 
            className={styles.customPagination}
        >
            {props.mobile ? null : <span>Rows per page:</span>}
            {props.mobile ? null :
                <Dropdown
                    upward
                    pointing='top'
                    options={props.itemsPerPageOptions}
                    defaultValue={props.itemsPerPage}
                    text={'' + props.itemsPerPage}
                    inline
                    onChange={props.itemsPerPageChanged}
                />
            }
            {props.totalItems > 0 ? <span>{props.startIndex + 1}-{props.endIndex + 1 > props.totalItems ? props.totalItems : props.endIndex + 1} of {props.totalItems}</span> : <span>0-0 of 0</span>}
            <Pagination
                totalPages={props.totalPages}
                activePage={props.currentPage}
                pageItem={props.mobile ? null : undefined}
                ellipsisItem={props.mobile ? null : undefined}
                firstItem={props.totalPages > 2 ? props.mobile ? null : undefined : null}
                lastItem={props.totalPages > 2 ? props.mobile ? null : undefined : null}
                boundaryRange={1}
                siblingRange={1}
                floated='right'
                onPageChange={props.currentPageChanged}
            />
        </div>
    );
};

CustomPagination.propTypes = {
    mobile: PropTypes.bool,
    totalItems: PropTypes.number.isRequired,
    startIndex: PropTypes.number.isRequired,
    endIndex: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    itemsPerPageOptions: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType(PropTypes.number, PropTypes.string).isRequired,
            text: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired
        })
    ).isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    itemsPerPageChanged: PropTypes.func.isRequired,
    currentPageChanged: PropTypes.func.isRequired
};

export default CustomPagination;