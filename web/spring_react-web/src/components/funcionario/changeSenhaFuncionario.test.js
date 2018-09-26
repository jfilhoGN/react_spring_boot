import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import ChangeSenhaFuncionario from './changeSenhaFuncionario';

describe('changeSenhaFuncionario', () => {
    test('render component', () => {
        const wrapper = shallow(<ChangeSenhaFuncionario />);
        const component = wrapper.dive();
        expect(toJson(component)).toMatchSnapshot();
    });
    
    test('values of state', () => {
        const wrapper = shallow(<ChangeSenhaFuncionario/>)
        expect(wrapper.state().senhaAtual).toBe('');
        expect(wrapper.state().novaSenha).toBe('');
        expect(wrapper.state().confirmSenha).toBe('');
        expect(wrapper.state().open).toBe(false);
    });
    
    test('getFuncionario', () => {
        
    });

    test('input text senhaAntiga', () => {
        const wrapper = shallow(<ChangeSenhaFuncionario />);
        wrapper.find('#ioldSenha').simulate('change', { target: { value: '123456'} });
        expect(wrapper.state().senhaAtual).toEqual('123456');
    });
    
    test('input text novaSenha', () => {
        const wrapper = shallow(<ChangeSenhaFuncionario />);
        wrapper.find('#inewSenha').simulate('change',{ target: { value: '12345'} });
        expect(wrapper.state().novaSenha).toEqual('12345');
    });

    test('input text confirmSenha', () => {
        const wrapper = shallow(<ChangeSenhaFuncionario />);
        wrapper.find('#iconfirmSenha').simulate('change',{ target: { value: '12345'} });
        expect(wrapper.state().confirmSenha).toEqual('12345');
    });

    test('button changeSenha', () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<ChangeSenhaFuncionario />);
        wrapper.find('.updateSenha').simulate('click', { preventDefault() {} });
        expect(onButtonClick.notCalled).to.be.true
        
    });


    
    
});
