import Button from 'components/shared/Button';
import React from 'react';
import { DeletionConfirmContainer } from './styled';

const DeletionConfirm = ({ confirm, cancel }: any) => {
  return (
    <DeletionConfirmContainer>
      <p>DeletionConfirm</p>
      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginTop: '40px',
          width: '100%',
          justifyContent: 'center'
        }}>
        <Button onClick={confirm} style={{ background: 'red', color: '#fff', padding: '8px 16px' }}>
          Confirm
        </Button>
        <Button
          onClick={cancel}
          style={{ background: '#fff', color: 'black', padding: '8px 16px' }}>
          Cancel
        </Button>
      </div>
    </DeletionConfirmContainer>
  );
};

export default DeletionConfirm;
