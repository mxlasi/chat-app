import React from 'react';

class Hello extends React.Component {
render() {


    return (
        <div>
            <p>Hello {this.props.name}</p>
    <p>The color is {this.props.color}</p>
        </div>
    );
 }

}
export default Hello;