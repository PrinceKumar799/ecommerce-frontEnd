import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
interface Props {
  isError?: boolean;
  message: string;
  onAdd: () => void;
}
const ConfiramationSnackBar: React.FC<Props> = ({
  isError = false,
  message,
  onAdd,
}: Props) => {
  const [open, setOpen] = useState(true);
  //   console.log("here");
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => {
        setOpen(false);
        onAdd();
      }}
    >
      <Alert severity={isError ? "error" : "success"}>{message}</Alert>
    </Snackbar>
  );
};

export default ConfiramationSnackBar;
