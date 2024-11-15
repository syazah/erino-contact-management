import React, { useContext, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UserContext } from "../UserContextProvider.tsx";
import { Delete, Update } from "@mui/icons-material";
import axios from "axios";

// TYPES
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

// FUNCTION
function KebabMenu({ id, item }: menuProp) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
        context?.setReload(true);
        alert("Deleted");
      } else {
        context?.setCurrentError({
          ocurred: true,
          message: data.message || "Something went wrong",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        context?.setCurrentError({
          ocurred: true,
          message:
            error.response?.data?.message ||
            "Something went wrong while updating the contact",
        });
      }
    }
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon sx={{ color: "primary.main" }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={HandleDelete}>
          <Delete sx={{ color: "red" }} />
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (!context) {
              alert("User context not present, please reload");
              return null;
            }
            context.setUpdateItem(item);
            context.setOpenUpdatePopup(true);
            return handleClose();
          }}
        >
          <Update sx={{ color: "primary.main" }} />
          Update
        </MenuItem>
      </Menu>
    </div>
  );
}

export default KebabMenu;
