import React from 'react';

export default class Notice extends React.Component {
  state = {
    click: false,
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
    document.addEventListener('mouseup', this.handleUnclick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
    document.removeEventListener('mouseup', this.handleUnclick);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClick = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        click: true
      });
    }
  }

  handleUnclick = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        click: false
      });
    }
  }

  render() {
    const { click } = this.state;
    return (
      <div ref={this.setWrapperRef}>
        { click ? <div>Press and hold for half a second to reorder!</div> : <div>{this.props.message}</div> }
      </div>
    );
  }
}
