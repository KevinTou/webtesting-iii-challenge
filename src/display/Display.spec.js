import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import Display from './Display';

describe('<Display />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Display />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('displays if gate is open and if it is unlocked', () => {
    let props = {
      closed: false,
      locked: false,
    };

    const display = render(
      <Display closed={props.closed} locked={props.locked} />,
    );

    expect(display.queryByText(/unlocked/i)).toBeTruthy();
    expect(display.queryByText(/open/i)).toBeTruthy();
  });

  it('displays if gate is closed and if it is locked', () => {
    let props = {
      closed: true,
      locked: true,
    };

    const display = render(
      <Display closed={props.closed} locked={props.locked} />,
    );

    expect(display.queryByText(/locked/i)).toBeTruthy();
    expect(display.queryByText(/closed/i)).toBeTruthy();
  });

  it('when unlocked or open use the green-led class', () => {
    let props = {
      closed: false,
      locked: false,
    };

    const { container } = render(
      <Display closed={props.closed} locked={props.locked} />,
    );

    const buttons = container.querySelectorAll('.led.green-led');
    const unlocked = buttons[0];
    const open = buttons[1];

    expect(unlocked.textContent).toBe('Unlocked');
    expect(open.textContent).toBe('Open');
  });

  it('when locked or closed use the red-led class', () => {
    let props = {
      closed: true,
      locked: true,
    };

    const { container } = render(
      <Display closed={props.closed} locked={props.locked} />,
    );

    const buttons = container.querySelectorAll('.led.red-led');
    const locked = buttons[0];
    const closed = buttons[1];

    expect(locked.textContent).toBe('Locked');
    expect(closed.textContent).toBe('Closed');
  });
});
