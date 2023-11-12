import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slices/modals.js';
import { selectModalInfo } from '../selectors/modals';
import getModal from './index';

const ModalDialog = () => {
  const dispatch = useDispatch();
  const modalInfo = useSelector(selectModalInfo);
  if (modalInfo.type === null) {
    return null;
  }
  const hideModal = () => {
    dispatch(actions.setModalInfo({ type: null, channel: null }));
  };
  const Modal = getModal(modalInfo.type);
  return (
    <Modal
      modalInfo={modalInfo}
      hideModal={hideModal}
    />
  );
};

export default ModalDialog;
