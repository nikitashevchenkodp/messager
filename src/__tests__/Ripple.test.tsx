import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Ripple from 'components/ui/Ripple';
import * as React from 'react';

const delay = async (ms = 500) => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};

describe('Ripple', () => {
  it('Renders', () => {
    const container = render(<Ripple />);
    const rippleContainer = container.getByTestId('ripple-container');
    expect(rippleContainer).toBeInTheDocument();
  });

  afterEach(() => jest.clearAllMocks());
  beforeEach(() => jest.clearAllMocks());

  it('Creates ripples', async () => {
    const container = render(<Ripple />);
    const rippleContainer = container.getByTestId('ripple-container');
    expect(rippleContainer).toBeInTheDocument();

    userEvent.click(rippleContainer);
    userEvent.click(rippleContainer);
    userEvent.click(rippleContainer);

    const ripples = container.getAllByTestId('ripple-item');
    expect(ripples.length).toBe(3);
    //Clean all ripples after 600ms

    await delay(800);

    const allRipples = container.queryAllByTestId('ripple-item');
    expect(allRipples.length).toBe(0);
  });

  it('It calls all state setter', async () => {
    const ripples = [] as unknown[];
    const setRipples = jest.fn();
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [ripples, setRipples]);
    const container = render(<Ripple />);
    const rippleContainer = container.getByTestId('ripple-container');
    expect(rippleContainer).toBeInTheDocument();

    userEvent.click(rippleContainer);
    userEvent.click(rippleContainer);
    userEvent.click(rippleContainer);

    expect(setRipples).toBeCalledTimes(3);

    await delay(800);

    expect(setRipples).toBeCalledTimes(4);
  });
});
