import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Home from './home';

describe('<Home />', () => {
    describe('render()', () => {
        test('render component', () => {
            const wrapper = shallow(<Home />);
            const component = wrapper.dive();
            expect(toJson(component)).toMatchSnapshot();
        });
    });
        
});
