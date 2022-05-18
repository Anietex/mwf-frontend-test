import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Pane, setUserDetails, signupUser, switchPane} from "../../features/sign-up/signUpSlice";
import {passwordInputs} from "../../services/user/type";
import {passwordInfoSchema} from "../../services/user/schema";



export function PasswordCard() {
    const defaultValues: passwordInputs = {
        password: "",
        confirm_password: "",
    }

    const {register, handleSubmit, formState: {errors, isValid, isSubmitting}} = useForm<passwordInputs>({
        defaultValues,
        mode: 'onChange',
        resolver: passwordInfoSchema,
    });

    const dispatch = useAppDispatch();
    const {signUp: {user}} = useAppSelector((state) => state)


    const onSubmit: SubmitHandler<passwordInputs> = async (data) => {
       await dispatch(signupUser({email: user?.email, password: data.password, name: user?.name}))
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
                <label>Password</label>
                <input type="password" className="form-control"
                       {...register("password", {required: true, min: 8})}
                />
                {errors.password && (<span className="validation-error"> {errors.password.message}</span>)}
            </div>

            <div className="input-group">
                <label>Confirm Password</label>
                <input type="password" className="form-control"
                       {...register("confirm_password", {required: true, min: 8})}/>
                {errors.confirm_password && (<span className="validation-error">{errors.confirm_password.message}</span>)}
            </div>

            <div>
                <button className="submit-btn" disabled={!isValid || isSubmitting}>{isSubmitting ? 'loading...' : 'Sign up'}</button>
            </div>

        </form>
    )
}


