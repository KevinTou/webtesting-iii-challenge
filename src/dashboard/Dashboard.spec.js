import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';

import Dashboard from './Dashboard';

describe('<Dashboard />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Dashboard />);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  // Same test as defaulting to 'unlocked' and 'open'
  it('it shows the controls and display', () => {
    const dashboard = render(<Dashboard />);

    const lockStatus = dashboard.getByText(/unlocked/i);
    const gateStatus = dashboard.getByText(/open/i);
    const lockButton = dashboard.getByText(/lock gate/i);
    const gateButton = dashboard.getByText(/close gate/i);
  });

  it('cannot be closed or opened if it is locked', () => {
    const dashboard = render(<Dashboard />);

    expect(dashboard.queryByText(/Open Gate/i)).toBeFalsy();

    fireEvent.click(dashboard.getByText(/Close Gate/i));
    fireEvent.click(dashboard.getByText(/Lock Gate/i));

    expect(dashboard.queryByText(/Open Gate/i)).toBeTruthy();

    expect(
      dashboard.queryByText(/Open Gate/i).hasAttribute('disabled'),
    ).toBeTruthy();

    expect(
      dashboard.queryByText(/Unlock Gate/i).hasAttribute('disabled'),
    ).toBeFalsy();
  });
});
