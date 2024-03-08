import './Modal.scss'
import CloseIcon from '@assets/images/closeIcon.svg'
export const Modal = ({  onClose, title, children, modalsContainerWrapper, closeBtn = true }) => {
    return (
      <div className="modalsWrapper">
        <div className="backdrop" onClick={onClose}></div>

        <div className={"modalsContainer " + modalsContainerWrapper}>
          <div className="header">
            {title && <p className="modalTitle">{title}</p>}
            {closeBtn &&
              <button className="closeButton" onClick={onClose}>
                <CloseIcon />
              </button>
            }
          </div>
          {children}
        </div>
      </div>
    );
};
