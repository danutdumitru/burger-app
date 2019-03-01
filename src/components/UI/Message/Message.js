import React, { Component } from 'react';
import {connect} from 'react-redux';

import Modal from '../Modal/Modal';
import * as actionReducers from '../../../store/actions';

class Message extends Component {    
    render() {
        return this.props.message? (
            <Modal show={true} onModalClose={this.props.clearMessageHandler}>
                <h1>{this.props.message}</h1>
            </Modal>        
        ): null;
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.message.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearMessageHandler: () => dispatch(actionReducers.clearMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);