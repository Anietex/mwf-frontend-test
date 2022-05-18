import {BasicInfoCard} from "../../components/User/BasicInfoCard";
import {PasswordCard} from "../../components/User/PasswordCard";

import {selectDisplayedCardPane, Pane} from './signUpSlice'
import {useAppSelector} from "../../app/hooks";
import {SuccessCard} from "../../components/User/SuccessCard";


export function SignUp() {
    const displayedCardPane = useAppSelector(selectDisplayedCardPane);
    return (<div className="sign-up">
        <div className="sign-up-card">

            <div className="card-header">
                <h3>Sign Up</h3>
            </div>
            <div className="card-body">
                { displayedCardPane === Pane.Basic &&  <BasicInfoCard/> }
                { displayedCardPane === Pane.Password &&    <PasswordCard/> }
                { displayedCardPane === Pane.Success &&    <SuccessCard/> }
            </div>
        </div>
    </div>)

}