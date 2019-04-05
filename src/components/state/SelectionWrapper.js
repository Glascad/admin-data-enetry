import { PureComponent } from 'react';
// import PropTypes from 'prop-types';

/**
 * PURPOSE
 * 
 * The SelectionWrapper manages the state of which item in a list is selected. It also tracks whether the item is being deleted or a new item is being added to the list. It provides its children with a `selectedNID`, which is the [identifier] of the selected item, as well as with `creating`/`deleting` booleans and methods to select/delete an item and to create a new item.
 * 
 * 
 * USAGE
 * 
 * This component relies on the pattern of each component having an `arguments` prop and passing all props into each method received from a parent. It also relies on each item in an array having a `[identifier]` prop. The [identifier] is used for identification.
 * 
 * 
 * NOTE / REFACTOR
 * 
 * This component will eventually be merged into the ListWrapper component, because that is the only place that it will be used... (except maybe in the ListContainer component (maybe we will move it instead into the ListContainer component))
 * 
 */

export default class SelectionWrapper extends PureComponent {

    // static propTypes = {
    //     children: PropTypes.func.isRequired,
    // };

    static defaultProps = {
        identifier: "nodeId",
    };

    static initialState = {
        selectedNID: "",
        creating: false,
        deleting: false,
    };

    state = SelectionWrapper.initialState;

    cancel = () => this.setState(() => ({
        creating: false,
        deleting: false,
    }));

    handleSelect = ({ arguments: { [this.props.identifier]: id } }) => id !== this.state.selectedNID && this.setState({
        selectedNID: id,
        creating: false,
        deleting: false,
    });

    handleCreateClick = () => this.setState(() => ({
        selectedNID: "",
        creating: true,
        deleting: false,
    }));

    handleDeleteClick = ({ arguments: { [this.props.identifier]: id } }) => this.setState(() => ({
        selectedNID: id,
        creating: false,
        deleting: true,
    }));

    render = () => {
        const {
            state: {
                selectedNID,
                creating,
                deleting,
            },
            props,
            props: {
                children,
            },
            handleSelect,
            handleCreateClick,
            handleDeleteClick,
            cancel,
        } = this;

        return children({
            ...props,
            selectedNID,
            creating,
            deleting,
            cancel,
            handleSelect,
            handleCreateClick,
            handleDeleteClick,
        });
    }
}
