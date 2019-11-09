import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimmer, Modal, Header, Button, Loader} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ConfirmDelete extends Component {

    state = {
        isDeleteConfirmed: false
    }

    render () {
        let icon ='warning circle'
        let header = 'Delete confirmation';
        let content = this.props.content ? this.props.content : 'You are going to delete selected entries. Do you confirm this action?';
        
        if (this.state.isDeleteConfirmed && !this.props.admin.models[this.props.admin.ui.currentModel].loading.isDeleting) {
            if (this.props.admin.models[this.props.admin.ui.currentModel].error.deleteError) {
                icon = 'frown'
                header = 'Cannot delete data';
                content = 'Something went wrong while deleting data. The action cannot be completed successfully.';
                if (this.props.admin.models[this.props.admin.ui.currentModel].error.deleteError.response.status === 403) {
                    header = 'No access to delete data';
                    content = 'There are restrictions for your account to delete data from this register.';
                }
                if (this.props.admin.models[this.props.admin.ui.currentModel].error.deleteError.response.status === 404) {
                    header = 'Data is not available';
                    content = 'Selected entries are not available. They might be deleted by other users.';
                }
            } else {
                icon = 'smile';
                header = 'Delete action success';
                content = 'Entries were deleted successful!';
            }
        }

        return(
            <Dimmer.Dimmable
                as={Modal}
                size='small'
                dimmed={this.props.admin.models[this.props.admin.ui.currentModel].loading.isDeleting}
                {...this.props}
            >
                <Dimmer
                    inverted
                    active={this.props.admin.models[this.props.admin.ui.currentModel].loading.isDeleting}
                >
                    <Loader>Deleting...</Loader>
                </Dimmer>
                <Header icon={icon} content={header} />
                <Modal.Content>
                    <p>{content}</p>
                </Modal.Content>
                <Modal.Actions>
                    {this.state.isDeleteConfirmed && !this.props.admin.models[this.props.admin.ui.currentModel].loading.isDeleting ?
                        <Button 
                            color='blue'
                            content='OK'
                            onClick={() => this.setState({isDeleteConfirmed: false}, () => this.props.onCommit())}
                        />
                    :
                        <div>
                            <Button 
                                negative
                                content='No'
                                onClick={this.props.onCancel}
                            />
                            <Button 
                                positive
                                content='Yes'
                                onClick={() => this.setState({isDeleteConfirmed: true}, () => this.props.onConfirm())}
                            />
                        </div>
                    }
                </Modal.Actions>
            </Dimmer.Dimmable>
        );
    }
}

const mapStateToProps = state => {
    return {
        admin: state.admin
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

ConfirmDelete.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCommit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDelete);