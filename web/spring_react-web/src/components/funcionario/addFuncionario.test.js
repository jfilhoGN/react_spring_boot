import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import AddFuncionario from './addFuncionario'

describe('AddFuncionario', () => {

    test('render component', () => {
        const wrapper = shallow(<AddFuncionario match={{params: {id: 1}}}/>);
        const component = wrapper.dive();
        expect(toJson(component)).toMatchSnapshot();
    });
    
    test('values of state', () => {
        const wrapper = shallow(<AddFuncionario  match={{params: {id: 10444}}}/>)
        expect(wrapper.state()).toMatchSnapshot();
    });

    test('input text nome', () => {
        const wrapper = shallow(<AddFuncionario match={{params:{id:1}}}/>);
        wrapper.find('#nome').simulate('change', { target: { value: 'John'} });
        expect(wrapper.state().nome).toEqual('John');
    });

    test('input text email', () => {
        const wrapper = shallow(<AddFuncionario match={{params:{id:1}}}/>);
        wrapper.find('#email').simulate('change', { target: { value: 'john@123.com'} });
        expect(wrapper.state().email).toEqual('john@123.com');
    });

    test('input text cpf', () => {
        const wrapper = shallow(<AddFuncionario match={{params:{id:1}}}/>);
        wrapper.find('#cpf').simulate('change', { target: { value: '000'} });
        expect(wrapper.state().cpf).toEqual('000');
    });

    test('input text senha', () => {
        const wrapper = shallow(<AddFuncionario match={{params:{id:1}}}/>);
        wrapper.find('#senha').simulate('change', { target: { value: '123mudar'} });
        expect(wrapper.state().senha).toEqual('123mudar');
    });

    test('button addFuncionario', () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<AddFuncionario match={{params:{id:1}}} />);
        wrapper.find('.buttonAdd').simulate('click', { preventDefault() {} });
        expect(onButtonClick.notCalled).toBe(true);
    });

    test('input text editNome', () => {
        const wrapper = shallow(<AddFuncionario match={{params:{id:1}}}/>);
        wrapper.setState({hasEdit:true});
        wrapper.find('#nomeEdit').simulate('change', { target: { value: 'John'} });
        expect(wrapper.state().nome).toEqual('John');
    });
    
    test('input text editEmail', () => {
        const wrapper = shallow(<AddFuncionario match={{params:{id:1}}}/>);
        wrapper.setState({hasEdit:true});
        wrapper.find('#emailEdit').simulate('change', { target: { value: 'john@123.com'} });
        expect(wrapper.state().email).toEqual('john@123.com');
    });

    test('input text editCpf', () => {
        const wrapper = shallow(<AddFuncionario match={{params:{id:1}}}/>);
        wrapper.setState({hasEdit:true});
        wrapper.find('#cpfEdit').simulate('change', { target: { value: '999'} });
        expect(wrapper.state().cpf).toEqual('999');
    });

    test('button updateFuncionario', () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<AddFuncionario match={{params:{id:1}}} />);
        wrapper.setState({hasEdit:true});
        wrapper.find('.buttonUpdate').simulate('click', { preventDefault() {} });
        expect(onButtonClick.notCalled).toBe(true);
    });

    test('render dialog', () => {
        const wrapper = shallow(<AddFuncionario match={{params:{id:1}}}/>);
        wrapper.setState({hasFuncionario:true});
        expect(wrapper).toMatchSnapshot();
    })

    test('button sim Dialog', () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<AddFuncionario match={{params:{id:40}}}/>);
        
    });

    //handleUpdate
    //componentDidMount
    
});