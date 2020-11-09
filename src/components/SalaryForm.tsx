import './SalaryForm.scss';
import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import NumberInput from "./NumberInput";



const SalaryForm:React.FC<InjectedFormProps> = (props) =>{
    const {handleSubmit, reset} = props;

    return (
            <form className={"form-salary"} onSubmit={handleSubmit(console.log)}>
                <h3>Сумма</h3>
                <div className="inputsBox">
                <div className="form-check">
                    <Field component={"input"} type="radio" name="salaryCase" id="exampleRadios1"
                           value="option1" />
                        <label htmlFor="exampleRadios1">
                            Оклад за месяц
                        </label>
                </div>
                <div className="form-check">
                    <Field component={"input"} type="radio" name="salaryCase" id="exampleRadios2"
                           value="option2"/>
                        <label  htmlFor="exampleRadios2">
                            МРОТ
                        </label>
                </div>
                <div className="form-check">
                    <Field component={"input"} type="radio" name="salaryCase" id="exampleRadios3"
                           value="option3"/>
                        <label htmlFor="exampleRadios3">
                            Оплата за день
                        </label>
                </div>
                <div className="form-check">
                    <Field component={"input"} type="radio" name="salaryCase" id="exampleRadios4"
                           value="option4"/>
                        <label htmlFor="exampleRadios4">
                            Оплата за час
                        </label>
                </div>
                </div>
                <div className="inputsBox indented"><label>Указать с НДФЛ
                    <div className="custom-control custom-switch custom-switch-between">
                        <Field component="input" type="checkbox" name="NDFL" className="custom-control-input" id="customSwitch1"/>
                        <label className="custom-control-label" htmlFor="customSwitch1"></label>
                    </div>
                    Без НДФЛ</label></div>
                <div className="inputsBox indented">
                    <Field name="sum" component={NumberInput} type="text" id="sum"/><label className="r" htmlFor="sum">c</label>
                </div>

                <div>
                    <button type="button" onClick={reset}>Очистить форму</button>
                    <button type="submit">Отправить форму</button>
                </div>
            </form>

    )
};

export default reduxForm({form:'salary'})(SalaryForm)