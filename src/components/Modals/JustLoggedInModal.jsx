import React from "react";
import { useDispatch } from "react-redux";

import { justLoggedInShown } from "actions";

import ActionModal from "./ActionModal";

const JustLoggedInModal = ({ title, message, justLoggedIn }) => {
  const action = () => {
    dispatch(justLoggedInShown());
  };
  const dispatch = useDispatch();

  return (
    <ActionModal
      title={title}
      message={message}
      show={justLoggedIn}
      action={action}
    />
  );
};

export default JustLoggedInModal;
