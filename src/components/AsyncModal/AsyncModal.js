import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AsyncButton from '../AsyncButton/AsyncButton';
import HeadedContainer from '../HeadedContainer/HeadedContainer';

const creating = "creating";
const updating = "updating";
const deleting = "deleting";
const closed = "closed";

export default class AsyncModal extends Component {

    static propTypes = {
        status: PropTypes.oneOf([
            creating,
            updating,
            deleting,
            closed,
        ]),
        create: PropTypes.exact({
            mutation: PropTypes.object,
            update: PropTypes.func,
            afterUpdate: PropTypes.func,
            variables: PropTypes.object,
            onReset: PropTypes.func,
        }),
        update: PropTypes.exact({
            mutation: PropTypes.object,
            update: PropTypes.func,
            afterUpdate: PropTypes.func,
            variables: PropTypes.object,
            onReset: PropTypes.func,
        }),
        delete: PropTypes.exact({
            mutation: PropTypes.object,
            update: PropTypes.func,
            afterUpdate: PropTypes.func,
            variables: PropTypes.object,
            message: PropTypes.string,
            onReset: PropTypes.func,
        }),
        onCancel: PropTypes.func,
        onFinish: PropTypes.func,
    };

    componentDidMount = () => window.addEventListener('keydown', this.cancelOnEsc);

    componentWillUnmount = () => window.removeEventListener('keydown', this.cancelOnEsc);

    componentDidUpdate = ({ display }) => display !== this.props.display
        &&
        this.props.onUpdate
        &&
        this.props.onUpdate(this.props);

    cancelOnEsc = ({ key }) => key === 'Escape' && this.cancel();

    stopPropagation = e => e.stopPropagation();

    handleResetClick = () => this.props[this.props.status.replace(/ing/, 'e')].onReset(this.props);

    handleCancelClick = () => this.props.onCancel(this.props);

    onFinish = () => this.props.onFinish(this.props);

    render = () => {
        const {
            props: {
                title,
                children,
                status = closed,
                create: {
                    mutation: createMutation,
                    variables: createVariables,
                } = {},
                update: {
                    mutation: updateMutation,
                    variables: updateVariables,
                } = {},
                delete: {
                    mutation: deleteMutation,
                    variables: deleteVariables,
                    message: deleteMessage,
                } = {},
                reset: {
                    // text: resetText = 'Reset',
                    className: resetClassName = 'empty light',
                    ...resetProps
                } = {},
                cancel: {
                    // text: cancelText = 'Cancel',
                    className: cancelClassName = 'empty light',
                    ...cancelProps
                } = {},
            },
            handleResetClick,
            handleCancelClick,
            onFinish,
            stopPropagation,
        } = this;
        return (
            <div
                className={`modal-background ${
                    status !== closed ? '' : 'hidden'
                    } ${
                    status === deleting ? 'danger' : ''
                    }`}
                onClick={handleCancelClick}
            >
                <div
                    className="Modal"
                    onClick={stopPropagation}
                >
                    <HeadedContainer
                        title={`${
                            status === creating ?
                                'New'
                                :
                                status === updating ?
                                    'Edit'
                                    :
                                    status === deleting ?
                                        'Delete'
                                        :
                                        ''
                            }${
                            title
                            }`}
                    >
                        {status === deleting ?
                            deleteMessage
                            :
                            children}
                    </HeadedContainer>
                    <div className="modal-buttons">
                        {status !== deleting ? (
                            <button
                                {...resetProps}
                                className={`reset ${resetClassName}`}
                                onClick={handleResetClick}
                            >
                                Reset
                            </button>
                        ) : (
                                <span></span>
                            )}
                        <span>
                            <button
                                {...cancelProps}
                                className={`cancel ${cancelClassName}`}
                                onClick={handleCancelClick}
                            >
                                Cancel
                            </button>
                            {status === creating ? (
                                <AsyncButton
                                    key="create"
                                    className={`finish primary`}
                                    afterUpdate={onFinish}
                                    mutation={createMutation}
                                    variables={createVariables}
                                >
                                    Create
                                </AsyncButton>
                            ) : status === updating ? (
                                <AsyncButton
                                    key="update"
                                    className={`finish primary`}
                                    afterUpdate={onFinish}
                                    mutation={updateMutation}
                                    variables={updateVariables}
                                >
                                    Save
                                </AsyncButton>
                            ) : status === deleting ? (
                                <AsyncButton
                                    key="delete"
                                    className={`finish danger primary`}
                                    afterUpdate={onFinish}
                                    mutation={deleteMutation}
                                    variables={deleteVariables}
                                >
                                    DELETE
                                </AsyncButton>
                            ) : null}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
