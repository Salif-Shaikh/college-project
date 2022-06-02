import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Transition from "../../../utils/Transition";

const PopoverDialog = (props) => {
  const { styles, children = null, icon = null } = props;

  const [openDailog, setOpenDialog] = useState(false);

  const popoverContent = useRef(null);

  const triggerBtn = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !openDailog ||
        (popoverContent &&
          popoverContent.current &&
          popoverContent.current.contains(target)) ||
        triggerBtn.current.contains(target)
      )
        return;
      setOpenDialog(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!openDailog || keyCode !== 27) {
        return;
      } else {
        setOpenDialog(false);
      }
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <React.Fragment>
      <button
        ref={triggerBtn}
        onClick={(e) => setOpenDialog(!openDailog)}
        className={styles}
      >
        {icon}
      </button>
      <div
        className="relative inline-flex ml-3"
        style={{
          top: "-2.5rem",
          right: "3rem",
        }}
        ref={popoverContent}
      >
        <Transition
          className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-gray-400 py-1.5 rounded shadow-lg overflow-hidden mt-1"
          show={openDailog}
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
        >
          {children}
        </Transition>
      </div>
    </React.Fragment>
  );
};

export default React.memo(PopoverDialog);
