import Message from 'components/center/Message';
import { render } from '@testing-library/react';
import { messages } from 'utils/mock/Messages';
import { renderWithRedux } from 'utils/tests/wrapper';

describe('Message', () => {
  it('renders', () => {
    const { container } = renderWithRedux(
      <Message
        message={messages[1]}
        isOwn={true}
        isFirstInGroup={true}
        isLastInGroup={true}
        chatType={'group'}
        isSelectionModeOn={false}
        isSelected={false}
        selectMessage={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    const message = container.getByTestId(`msg-${messages[1].id}`);
    expect(message).toBeInTheDocument();
  });

  it('message tail', () => {
    const { container } = renderWithRedux(
      <Message
        message={messages[1]}
        isOwn={true}
        isFirstInGroup={true} //here
        isLastInGroup={true} //here
        chatType={'group'}
        isSelectionModeOn={false}
        isSelected={false}
        selectMessage={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    // has tail when last in group or single in group(first and last)
    const msgTail = container.getByTestId('msg-tail');
    expect(msgTail).toBeInTheDocument();

    //has own tail when userid === message.from.id
    const msgTailOwn = container.getByTestId('msg-tail-own');
    expect(msgTailOwn).toBeInTheDocument();
  });
  it('message avatar', () => {
    const { container } = renderWithRedux(
      <Message
        message={messages[0]} //here
        isOwn={false}
        isFirstInGroup={true} //here
        isLastInGroup={true} //here
        chatType={'group'}
        isSelectionModeOn={false}
        isSelected={false}
        selectMessage={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    // has avatar when it last message in group, and chatType === 'group', and isOwn === false.
    const msgAvatar = container.getByTestId('msg-avatar');
    expect(msgAvatar).toBeInTheDocument();
  });
});
