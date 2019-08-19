import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import Controls from './Controls';

describe('<Controls />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Controls />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('toggleClosed function upon event click', () => {
    const toggledClosed = jest.fn();
    const controls = render(<Controls toggleClosed={toggledClosed} />);
    const gateButton = controls.getByText(/close gate/i);

    fireEvent.click(gateButton);

    expect(toggledClosed).toHaveBeenCalled();
  });

  it('should display "Lock Gate" and "Close Gate" when props are false', () => {
    const props = {
      locked: false,
      closed: false,
    };

    const controls = render(
      <Controls locked={props.locked} closed={props.closed} />,
    );

    expect(controls.getByText(/lock gate/i).textContent).toBe('Lock Gate');
    expect(controls.getByText(/close gate/i).textContent).toBe('Close Gate');
  });

  it('should display "Unlock Gate" and "Open Gate" when props are true', () => {
    const props = {
      locked: true,
      closed: true,
    };

    const controls = render(
      <Controls locked={props.locked} closed={props.closed} />,
    );

    expect(controls.getByText(/unlock gate/i).textContent).toBe('Unlock Gate');
    expect(controls.getByText(/open gate/i).textContent).toBe('Open Gate');
  });

  it('the closed toggle button is disabled if the gate is locked', () => {
    const props = {
      locked: true,
      closed: true,
    };

    const controls = render(
      <Controls locked={props.locked} closed={props.closed} />,
    );

    expect(
      controls.getByText(/open gate/i).hasAttribute('disabled'),
    ).toBeTruthy();
  });

  it('the locked toggle button is disabled if the gate is open', () => {
    const props = {
      locked: false,
      closed: false,
    };

    const controls = render(
      <Controls locked={props.locked} closed={props.closed} />,
    );

    expect(
      controls.getByText(/lock gate/i).hasAttribute('disabled'),
    ).toBeTruthy();
  });
});
