import styles from "./ModalUserInfoForm.module.scss";
import { Modal } from "../Modal/index.js";
import { FormWrapper } from "../FormWrapper/index.js";
import { useEffect, useState } from "react";
import { Select } from "../Select/index.js";
import { countries } from "../../consts/countries.js";
import "../Modal/Modal.scss";
import axios from "axios";

const getUsersInfoFormFields = ({ setShowPolicyModal }) => [
  {
    id: "name",
    fieldTitle: "Your Name",
    placeholder: "Insert Name",
  },
  {
    id: "email",
    fieldTitle: "Your Email",
    placeholder: "Insert Email",
  },
  {
    id: "country",
    fieldTitle: "Your Phone",
    placeholder: "Country",
    Input: (props) => (
      <div className={styles.selectWrapper}>
        <Select
          options={countries.map(({ code, name }) => ({
            value: code,
            label: code + " " + name,
          }))}
          {...props}
        />
      </div>
    ),
  },
  {
    id: "phone",
    fieldTitle: null,
    placeholder: "+ XX XXX XXXX XXXX",
  },
  {
    id: "date",
    fieldTitle: "Date of Birth",
    placeholder: "day/month/year",
    AdditionalField: ({ onFieldChange, form }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <label className={styles.modalUserInfoForm__checkbox}>
          <input
            type="checkbox"
            name="confirm"
            checked={Boolean(form?.confirm)}
            onChange={onFieldChange("confirm", (e) => e.target.checked)}
          />
          <span />
        </label>
        By clicking on “Take Part” I confirm that I accept{" "}
        <span
          onClick={() => setShowPolicyModal(true)}
          className={styles.modalUserInfoForm__terms}
        >
          {` Terms & Conditioning`}
        </span>
      </div>
    ),
  },
];

const errorReport = (heading, error) => {
  console.error(`Error: ${heading}`, error);
};

const TextInput = ({
  inputTitle,
  inputPlaceholder,
  value,
  setValue,
  type,
  hint = false,
  error = false,
}) => {
  return (
    <div className="inputContainer">
      <p className="inputTitle">{inputTitle}</p>
      <input
        className={error ? "errorInput" : "regularInput"}
        type={type}
        placeholder={inputPlaceholder}
        value={value}
        onChange={(e) => setValue(e?.target?.value)}
      />
      <p className="hint">{hint}</p>
      <p className="errorText">{error}</p>
    </div>
  );
};

const PhoneInput = ({
  inputTitle,
  inputPlaceholder,
  value,
  setValue,
  error,
  setPrefix,
  hideButton,
}) => {
  // Custom handler for phone input change
  const handlePhoneInputChange = (e) => {
    const inputVal = e.target.value;
    // Allow only numbers and an optional leading '+' sign
    if (/^\+?[0-9]*$/.test(inputVal)) {
      setValue(inputVal);
    }
  };

  return (
    <div className="inputContainer">
      <p className="inputTitle">
        <span>{inputTitle}</span>{" "}
      </p>
      <div className="phoneInputsBlock">
        <select
          onChange={(e) => setPrefix(e.target.value)}
          className="prefixSelect"
          name="prefixSelect"
          id="prefixSelect"
        >
          {countries.map((country, index) => (
            <option
              className="countryName"
              key={index}
              value={country.dial_code}
            >
              {country.flag} {country.dial_code} {country.name}
            </option>
          ))}
        </select>

        <input
          className={error ? "errorInput" : "regularInput"}
          type="text"
          placeholder={inputPlaceholder}
          value={value}
          onChange={handlePhoneInputChange}
        />
      </div>
      <p className="errorText">{error}</p>
    </div>
  );
};

export const ModalUserInfoForm = ({
  onClose,
  form,
  onFieldChange,
  setShowPolicyModal,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errorsObject, setErrorsObject] = useState({
    name: false,
    phone: false,
    email: false,
    checkbox: false,
    otp: false,
  });
  const [generalError, setGeneralError] = useState("");
  const [prefix, setPrefix] = useState("+91");
  const [OTP, setOTP] = useState("");
  const [hideButtonGetCode, setHideButtonGetCode] = useState(true);
  const [showInputs, setShowInputs] = useState(true);
  const [showOTPRequest, setShowOTPRequest] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateInputs = () => {
    let isValid = true;
    let errors = { ...errorsObject };

    if (!name || name.length < 2) {
      errors.name = "Enter your name";
      isValid = false;
    }

    if (!phone || phone.length < 8) {
      errors.phone = "Enter your phone";
      isValid = false;
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      errors.email = "Enter your email";
      isValid = false;
    }

    if (!form.confirm) {
      errors.checkbox = "To continue you have to agree with the policy";
      isValid = false;
    }

    setErrorsObject(errors);
    return isValid;
  };

  const checkData = () => {
    if (name && phone && email && form.confirm) {
      setGeneralError("");
      setErrorsObject((prevObject) => ({
        ...prevObject,
        otp: false,
      }));

      sendOTP();
    } else {
      if (name?.length < 2) {
        setErrorsObject((prevObject) => ({
          ...prevObject,
          name: `Enter your name`,
        }));
      }
      if (phone?.length < 8) {
        setErrorsObject((prevObject) => ({
          ...prevObject,
          phone: `Enter your phone`,
        }));
      }

      if (email?.length < 2 || !email.includes("@") || !email.includes(".")) {
        setErrorsObject((prevObject) => ({
          ...prevObject,
          email: `Enter your email`,
        }));
      }

      if (!form.confirm) {
        setErrorsObject((prevObject) => ({
          ...prevObject,
          checkbox: `To continue you have to agree with the policy`,
        }));
      }

      setGeneralError(`Please fill the form`);
    }
  };

  const sendOTP = () => {
    //ответы на вопросы находятся в объекте form
    console.log(`Send OTP request`, form);
    if (!validateInputs()) {
      setGeneralError("Please fill the form");
      return;
    }
    setHideButtonGetCode(true);
    setTimeout(() => {
      setHideButtonGetCode(false);
    }, 30000);

    const phoneNumber = `${prefix}${phone}`;
    const requestSource = `kolkataDerby`;

    console.log(`Before axios request 2`);
    axios
      .get("https://localnewsinfrastructure.com:1340/sendCode", {
        params: {
          phoneNumber: phoneNumber,
          requestSource: requestSource,
        },
      })
      .then((response) => {
        console.log(`Axiuios response`, response);
        if (response?.data?.status === 205) {
          setGeneralError(`You can participate only once`);
        } else if (response?.data?.status !== 200) {
          setErrorsObject((prevState) => ({
            ...prevState,
            phone: response?.data?.message,
          }));
        } else {
          setShowOTPRequest(true);
          setShowInputs(false);
          setErrorsObject((prevState) => ({
            ...prevState,
            phone: false,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
        errorReport(`Error in sendOTP - Can't send OTP`, err);
        setGeneralError(`Please try again later`);
      });
  };

  const checkOTP = async () => {
    try {
      const params = new URLSearchParams({
        phoneNumber: `${prefix}${phone}`,
        OTP,
      }).toString();
      const response = await axios.get(
        `https://localnewsinfrastructure.com:1340/checkOTP?${params}`
      );

      if (response?.data?.status === 200) {
        await sendData();
        setGeneralError("");
        setShowOTPRequest(false);
        setShowSuccessModal(true);
      } else {
        setErrorsObject((prevState) => ({
          ...prevState,
          otp: "Incorrect OTP",
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendData = async () => {
    try {
      const params = new URLSearchParams({
        name,
        phone: `${prefix}${phone}`,
        email,
        dataSource: `kolkataDerby`,
        finalScore: form[1],
        scoreAuthor: form[2],
        scoreMinute: form[3],
      }).toString();
      const response = await axios.get(
        `https://localnewsinfrastructure.com:1340/submit?${params}`
      );

      if (response.data.status === 200) {
        setGeneralError(`Your application has been successfully approved!`);
      } else {
        setGeneralError(`Something went wrong. Please try again later`);
      }
    } catch (err) {
      setGeneralError(`Please try again later`);
    }
  };

  return (
    <Modal
      onClose={onClose}
      closeBtn={false}
      title="THANK YOU FOR PARTICIPATING! PLEASE FILL OUT THE FORM BELOW AND IF YOU ARE ELIGIBLE, WE WILL SHARE THE PROMOCODE BY EMAIL."
    >
      {showInputs && (
        <>
          <div className="inputsBlock">
            <TextInput
              inputTitle={"Name"}
              inputPlaceholder={"Insert name"}
              value={name}
              setValue={setName}
              type={"Name"}
              error={errorsObject.name}
            />

            <PhoneInput
              inputTitle={"Phone"}
              inputPlaceholder={"Insert phone"}
              value={phone}
              setValue={setPhone}
              setPrefix={setPrefix}
              error={errorsObject.phone}
              hideButton={hideButtonGetCode}
            />

            <TextInput
              inputTitle={"Email"}
              inputPlaceholder={"Insert email"}
              value={email}
              setValue={setEmail}
              type={"Email"}
              error={errorsObject.email}
            />
          </div>

          <div className="policyBlock">
            <input
              type="checkbox"
              className="checkbox"
              checked={form.confirm ?? false}
              onChange={onFieldChange("confirm", (e) => e.target.checked)}
            />

            <p
              className={
                errorsObject.checkbox ? "errorCheckboxText" : "policyText"
              }
            >
              I have read, understand and agree with the
              <span
                className="policyHighlightedText"
                onClick={() => setShowPolicyModal(true)}
              >
                Terms and Conditions, Privacy Policy
              </span>
              , and confirm that I am over 18 years of age.
            </p>
          </div>

          <div className="buttonBlock">
            <button
              onClick={(e) => {
                e.preventDefault();
                checkData();
              }}
            >
              Continue
            </button>

            <p className="generalError">{generalError}</p>
          </div>
        </>
      )}
      {showOTPRequest && (
        <>
          <div className="inputsBlock">
            <TextInput
              inputTitle={`OTP sent to ${prefix}${phone} `}
              inputPlaceholder={"Insert OTP"}
              value={OTP}
              setValue={setOTP}
              type={"text"}
              error={errorsObject.otp}
            />
            <button
              onClick={sendOTP}
              className={hideButtonGetCode ? "hideButton" : "sendAgainButton"}
            >
              Send again
            </button>
          </div>

          <div className="buttonBlock twoButtons">
            <button
              className="backButton"
              onClick={() => {
                setShowInputs(true);
                setShowOTPRequest(false);
                setHideButtonGetCode(false);
              }}
            >
              Back
            </button>
            <button onClick={checkOTP}>Continue</button>
          </div>
        </>
      )}
    </Modal>
  );
};
