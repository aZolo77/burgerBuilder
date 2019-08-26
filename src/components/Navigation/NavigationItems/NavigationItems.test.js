import React from 'react';

// ? jest & enzyme libs help to test the App (see docs)
// * { https://jestjs.io/docs/en/getting-started }
// * { https://airbnb.io/enzyme/docs/api }
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavItem from './NavItem/NavItem';

configure({
  adapter: new Adapter()
});

describe('NavigationItems Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />); // * те элементы, что хотим тестить
  });

  // * описание
  it('should render two <NavigationItems /> elements if not authenticated', () => {
    // * то,что ожидаем получить
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });

  it('should render three <NavigationItems /> elements if authenticated', () => {
    // * добавляем компоненту пропсы
    wrapper.setProps({
      isAuthenticated: true
    });
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });

  it('should render Logout Link', () => {
    wrapper.setProps({
      isAuthenticated: true
    });
    expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(
      true
    );
  });
});
