import './SalaryForm.scss';
import React from "react";
import  {formValueSelector,Field, InjectedFormProps, reduxForm} from "redux-form";
import {connect} from "react-redux";

import NumberInput from "./NumberInput";
import Info from "./Info";
import {separateMoneyValue} from "../util";


interface SalaryFormProps {
    salaryCase?:string
    NDFL?:string
    sum?:string
}
const SalaryForm:React.FC<InjectedFormProps> = (props) =>{
    const {handleSubmit, reset,salaryCase,NDFL,sum}: InjectedFormProps & SalaryFormProps = props;

    const TAX = 13; // Ставка по НДФЛ

    //
    let salaryPayed:number,     // Выплачиваемая сумма
        salaryGotten:number,    // Сумма на руки
        NDFLCounted:number;     // Сумма налога

    // Рассчет с НДФЛ
    if(NDFL){
        salaryGotten = Number(sum);
        // Обратный процент
        salaryPayed = ~~((salaryGotten * 100)/(100 - TAX));
        NDFLCounted = ~~(salaryPayed - salaryGotten);
    }
    // Рассчет без НДФЛ
    else{
        salaryPayed = Number(sum) ;
        NDFLCounted = ~~(salaryPayed * (TAX/100));
        salaryGotten = ~~(salaryPayed - NDFLCounted);
    }

    return (
            <form className={"form-salary"} onSubmit={handleSubmit(console.log)}>
                <h3>Сумма</h3>
                <div className="inputsBox">
                <div className="form-check">
                    <Field component={"input"} type="radio" name="salaryCase" id="exampleRadios1"
                           value="month" />
                        <label htmlFor="exampleRadios1">
                            Оклад за месяц
                        </label>
                </div>
                <div className="form-check">
                    <Field component={"input"} type="radio" name="salaryCase" id="exampleRadios2"
                           value="min"/>
                        <label  htmlFor="exampleRadios2">
                            МРОТ
                        </label><Info value="МРОТ - минимальный размер оплаты труда. Разный для разных регионов"/>
                </div>
                <div className="form-check">
                    <Field component={"input"} type="radio" name="salaryCase" id="exampleRadios3"
                           value="day"/>
                        <label htmlFor="exampleRadios3">
                            Оплата за день
                        </label>
                </div>
                <div className="form-check">
                    <Field component={"input"} type="radio" name="salaryCase" id="exampleRadios4"
                           value="hour"/>
                        <label htmlFor="exampleRadios4">
                            Оплата за час
                        </label>
                </div>
                </div>
                <div className="inputsBox indented"><label>Указать с НДФЛ
                    <div className="custom-control custom-switch custom-switch-between">
                        <Field component="input" type="checkbox" name="NDFL" className="custom-control-input" id="customSwitch1"/>
                        <label className="custom-control-label" htmlFor="customSwitch1"> </label>
                    </div>
                    Без НДФЛ</label>
                </div>
                <div className="inputsBox indented">
                    <Field name="sum" component={NumberInput} type="text" id="sum"/><label className="r" htmlFor="sum">c</label>
                </div>

                {salaryCase === "month" && sum &&
                <div className="tax-computed">
                    <p>{separateMoneyValue(salaryGotten)}<span className="r">c</span> сотрудник будет получать на руки</p>
                    <p>{separateMoneyValue(NDFLCounted)}<span className="r">c</span> НДФЛ, 13% от оклада</p>
                    <p>{separateMoneyValue(salaryPayed)}<span className="r">c</span> за сотрудника в месяц</p>
                </div>}
            </form>

    )
};
const selector = formValueSelector("salary");
const withReduxForm = reduxForm({form:'salary'})(SalaryForm);
const withConnect = connect(
    (state)=> selector(state, 'salaryCase','NDFL','sum')
)(withReduxForm);
export default withConnect