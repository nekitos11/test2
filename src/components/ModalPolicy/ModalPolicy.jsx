import "./ModalPolicy.css";
import { Modal } from "../Modal/index.js";

export const ModalPolicy = ({ onClickDone, onClose }) => {
  return (
    <Modal onClose={onClose} title="Terms and Conditions">
      <div className="modalText">
        <p className="termsTitle">
          Terms and Conditions for Batery.ai Promotion
        </p>

        <p className="termsTitle">CONSENT FORM FOR PROCESSING PERSONAL DATA</p>

        <p className="termsText">
          1. The personal data that may be collected and processed includes, but
          is not limited to, my full name, contact information (address, email,
          phone number), date of birth, and any other information required by
          the Organization for the purpose of providing services. 2. The purpose
          of the processing of my personal data is to enable the Organization to
          carry out its functions and responsibilities, including but not
          limited to providing requested services, managing customer
          relationships, fulfilling obligations related to participating in the
          marketing action. 3. I understand that my personal data may be shared
          with third parties, such as service providers, business partners, or
          regulatory authorities for the aforementioned purposes or as required
          by law. 4. I understand that I have the right to access, rectify, or
          erase my personal data held by the Organization. I may also withdraw
          my consent at any time by contacting the Organization.
        </p>
      </div>

      <div className="buttonBlock">
        <button onClick={onClickDone}>Done</button>
      </div>
    </Modal>
  );
};
