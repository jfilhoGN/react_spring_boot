import React from 'react';
import {shallow} from 'enzyme';
import AddTarefas from './addtarefas';


describe('AddTarefas', () => {
    
    test('render component', () => {
        const history = {
            goBack: jest.fn(),
        }
        global.sessionStorage.getItem.mockReturnValue('{"id": "28A", "token":"eyJ0eX"}')
        const wrapper = shallow(<AddTarefas history={history} match={{params: {id: 1}}}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('values of state', () => {
        const wrapper = shallow(<AddTarefas history={history} match={{params: {id: 1}}}/>)
        expect(wrapper.state).toMatchSnapshot();
    });

    test('input text value titulo', () => {
        const wrapper = shallow(<AddTarefas match={{params: {id: 1}}}/>);
        wrapper.find('#titulo').simulate('change', { target: { value: 'titulo'} });
        expect(wrapper.state().titulo).toEqual('titulo');
    });

    test('input text value descricao', () => {
        const wrapper = shallow(<AddTarefas match={{params: {id: 1}}}/>);
        wrapper.find('#descricao').simulate('change', { target: { value: 'descricao descricao'} });
        expect(wrapper.state().descricao).toEqual('descricao descricao');
    });

    test('input text value status', () => {
        const wrapper = shallow(<AddTarefas match={{params:{id:1}}}/>);
        wrapper.find('.status').simulate('change', { value: 1} );
        expect(wrapper.state().status).toEqual(1);
    });

    test('button addTarefa', () => {
        //arrumar
    });

    test('input text editTitulo', () => {
        const wrapper = shallow(<AddTarefas match={{params:{id:1}}}/>);
        wrapper.setState({hasEdit:true})
        wrapper.find('#editTitulo').simulate('change',{target:{value: 'Titulo titulo'}});
        expect(wrapper.state().titulo).toEqual('Titulo titulo')
    });

    test('input text editDescricao', () => {
        const wrapper = shallow(<AddTarefas match={{params:{id:1}}}/>);
        wrapper.setState({hasEdit:true})
        wrapper.find('#editDescricao').simulate('change',{target:{value: 'Descricao descricao'}});
        expect(wrapper.state().descricao).toEqual('Descricao descricao');
    });

    test('input text editStatus', () => {
        const wrapper = shallow(<AddTarefas match={{params:{id:1}}}/>);
        wrapper.setState({hasEdit:true})
        wrapper.find('#editTitulo').simulate('change',{target:{value: 'Titulo titulo'}});
        expect(wrapper.state().titulo).toEqual('Titulo titulo')
    });

    test('button editTarefa', () => {
        //arrumar
    });

    test('getFuncionario()', () => {
        //arrumar
    });

    // ver se handleTituloTarefa, descricao e status
    // necessitam fazer teste
    // componentDidMount
    // handleReturnAddTarefa
    // handlereturnTarefa

    test('handleSubmitTarefa()', () => {
        //arrumar
    });

    test('getDados()', () => {
        //arrumar
    });

    test('handleUpdate()', () => {
        //arrumar
    });



});