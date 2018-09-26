import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Tarefas from './tarefas';

describe('Tarefas', () => {
    test('render component', () => {
        const history = {
            goBack: jest.fn(),
        }
        global.sessionStorage.getItem.mockReturnValue('{"id": "28A", "token":"eyJ0eX"}')
        const wrapper = shallow(<Tarefas history={history}/>);
        expect(wrapper).toMatchSnapshot();
    });

    test('values state', () => {
        //arrumar
    });

    test('getTarefas()', () => {
        //arrumar
    });

    test('deleteClick()', () => {
        //arrumar
    });

    test('editClick()', () => {
        //arrumar
    });

    test('searchFilterFunction', () => {
        //arrrumar
    });

    test('changeStatus()', () => {
        //arrumar
    });

    test('renderTarefas()', () => {
        //arrumar
    });

});