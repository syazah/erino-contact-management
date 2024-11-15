import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContextProvider";
// TYPES
interface AddButtonProps {
  setAddContactOpen: (open: boolean) => void;
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

// FUNCTIONS
function AddContact({ setAddContactOpen }: AddButtonProps) {
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
          Add Contact
        </Typography>
        <Box
          onClick={() => setAddContactOpen(false)}
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
        <ContactForm setAddContactOpen={setAddContactOpen} />
      </Container>
    </Container>
  );
}

function ContactForm({ setAddContactOpen }: AddButtonProps) {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    jobTitle: "",
  });
  const [loading, setLoading] = useState(false);
  const context = useContext(UserContext);
  async function AddContactEntry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/contacts",
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
        context?.setReload(true);
        return setAddContactOpen(false);
      } else {
        context?.setCurrentError({
          ocurred: true,
          message: data.message || "Something went wrong",
        });
      }
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        context?.setCurrentError({
          ocurred: true,
          message:
            error.response?.data?.message ||
            "Something went wrong while updating the contact",
        });
      }
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={AddContactEntry}
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

export default AddContact;
