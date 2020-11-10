import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import Info from "./Info";

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

describe('component Info',()=>{
    test('render',()=>{
        act(()=>{
            render(
                <Info value="Lorem ipsum dolor sit amet"/>
                ,container);
        });
        expect(container.innerHTML).toContain('i');
        expect(container.innerHTML).not.toContain('Lorem ipsum dolor sit amet');

    });
    test('events mouseOver mouseOut',()=>{
        let icon;
        act(()=>{
            render(
                <Info value="Lorem ipsum dolor sit amet"/>
                ,container);
            icon = document.querySelector('.icon');
            Simulate.mouseOver(icon,{});

        });
        expect(container.innerHTML).toContain('Lorem ipsum dolor sit amet');
        act(()=>{
            Simulate.mouseOut(icon);
        });
        expect(container.innerHTML).not.toContain('Lorem ipsum dolor sit amet');
    });
    test('event click',()=>{
        let icon;
        act(()=>{
            render(
                <Info value="Lorem ipsum dolor sit amet"/>
                ,container);
            icon = document.querySelector('.icon');
            Simulate.click(icon,{});

        });
        expect(container.innerHTML).toContain('Lorem ipsum dolor sit amet');
        act(()=>{
            Simulate.click(icon);
        });
        expect(container.innerHTML).not.toContain('Lorem ipsum dolor sit amet');

    });
});