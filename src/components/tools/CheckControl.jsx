import { bool, func, string } from 'prop-types';
import React, { Component } from 'react';
import SvgSymbol from './SvgSymbol';

class CheckControl extends Component {
  static propTypes = {
    action: string,
    active: bool,
    checkId: string,
    disabled: bool,
    keyDown: func,
    mouseUp: func,
    name: string
  }

  state = {
    checkActive: false,
    toggledTimeout: null
  }

  componentWillMount() {
    this.setState({ checkActive: this.props.active });
  }

  componentWillUnmount() {
    clearTimeout(this.state.toggledTimeout);
  }

  getCheckMode = () => {
    const { name } = this.props;
    const { checkActive } = this.state;

    return `check-control ${name}${checkActive ? ' active' : ''}`;
  }

  onCheckKeyDown = e => {
    const { keyDown } = this.props;

    if (e.keyCode !== 9) e.preventDefault();
    if (e.keyCode === 13 || e.keyCode === 32) {
      this.checkLabel.click();
      keyDown(e);
    }

    if (e.keyCode === 27) this.checkControl.blur();
  }

  render() {
    const { action, active, checkId, disabled, mouseUp } = this.props;
    const { checkActive } = this.state;

    return (
      <div className={this.getCheckMode()}
        data-action={action}
        onKeyDown={this.onCheckKeyDown}
        ref={ref => this.checkControl = ref}
        tabIndex="0"
      >
        <input id={checkId}
          defaultChecked={checkActive}
          disabled={disabled}
          ref={ref => this.checkInput = ref}
          tabIndex="-1"
          type="checkbox"
        />
        <label htmlFor={checkId}
          onMouseUp={e => { if (!disabled) mouseUp(e); }}
          ref={ref => this.checkLabel = ref}
          tabIndex="-1"
        >
          <div className="check-target">
            <SvgSymbol symbolId="#icon-check" />
          </div>
        </label>
      </div>
    );
  }
}

export default CheckControl;
