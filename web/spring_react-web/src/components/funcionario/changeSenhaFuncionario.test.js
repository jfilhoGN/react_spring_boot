import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import ChangeSenhaFuncionario from './changeSenhaFuncionario';

describe('changeSenhaFuncionario', () => {
    describe('render()', () => {
        test('render component', () => {
            const wrapper = shallow(<ChangeSenhaFuncionario />);
            const component = wrapper.dive();
            expect(toJson(component)).toMatchSnapshot();
        });
    });

    describe('getFuncionario', () => {
        
    });


    
});
