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
        expect(wrapper.state).toMatchSnapshot();
    });
    
    test('getFuncionario', () => {
        //arrumar
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

    /* const flushPromises = () => new Promise(resolve => setImmediate(resolve));
    test('button changeSenha', async () => {
        const onButtonClick = sinon.spy();
        global.sessionStorage.getItem.mockReturnValue('{"id": "28A5B171C9FF4FBFB4BC0481C0BD0435", "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyOEE1QjE3MUM5RkY0RkJGQjRCQzA0ODFDMEJEMDQzNSJ9.T4K4br5kaEboh4UIl_gkhYi3FcMD1Wk_bIcQWVv-tRc"}')
        const wrapper = shallow(<ChangeSenhaFuncionario />);
        await flushPromises();
        wrapper.find('.updateSenha').simulate('click', { preventDefault() {} });
        expect(onButtonClick.notCalled).toBe(true);
    }) */

    test('submitSenha()', () => {
        //arrumar
    });

    test('sendSenha', () => {
        //arrumar
    });

    
    
});
