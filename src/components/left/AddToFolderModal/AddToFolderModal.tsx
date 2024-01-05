import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import { useFlag } from 'hooks/useFlag';
import { FC, useMemo, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import './AddToFolderModal.scss';
import FoldersGroup from './FoldersGroup/FoldersGroup';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  chatId: string;
};

const AddToFolderModal: FC<Props> = ({ isOpen, onClose, chatId }) => {
  const [isAddFolderOpen, closeAddFolder, openAddFolder] = useFlag();
  const [folderName, setFolderName] = useState('');

  const foldersById = useAppSelector((state) => state.entities.folders.byId);

  const defaultSelected = useMemo(() => {
    return Object.values(foldersById).reduce((res, folder) => {
      const checked = folder.includedChatIds.includes(chatId);
      if (checked) {
        res.push(folder.id);
      }
      return res;
    }, [] as string[]);
  }, [foldersById]);

  const addFolder = () => {
    closeAddFolder();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="AddToFolderModal">
        <h5 className="AddToFolderModal-title">Add to folder</h5>
        <FoldersGroup items={Object.values(foldersById)} defaultSelected={defaultSelected} />

        <Button color="primary" fullWidth onClick={openAddFolder}>
          Add new folder
        </Button>
        {isAddFolderOpen && (
          <div className="AddToFolderModal-addFolder">
            <input value={folderName} onChange={(e) => setFolderName(e.target.value)} />
            <Button onClick={closeAddFolder}>Cancel</Button>
            <Button color="primary" onClick={addFolder}>
              Create
            </Button>
          </div>
        )}
        <div className="AddToFolderModal-footer">
          <Button onClick={onClose}>Cancel</Button>
          <Button color="primary">Confirm</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddToFolderModal;
