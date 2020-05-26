import React from 'react';

import {addMessageActionCreator} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {withRouter} from "react-router-dom";


let mapStateToProps = (state) => {
    return {
        dialogs: state.messagePage.names,
        textMessage: state.messagePage.textMessage,
        message: state.messagePage.messagesList,

    };
};


export default compose(connect(mapStateToProps, { addMessageActionCreator}), withRouter, withAuthRedirect)(Dialogs)
