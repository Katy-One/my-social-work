import React from 'react';

import {actions} from "../../redux/message-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.messagePage,
        // dialogs: state.messagePage.names,
        // textMessage: state.messagePage.textMessage,
        // message: state.messagePage.messagesList,

    };
};


export default compose<React.ComponentType>(connect(mapStateToProps, {...actions}), withAuthRedirect)(Dialogs)
