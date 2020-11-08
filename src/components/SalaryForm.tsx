import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";



const SalaryForm:React.FC<InjectedFormProps> = (props) =>{
    const {handleSubmit, reset} = props;
    return (
            <form onSubmit={handleSubmit}>
                <h3>Salary form</h3>
                {/* принимает имя поля, тип и остальные свойства, которые расмотрим позже*/}
                <Field name="title" component="input" type="text"/>
                <Field name="text" component="input" type="text"/>
                <div>
                    <button type="button" onClick={reset}>Очистить форму</button>
                    <button type="submit">Отправить форму</button>
                </div>
            </form>

    )
};

export default reduxForm({form:'salary'})(SalaryForm)