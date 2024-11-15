import React, { useContext, useState } from "react";
import { Alert, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UserContext } from "../UserContextProvider.tsx";
import {
  CheckCircleOutline,
  DeleteForever,
  PersonPinCircle,
} from "@mui/icons-material";
import axios from "axios";

type contactResponse = {
  success: boolean;
  data: {
    id: number;
    firstName: string;
    lastName?: string;
    email: string;
    phoneNumber: string;
    company: string;
    jobTitle: string;
  };
  message?: string;
};

interface menuProp {
  id: number;
  item: {
    id: number;
    firstName: string;
    lastName?: string;
    email: string;
    phoneNumber: string;
    company: string;
    jobTitle: string;
  };
}

function KebabMenu({ id, item }: menuProp) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const context = useContext(UserContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function HandleDelete() {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/contacts/${id}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data: contactResponse = res.data;
      if (data.success) {
        setAlertMessage("This Contact Was Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon sx={{ color: "primary.main" }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={HandleDelete}>
          <DeleteForever sx={{ color: "red" }} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (!context) {
              console.error("UserContext is not available");
              return null;
            }
            context.setUpdateItem(item);
            context.setOpenUpdatePopup(true);
            return handleClose();
          }}
        >
          <PersonPinCircle sx={{ color: "primary.main" }} />
        </MenuItem>
      </Menu>
      {alertMessage && (
        <Alert
          icon={<CheckCircleOutline fontSize="inherit" />}
          severity="success"
        >
          {alertMessage}
        </Alert>
      )}
    </div>
  );
}

export default KebabMenu;
