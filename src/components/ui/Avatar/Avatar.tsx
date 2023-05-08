import React, { FC } from 'react';
import './Avatar.scss';
type IAvatar = {
  src?: string;
  title?: string;
  styles?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

const Avatar: FC<IAvatar> = (props) => {
  const { title, src, styles, ...restProps } = props;

  const lattersInsteadOfPicture = (title: string) => {
    const arr = title.split(' ');
    let res = '';
    if (arr.length === 2) {
      const firstLetter = arr[0][0];
      const secondLetter = arr[1][0];
      res = res + firstLetter + secondLetter;
    } else {
      const firstTwoLetters = arr[0].slice(0, 2);
      res += firstTwoLetters;
    }

    return <p style={{ textTransform: 'uppercase' }}>{res}</p>;
  };

  const content = () => {
    if (src) {
      return <img src={src} />;
    }

    if (title) {
      return lattersInsteadOfPicture(title);
    }

    return null;
  };

  return (
    <div className="avatar" {...restProps} style={styles}>
      {content()}
    </div>
  );
};

export default Avatar;
