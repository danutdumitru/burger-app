import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("NavigationItems", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should return two NavigationItem when not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("WHEN authenticated SHOULD return three NavigationItem", () => {
    wrapper.setProps({
      tokenId: "123"
    });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
