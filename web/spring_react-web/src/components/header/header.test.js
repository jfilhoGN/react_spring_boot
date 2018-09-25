import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from './header'

describe('Header', () => {

    //se o componente esta renderizando
    describe('return', () => {
        test('render the component', () => {
            const wrapper = shallow(<Header/>);
            const component = wrapper.dive();
            expect(toJson(component)).toMatchSnapshot();
        });
    });

    describe('NavBar', () => {
        test('click button logout sucessfully', () => {
            const mockOnClick = jest.fn();
            const wrapper = shallow(
                <Header />
            );
            /* const component = wrapper.dive();
            component.find('NavLink').simulate('click');
            expect(mockOnClick.mock.calls.lenght).toEqual(1); */
        });
        
    });
    
});