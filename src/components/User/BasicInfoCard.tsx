import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch} from "../../app/hooks";
import {Pane, setUserDetails, switchPane} from "../../features/sign-up/signUpSlice";
import {basicInfoInput} from "../../services/user/type";
import {basicInfoSchema} from "../../services/user/schema";
import {checkEmail} from "../../services/user";




export function BasicInfoCard() {
    const defaultValues: basicInfoInput = {
        name: "",
        email: ""
    }

    const {register, handleSubmit, setError, formState: {errors, isValid, isSubmitting}} = useForm<basicInfoInput>({
        defaultValues,
        mode: 'onChange',
        resolver: basicInfoSchema
    });
    const dispatch = useAppDispatch();


    const onSubmit: SubmitHandler<basicInfoInput> = async (data) => {
        try {
            const res = await checkEmail(data.email)
            if(res.data?.data.users > 0) {
                setError('email', {message: 'Email already exists'})
                return
            }
            dispatch(switchPane(Pane.Password))
            dispatch(setUserDetails(data))
        }
        catch (e) {
            alert('An error occurred, try again')
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className="input-group">
                    <label>Name</label>
                    <input type="text"
                           placeholder="Name"
                           className="form-control"
                           {...register("name")}
                    />
                    { errors.name && (<span className="validation-error">{errors.name.message}</span>)}
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input type="email"
                           placeholder="Email"
                           className="form-control"
                           {...register("email")
                           }/>
                    {errors.email &&  (<span className="validation-error"> {errors.email.message}</span>)}
                </div>
            </div>

            <div>
                <button className="submit-btn" type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? 'loading...' : 'Next'}</button>
            </div>
        </form>
    )

}