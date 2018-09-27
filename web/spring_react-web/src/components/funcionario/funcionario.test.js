import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Funcionario from './funcionario';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Funcionario', () => {

    test('render Funcionario ', () => {
        const history = {
            goBack: jest.fn(),
        }
        global.sessionStorage.getItem.mockReturnValue('{"id": "28A5B171C9FF4FBFB4BC0481C0BD0435", "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyOEE1QjE3MUM5RkY0RkJGQjRCQzA0ODFDMEJEMDQzNSJ9.T4K4br5kaEboh4UIl_gkhYi3FcMD1Wk_bIcQWVv-tRc"}');
        
        
        
        const mock = new MockAdapter(axios);
        mock.onGet('http://192.168.1.132:8080/api/colaboradores/me').reply(200,{headers:{
            'id': "28A5B171C9FF4FBFB4BC0481C0BD0435",
            'token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyOEE1QjE3MUM5RkY0RkJGQjRCQzA0ODFDMEJEMDQzNSJ9.T4K4br5kaEboh4UIl_gkhYi3FcMD1Wk_bIcQWVv-tRc"
        }});
        const wrapper = shallow(<Funcionario history={history} />);
        expect(wrapper).toMatchSnapshot();    
    });

    

    test('values of state', () => {
        /* const history = {
            goBack: jest.fn(),
        }
        global.sessionStorage.getItem.mockReturnValue('{"id": "28A", "token":"eyJ0eX"}')
        const wrapper = shallow(<Funcionario history={history} />); */
    });

    test('getFuncionario()', () => {
        //arrumar
    });

    test('componentDidMount()', () => {
        //arrumar
    });

    test('handleUpdate', () => {
        //arrumar
    });

    /* test('render component', () => {
        const history = {
            goBack: jest.fn()
        }
        const wrapper = shallow(<Funcionario history={history}/>);
        const component = wrapper.dive();
        expect(toJson(component)).toMatchSnapshot();
    });


    test('values of state', () => {
        const history = {
            goBack: jest.fn()
        }
        const wrapper = shallow(<Funcionario  history={history}/>)
        expect(wrapper.state()).toMatchSnapshot();

        //expect(history.goBack).toHaveBeenCalledTimes(1);
    }); */

});