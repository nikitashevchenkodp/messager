import { render, screen } from '@testing-library/react';
import { mockMessageMeta } from 'mock/messageMeta';
import MessageMeta from './MessageMeta';
import React from 'react';
describe('MessageMeta', () => {
  it('Renders', async () => {
    const container = render(<MessageMeta meta={mockMessageMeta} />);
    const metaContainer = await container.findByTestId('message-meta');
    expect(metaContainer).toBeInTheDocument();
  });
  // it('It shows delivery time ', async () => {
  //   const container = render(<MessageMeta meta={mockMessageMeta} />);
  //   const time = await container.findByTestId('message-meta-time');
  //   expect(time).toBeInTheDocument();
  //   expect(time.textContent).toEqual('09:28');
  // });
  it('It shows "edited" if message was edited', async () => {
    const container = render(<MessageMeta meta={mockMessageMeta} />);
    const edited = await container.findByTestId('message-meta-edited');
    expect(edited).toBeInTheDocument();
  });
});
