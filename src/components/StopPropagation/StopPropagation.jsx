import { Box } from "@mui/material";

const StopPropagation = ({ children }) => {
  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <Box onClick={stopPropagation} onMouseDown={stopPropagation}>
      {children}
    </Box>
  );
};

export default StopPropagation;
