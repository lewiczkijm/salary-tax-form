import React, {useState} from "react";
import "./Info.scss"

interface InfoProps {
    value:string
}
const Info:React.FC<InfoProps> = ({value}) =>{
    const [show,setShow] = useState(false);
    const [fix,setFix] = useState(false);
    const [selectedIcon,setSelectedIcon] = useState(0);

    const icons = ['i','x'];

    const showInfo = ()=>{
        setShow(true);
    };
    const hideInfo = ()=>{setShow(false)};

    const click = (e:React.MouseEvent)=>{
        e.preventDefault();
        setFix(!fix);
        setSelectedIcon((selectedIcon)?0:1)
    };
    return(
        <div className="info">
            <div onMouseOver={showInfo} onMouseOut={hideInfo} onClick={click} className="icon">
                <span>{icons[selectedIcon]}</span>
            </div>
            {(show || fix) && <div className="banner">
                <div> </div>
                <div>{value}</div>
            </div>}
        </div>
    )
};

export default Info;