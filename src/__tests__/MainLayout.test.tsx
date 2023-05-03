import MainLayout from '../layouts/MainLayout';
import { waitFor } from '@testing-library/react';
import { renderWithRedux } from '../utils/tests/wrapper';
import { uiActions } from 'store/slices';

describe('MainLayout', () => {
  it('Renders', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });
    const { container } = renderWithRedux(<MainLayout />);
    const layout = container.getByTestId('mainlayout');
    expect(layout).toBeInTheDocument();

    //If it is big screen(more than 900 px), it will not have aria-expanded.
    const isLeftExpanded = container.getByTestId('left').getAttribute('aria-expanded');
    const isRightExpanded = container.getByTestId('center').getAttribute('aria-expanded');
    expect([isLeftExpanded, isRightExpanded]).toStrictEqual([null, null]);
  });

  //If it is big screen(more than 900 px), it will HAVE aria-expanded.
  it('Renders on small screen', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });
    const { container } = renderWithRedux(<MainLayout />);
    const layout = container.getByTestId('mainlayout');
    expect(layout).toBeInTheDocument();

    const isLeftExpanded = container.getByTestId('left').getAttribute('aria-expanded');
    const isRightExpanded = container.getByTestId('center').getAttribute('aria-expanded');
    expect([isLeftExpanded, isRightExpanded]).toStrictEqual(['true', 'false']);
  });

  it('Switching between columns', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });
    const { container, store } = renderWithRedux(<MainLayout />);

    //Default
    const isLeftExpanded = container.getByTestId('left').getAttribute('aria-expanded');
    const isRightExpanded = container.getByTestId('center').getAttribute('aria-expanded');
    expect([isLeftExpanded, isRightExpanded]).toStrictEqual(['true', 'false']);

    //Hide left column and show center clumn/

    await waitFor(async () => {
      store.dispatch(uiActions.openCenter());
      const leftColumn = await container.findByTestId('left');
      const leftColAriaExp = leftColumn.getAttribute('aria-expanded');
      const rightColumn = await container.findByTestId('center');
      const rightColAriaExp = rightColumn.getAttribute('aria-expanded');
      expect([leftColAriaExp, rightColAriaExp]).toStrictEqual(['false', 'true']);
    });

    // Hide left and move back to center column

    await waitFor(async () => {
      store.dispatch(uiActions.closeCenter());
      const leftColumn = await container.findByTestId('left');
      const leftColAriaExp = leftColumn.getAttribute('aria-expanded');
      const rightColumn = await container.findByTestId('center');
      const rightColAriaExp = rightColumn.getAttribute('aria-expanded');
      expect([leftColAriaExp, rightColAriaExp]).toStrictEqual(['true', 'false']);
    });
  });

  it('Right column open/close', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });
    const { container, store } = renderWithRedux(<MainLayout />);
    const right = container.getByTestId('right');
    const isRightExpanded = right.getAttribute('aria-expanded');
    expect(isRightExpanded).toStrictEqual('false');

    // Open right
    await waitFor(async () => {
      store.dispatch(uiActions.openRight());
      const rightColumn = await container.findByTestId('right');
      const rightColAriaExp = rightColumn.getAttribute('aria-expanded');
      expect(rightColAriaExp).toStrictEqual('true');
    });

    // Close right
    await waitFor(async () => {
      store.dispatch(uiActions.closeRight());
      const rightColumn = await container.findByTestId('right');
      const rightColAriaExp = rightColumn.getAttribute('aria-expanded');
      expect(rightColAriaExp).toStrictEqual('false');
    });
  });
});
