import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import NumberInput from "./NumberInput";

let container;

beforeEach(() => {
    // подготавливаем DOM-элемент, куда будем рендерить
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // подчищаем после завершения
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});


describe("NumberInput",()=>{
    test("Render",()=>{
        act(()=>{
            render(<NumberInput input={{value:'2151'}}/>,container);
        });
        expect(container.innerHTML).toContain('input');
        expect(container.innerHTML).toContain('type="text"');
        expect(container.innerHTML).toContain('value="2151"');

    });
    test("Input correct value",()=>{
        let input;
        let val = "11";
        const change=jest.fn();
        act(()=>{
            render(<NumberInput input={{value:val,onChange:change}}/>,container);
            input = document.querySelector('input');
            Simulate.change(input,{target:{value:'850'}});
            val = "850"
        });
        expect(change).toBeCalledWith("850");
        expect(input.value).toBe("850")

    });
    test("Check discharges division",()=>{
        let input;
        let val = "11";
        const change=jest.fn();
        act(()=>{
            render(<NumberInput input={{value:val,onChange:change}}/>,container);
            input = document.querySelector('input');
            Simulate.change(input,{target:{value:'12850'}});
            val = "12850"
        });
        expect(change).toBeCalledWith("12850");
        expect(input.value).toBe("12 850")
    });
    test("Input incorrect value",()=>{
        let input;
        let val = "11";
        const change=jest.fn();
        act(()=>{
            render(<NumberInput input={{value:val,onChange:change}}/>,container);
            input = document.querySelector('input');
            Simulate.change(input,{target:{value:'Fake'}});
            //val = ""
        });
        expect(change).toBeCalledWith("");
        expect(input.value).toBe("")
    });
});