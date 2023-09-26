import React from "react";
import { useDispatch } from "react-redux";

import { userJustCreatedShown } from "actions";

import ActionModal from "./ActionModal";

const UserJustCreatedModal = ({
  title,
  message,
  userJustCreated,
}) => {
  const dispatch = useDispatch();
  const action = () => {
    dispatch(userJustCreatedShown());
  };

  return (
    <ActionModal
      title={title}
      message={message}
      show={userJustCreated}
      action={action}
    />
  );
};

export default UserJustCreatedModal;
