import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Login from './login';

describe('<Login />', () => {
        
    test('render component', () => {
        const wrapper = shallow(<Login/>)
        expect(wrapper).toMatchSnapshot();
    });

    test('values of state', () => {
        const wrapper = shallow(<Login/>);
        //expect(wrapper.state).toMatchSnapshot();
        //arrumar
    });

    test('input text email', () => {
        const wrapper = shallow(<Login />);
        wrapper.find('#email').simulate('change',{ target: { value: '12345'} });
        expect(wrapper.state().email).toEqual('12345');
    });
       
    test('input text senha', () => {
        const wrapper = shallow(<Login />);
        wrapper.find('#senha').simulate('change',{ target: { value: '12345'} });
        expect(wrapper.state().senha).toEqual('12345');
    });

    test('button login', () => {
        //arrumar    
    });

    test('button addFuncionario', () => {
        //arrumar
    });

    test('acceptFuncionario()', () => {
        //arrumar
    });

    // Ver as funções handleChangeEmail e
    // handleChangeSenha 
    // addClick precisam fazer teste

    test('handleSubmit()', () => {
        //arrumar    
    });


});