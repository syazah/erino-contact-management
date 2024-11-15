import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContextProvider";

function UpdateContact() {
  const context = useContext(UserContext);
  return (
    <Container
      sx={{ bgcolor: "white", p: 2, borderRadius: "15px", width: "60%" }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: 2,
          borderColor: "#eee",
        }}
      >
        <Typography
          sx={{ color: "primary.main", fontWeight: 700, fontSize: 24 }}
        >
          Update Contact
        </Typography>
        <Box
          onClick={() => {
            if (context) {
              context.setOpenUpdatePopup(false);
            }
          }}
          sx={{
            bgcolor: "primary.light",
            width: "30px",
            height: "30px",
            borderRadius: "100%",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            cursor: "pointer",
          }}
        >
          <ClearIcon
            sx={{ color: "secondary.light", width: "30px", height: "30px" }}
          />
        </Box>
      </Box>
      <Container>
        {context !== undefined && (
          <ContactForm
            updateItem={context.updateItem}
            setOpenUpdatePopup={context.setOpenUpdatePopup}
          />
        )}
      </Container>
    </Container>
  );
}
type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
};
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
type openUpdateProp = {
  setOpenUpdatePopup: React.Dispatch<React.SetStateAction<boolean>>;
  updateItem: {
    id: number;
    firstName: string;
    lastName?: string;
    email: string;
    phoneNumber: string;
    company: string;
    jobTitle: string;
  } | null;
};
function ContactForm({ setOpenUpdatePopup, updateItem }: openUpdateProp) {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: updateItem?.firstName || "",
    lastName: updateItem?.lastName || "",
    email: updateItem?.email || "",
    phoneNumber: updateItem?.phoneNumber || "",
    company: updateItem?.company || "",
    jobTitle: updateItem?.jobTitle || "",
  });
  useEffect(() => {
    if (updateItem) {
      setFormData({
        firstName: updateItem.firstName || "",
        lastName: updateItem.lastName || "",
        email: updateItem.email || "",
        phoneNumber: updateItem.phoneNumber || "",
        company: updateItem.company || "",
        jobTitle: updateItem.jobTitle || "",
      });
    }
  }, [updateItem]);
  const [loading, setLoading] = useState(false);
  async function UpdateContactEntry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:8000/api/v1/contacts/${updateItem?.id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data: contactResponse = res.data;
      if (data.success === true) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          company: "",
          jobTitle: "",
        });
        setLoading(false);
        return setOpenUpdatePopup(false);
      } else {
        console.log(data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={UpdateContactEntry}
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {[
        { label: "First Name", id: "firstName", type: "text" },
        { label: "Last Name", id: "lastName", type: "text" },
        { label: "Email", id: "email", type: "text" },
        { label: "Phone Number", id: "phoneNumber", type: "number" },
        { label: "Company", id: "company", type: "text" },
        { label: "Job Title", id: "jobTitle", type: "text" },
      ].map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label style={{ color: "#000", fontSize: 16 }}>{item.label}</label>
          <input
            type={item.type}
            id={item.id}
            value={formData[item.id as keyof FormDataType]}
            onChange={(e) =>
              setFormData({ ...formData, [item.id]: e.target.value.trim() })
            }
            style={{
              border: 0,
              backgroundColor: "#eee",
              borderRadius: "20px",
              padding: 4,
              paddingLeft: 8,
              outline: "none",
              fontSize: 16,
              width: "60%",
            }}
          />
        </div>
      ))}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          alignContent: "end",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: "20px", bgcolor: "primary.light" }}
        >
          {loading ? <CircularProgress /> : "Confirm"}
        </Button>
      </div>
    </form>
  );
}

export default UpdateContact;
