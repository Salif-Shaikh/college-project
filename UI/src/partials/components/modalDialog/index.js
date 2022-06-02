import React, { useEffect, useRef } from "react";
// import { useState } from "react";
import Transition from "../../../utils/Transition";

const ModalDialog = (props) => {
  const {
    styles,
    children = null,
    icon = null,
    modalCallback = () => {},
    modalStatus = false,
  } = props;

  // const [openDailog, modalCallback] = useState(false);

  const triggerBtn = useRef(null);

  const modalContent = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !modalStatus ||
        (modalContent &&
          modalContent.current &&
          modalContent.current.contains(target)) ||
        triggerBtn.current.contains(target)
      )
        return;
      modalCallback(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalStatus || keyCode !== 27) return;
      modalCallback(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const updateOpenDailog = (e) => {
    // e.stopPropagation();
    modalCallback(!modalStatus);
    // modalCallback(!modalStatus);
  };

  return (
    <React.Fragment>
      <button ref={triggerBtn} onClick={updateOpenDailog} className={styles}>
        {icon}
      </button>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
        show={modalStatus}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id="search-modal"
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalStatus}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          className="bg-white overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg h-96"
          ref={modalContent}
        >
          {modalStatus && children}
        </div>
      </Transition>
    </React.Fragment>
  );
};

export default React.memo(ModalDialog);
