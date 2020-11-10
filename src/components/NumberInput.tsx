import React, {useState} from "react";
import './NumberInput.scss'
import {separateMoneyValue} from "../util";

interface InputProps {
    input:{
        onChange:(value:string)=>void //React.ChangeEventHandler
        value:string
    }
}
const NumberInput:React.FC<InputProps> = (props)=>{
    let {onChange,value} = props.input;

    const [innerValue ,setInnerValue] = useState(value);

    function intercept(e: React.ChangeEvent) {
         //@ts-ignore
        let val:string = e.target.value;
        val = val.replace(/[^0-9.]/g,'');

        onChange(val);
        setInnerValue(separateMoneyValue(val))
    }
    return(<input className="number-input" type="text" value={innerValue} onChange={intercept}/>)
};

export default NumberInput