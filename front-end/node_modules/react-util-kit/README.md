# react-util-kit

react-util-kit is a small library focused on common operations with React simple and readable by wrapping them in components.
react-util-kit is primarily concerned with behaviour, not styling nor boilerplate. I don't make any assumptions about how you want to style or structure your code.

## Installation

```
npm install --save react-util-kit
```

## Use

Import the whole library like this:
`import reactUtils from 'react-util-kit'`

Or use individual components:

```
import { ConditionallyRender, Dropdown } from 'react-util-kit'
```

## Components

### ConditionallyRender

#### Import

```
import { ConditionallyRender } from 'react-util-kit'
```

#### Description

The ConditionallyRender component makes conditional rendering in React simple and readable. It takes an expression, component to render if expression is true and alternatively a component to render if the expression is false.

The component takes the following Props:

```
ifTrue: boolean,
show: React Component,
elseShow: React Component,
```

Examples:

```
class SomeClass extends Component {
    constructor(props) {
        super(props);

        this.state {
            show: false;
        }
    }

    handleButtonClick = () => this.setState(prevState => ({ show: !prevState.show }))

    render() {
        <div className="container">
            <ConditionallyRender ifTrue={this.state.show} show={<Sidebar />} elseShow={<SomeContent />}/>
            <button onClick={this.handleButtonClick}>Show Sidebar</button>
        </div>
    }
}
```

### Dropdown

#### Import

```
import { Dropdown } from 'react-util-kit'
```

#### Description

The Dropdown component exposes a render method that sends through properties from the component. It gives you access to a dropdownOpen boolean, and methods for controlling this state.

It gives you the following properties through a render property:

```
dropdownOpen: boolean,
toggleDropdown: () => void (toggles dropdownOpen state)
closeDropdown: () => void (switches dropdownOpen to false)
openDropdown: () => void (switches dropdownOpen to true)
```

Examples:

JS:

```
class SomeClass extends Component {
    render() {
        <div className="container">
           <Dropdown render={(dropdownOpen, toggleDropdown) => {
                <ConditionallyRender ifTrue={dropdownOpen} show={<DropdownMenu />} />
                <button onClick={toggleDropdown}>Show dropdown menu</button>
           } }>
        </div>
    }
}
```
