import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';

type IAvatar = {
  src?: string;
  fullName?: string;
  styles?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

const AvatarContainer = styled.div`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background: rgb(3, 101, 250);
  background: linear-gradient(0deg, rgba(3, 101, 250, 1) 5%, rgba(255, 255, 255, 1) 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
`;
export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Avatar: FC<IAvatar> = (props) => {
  const { fullName, src, styles, ...restProps } = props;

  const lattersInsteadOfPicture = (fullName: string) => {
    const arr = fullName.split(' ');
    let res = '';
    if (arr.length === 2) {
      const firstLetter = arr[0][0];
      const secondLetter = arr[1][0];
      res = res + firstLetter + secondLetter;
    } else {
      const firstTwoLetters = arr[0].slice(0, 2);
      res += firstTwoLetters;
    }

    return <p style={{ textTransform: 'uppercase', background: 'transparent' }}>{res}</p>;
  };

  const content = () => {
    if (src) {
      return <AvatarImg src={src} />;
    }

    if (fullName) {
      return lattersInsteadOfPicture(fullName);
    }

    return null;
  };

  return (
    <AvatarContainer {...restProps} style={styles}>
      {content()}
    </AvatarContainer>
  );
};

export default Avatar;
