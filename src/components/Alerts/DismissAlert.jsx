
import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const DismissAlert = ({message, color}) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color = {color} isOpen={visible} toggle={onDismiss}>
      {message}
    </Alert>
  );
}

export default DismissAlert;
