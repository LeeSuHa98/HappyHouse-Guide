import React, { Component, Fragment } from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  toggleDropdown = () => {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
  };

  openDropdown = () => {
    this.setState({ dropdownOpen: true });
  };

  closeDropdown = () => {
    this.setState({ dropdownOpen: false });
  };

  render() {
    const { dropdownOpen } = this.state;
    return (
      <Fragment>{this.props.render(dropdownOpen, this.toggleDropdown, this.openDropdown, this.closeDropdown)}</Fragment>
    );
  }
}

export default Dropdown;
