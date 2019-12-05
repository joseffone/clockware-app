import React, {Component} from 'react';
import {Dimmer, Modal, Header, Button, Loader} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ConfirmAction extends Component {

    state = {
        isActionConfirmed: false
    }

    render () {
        let icon = this.props.icon ? this.props.icon.initial : 'warning circle';
        let header = this.props.message ? this.props.message.initial.header : 'Action confirmation';
        let content = this.props.message ? this.props.message.initial.content : 'Do you confirm this action?';
        
        if (this.state.isActionConfirmed && !this.props.acting) {
            if (this.props.error) {
                icon = this.props.icon ? this.props.icon.failure : 'frown';
                header = this.props.message ? this.props.message.failure
                    .find(({errCode}) => errCode === 'default').header : 'Cannot complete action';
                content = this.props.message ? this.props.message.failure
                    .find(({errCode}) => errCode === 'default').content : 'Something went wrong while processing request. The action cannot be completed successfully.';
                if (this.props.message) {
                    for (let option of this.props.message.failure) {
                        if (option.errCode === this.props.error.response.status) {
                            header = option.header;
                            content = option.content;
                        }
                    }
                }
            } else {
                icon = this.props.icon ? this.props.icon.success : 'smile';
                header = this.props.message ? this.props.message.success.header : 'Action success';
                content = this.props.message ? this.props.message.success.content : 'Action was completed successfully.';
            }
        }

        return (
            <Dimmer.Dimmable
                as={Modal}
                size='small'
                closeOnDimmerClick={false}
                dimmed={this.props.acting}
                {...this.props}
            >
                <Dimmer
                    inverted
                    active={this.props.acting}
                >
                    <Loader>{this.props.loaderText || 'Processing...'}</Loader>
                </Dimmer>
                <Header icon={icon} content={header} />
                <Modal.Content><p>{content}</p></Modal.Content>
                <Modal.Actions>
                    {this.state.isActionConfirmed && !this.props.acting ?
                        <Button 
                            color='blue'
                            content='OK'
                            onClick={() => this.setState({isActionConfirmed: false}, () => this.props.onCommit())}
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
                                onClick={() => this.setState({isActionConfirmed: true}, () => this.props.onConfirm())}
                            />
                        </div>
                    }
                </Modal.Actions>
            </Dimmer.Dimmable>
        );
    }
}

ConfirmAction.propTypes = {
    open: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    acting: PropTypes.bool.isRequired,
    icon: PropTypes.shape({
        initial: PropTypes.string.isRequired,
        success: PropTypes.string.isRequired,
        failure: PropTypes.string.isRequired
    }),
    message: PropTypes.shape({
        initial: PropTypes.shape({
            header: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired
        }).isRequired,
        success: PropTypes.shape({
            header: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired
        }).isRequired,
        failure: PropTypes.arrayOf(
            PropTypes.shape({
                errCode: PropTypes.oneOf(['default', PropTypes.number]).isRequired,
                header: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired
            }).isRequired
        ).isRequired
    }),
    onClose: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCommit: PropTypes.func.isRequired
};

export default ConfirmAction;