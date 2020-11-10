import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import SalaryForm from "./SalaryForm";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import { reducer as formReducer } from 'redux-form'


let container;
let store;
beforeEach(() => {
    // подготавливаем DOM-элемент, куда будем рендерить
    container = document.createElement("div");
    document.body.appendChild(container);

    store = createStore(combineReducers({form:formReducer}))
});

afterEach(() => {
    // подчищаем после завершения
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    store = null;
});

jest.mock("./Info", () => {
    return function Info(props) {
        return (
            <div data-testid="Info">
                {props.value}
            </div>
        );
    };
});


describe("Component SalaryForm",()=>{
    test("render with mocks",()=>{
        act(()=>{
            render(<Provider store={store}><SalaryForm /></Provider>, container)
        });
        expect(container.querySelectorAll("input").length).toBe(6);
        expect(container.querySelector("[data-testid=Info]").textContent).toContain("МРОТ - минимальный размер оплаты труда");
        expect(container.textContent).not.toContain("сотрудник будет получать на руки");
    });

    test("input form",()=>{
        let sum, NDFL, month,min,day,hour;
        act(()=>{
            render(<Provider store={store}><SalaryForm /></Provider>, container);

            // Элементы управления формы
            sum = container.querySelector(".number-input");
            NDFL = container.querySelector("[name=NDFL]");
            month = container.querySelector("[value=month]");
            min = container.querySelector("[value=min]");
            day = container.querySelector("[value=day]");
            hour = container.querySelector("[value=hour]");

            // проверяем поле ввода зарплаты
            Simulate.change(sum,{target:{value:"40000"}})

        });
        expect(store.getState().form.salary.values.sum).toBe("40000");

        // Прощелкиваем радиокнопки
        act(()=>{
            Simulate.change(month)
        });
        expect(store.getState().form.salary.values.salaryCase).toBe("month");

        act(()=>{
            Simulate.change(min)
        });
        expect(store.getState().form.salary.values.salaryCase).toBe("min");

        act(()=>{
            Simulate.change(day)
        });
        expect(store.getState().form.salary.values.salaryCase).toBe("day");

        act(()=>{
            Simulate.change(hour)
        });
        expect(store.getState().form.salary.values.salaryCase).toBe("hour");

        act(()=>{
            Simulate.change(NDFL,{target:{value:true}})
        });
        expect(store.getState().form.salary.values.NDFL).toBe(true);
        act(()=>{
            Simulate.change(NDFL,{target:{value:false}})
        });
        expect(store.getState().form.salary.values.NDFL).toBe(false);

    });

    test("calculate tax",()=>{
        let sum, NDFL, month, salaryGotten, NDFLCounted, salaryPayed;
        act(()=>{
            render(<Provider store={store}><SalaryForm /></Provider>, container);

            // Элементы управления формы
            sum = container.querySelector(".number-input");
            NDFL = container.querySelector("[name=NDFL]");
            month = container.querySelector("[value=month]");

            // Вводим зарплату и указвыаем, что это оплата за месяц
            Simulate.change(sum,{target:{value:"40000"}});
            Simulate.change(month);
        });

        // Проверяем, что рендерятся суммы с налогом
        expect(container.textContent).toContain("сотрудник будет получать на руки");

        // Вытаскиваем элементы, содержащие искомые цифры
        [salaryGotten, NDFLCounted, salaryPayed] = container.querySelector('.tax-computed').children;

        // Проверяем корректность рассчета налога

        // TODO Поменять форматирование при форматировании вывода цифр
        expect(salaryGotten.textContent).toContain("34 800");
        expect(NDFLCounted.textContent).toContain("5 200");
        expect(salaryPayed.textContent).toContain("40 000");

        // Переключаемся на указание вместе с налогом
        act(()=>{
            Simulate.change(NDFL,{target:{value:true}})
        });

        // Проверка цифр при рассчете вместе с налогом
        expect(salaryGotten.textContent).toContain("40 000");
        expect(NDFLCounted.textContent).toContain("5 977");
        expect(salaryPayed.textContent).toContain("45 977");
    })
});