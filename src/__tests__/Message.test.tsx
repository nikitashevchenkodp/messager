import Message from 'components/center/Message';
import { render } from '@testing-library/react';
import { messages } from 'utils/mock/Messages';

describe('Message', () => {
  it('renders', () => {
    const container = render(
      <Message
        message={messages[1]}
        isOwn={true}
        isFirstInGroup={true}
        isLastInGroup={true}
        chatType={'group'}
        isSelectionModeOn={false}
        isSelected={false}
      />
    );
    const message = container.getByTestId(`msg-${messages[1].id}`);
    expect(message).toBeInTheDocument();
  });

  it('message tail', () => {
    const container = render(
      <Message
        message={messages[1]}
        isOwn={true}
        isFirstInGroup={true} //here
        isLastInGroup={true} //here
        chatType={'group'}
        isSelectionModeOn={false}
        isSelected={false}
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
    const container = render(
      <Message
        message={messages[0]} //here
        isOwn={false}
        isFirstInGroup={true} //here
        isLastInGroup={true} //here
        chatType={'group'}
        isSelectionModeOn={false}
        isSelected={false}
      />
    );

    // has avatar when it last message in group, and chatType === 'group', and isOwn === false.
    const msgAvatar = container.getByTestId('msg-avatar');
    expect(msgAvatar).toBeInTheDocument();
  });
});
