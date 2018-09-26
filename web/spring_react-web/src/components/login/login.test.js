import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Login from './login';

describe('<Login />', () => {
        
    test('render component', () => {
            
    });
    

    test('values of state', () => {
        const wrapper = shallow(<Login/>)
        expect(wrapper.state().email).toBe('');
        expect(wrapper.state().senha).toBe('');
    });
        

    test('recebe valores corretamente', () => {
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

    
});