import {
  Box,
  Fab,
  LinearProgress,
  Snackbar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Container,
  TableBody,
  Backdrop,
} from "@mui/material";
import Topbar from "../components/Topbar.tsx";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Banner from "../components/Banner.tsx";
import AddContact from "../components/AddContact.tsx";
import KebabMenu from "../components/KebabMenu.tsx";
import UpdateContact from "../components/UpdateContact.tsx";
import { UserContext } from "../UserContextProvider.tsx";

type contactResponse = {
  data: {
    id: number;
    firstName: string;
    lastName?: string;
    email: string;
    phoneNumber: string;
    company: string;
    jobTitle: string;
  }[];
  message?: string;
};
function Home() {
  const [contactData, setContactData] = useState<contactResponse | null>(null);
  const context = useContext(UserContext);
  const [errorOcurred, setErrorOcurred] = useState({
    ocurred: false,
    message: "",
  });
  const [addContactOpen, setAddContactOpen] = useState(false);
  async function GetContactData() {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/contacts", {
        headers: { "Content-Type": "application/json" },
      });
      const data: contactResponse = res.data;
      if (data) {
        setContactData(data);
      } else {
        setErrorOcurred({
          ocurred: true,
          message: data,
        });
      }
    } catch (error) {
      console.log(error);
      setErrorOcurred({
        ocurred: true,
        message: "Something went wrong while fetching contacts",
      });
    }
  }
  useEffect(() => {
    GetContactData();
  }, []);
  return (
    <Box
      sx={{
        p: 0,
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        position: "relative",
        bgcolor: "primary.dark",
        pb: 10,
      }}
    >
      {/* ACTIONS  */}
      <Topbar />
      {contactData === null && <LinearProgress />}
      <AddButton setAddContactOpen={setAddContactOpen} />
      <Snackbar
        open={errorOcurred.ocurred}
        autoHideDuration={6000}
        onClose={() => setErrorOcurred({ ocurred: false, message: "" })}
        message={errorOcurred.message}
      />
      {/* BANNER  */}
      <Banner />
      {/* TABLE  */}
      <Container sx={{ bgcolor: "secondary.main", p: 2, borderRadius: "10px" }}>
        {contactData != null && <DataTable contactData={contactData} />}
      </Container>

      {/* ADD CONTACT BACKDROP  */}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={addContactOpen}
      >
        <AddContact setAddContactOpen={setAddContactOpen} />
      </Backdrop>
      {/* UPDATE CONTACT BACKDROP  */}
      {context != undefined && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={context.openUpdatePopup}
        >
          <UpdateContact />
        </Backdrop>
      )}
    </Box>
  );
}

interface DataTableProps {
  contactData: contactResponse | null;
}
function DataTable({ contactData }: DataTableProps) {
  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ borderRadius: "100%" }}>
          <TableRow sx={{ bgcolor: "#eee", borderRadius: "100px" }}>
            <TableCell sx={{ fontSize: 15, border: 0 }}>ID</TableCell>
            <TableCell sx={{ fontSize: 15, border: 0 }} align="left">
              First Name
            </TableCell>
            <TableCell sx={{ fontSize: 15, border: 0 }} align="left">
              Last Name
            </TableCell>
            <TableCell sx={{ fontSize: 15, border: 0 }} align="left">
              Email
            </TableCell>
            <TableCell sx={{ fontSize: 15, border: 0 }} align="left">
              Phone Number
            </TableCell>
            <TableCell sx={{ fontSize: 15, border: 0 }} align="left">
              Company
            </TableCell>
            <TableCell sx={{ fontSize: 15, border: 0 }} align="left">
              Job Title
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactData?.data.map((row, index) => (
            <TableRow
              key={row.id}
              sx={{ cursor: "pointer", ":hover": { bgcolor: "#eee" } }}
            >
              <TableCell sx={{ fontSize: 15, border: 0 }}>
                {index + 1}
              </TableCell>
              <TableCell sx={{ fontSize: 15, border: 0 }} align="left">
                {row.firstName}
              </TableCell>
              <TableCell sx={{ fontSize: 15, border: 0 }} align="left">
                {row.lastName}
              </TableCell>
              <TableCell sx={{ fontSize: 15, border: 0 }} align="left">
                {row.email}
              </TableCell>
              <TableCell sx={{ fontSize: 15, border: 0 }} align="left">
                {row.phoneNumber}
              </TableCell>
              <TableCell sx={{ fontSize: 15, border: 0 }} align="left">
                {row.company}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: 15,
                  border: 0,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                align="left"
              >
                {row.jobTitle}
                <KebabMenu id={row.id} item={row} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
interface AddButtonProps {
  setAddContactOpen: (open: boolean) => void;
}
function AddButton({ setAddContactOpen }: AddButtonProps) {
  return (
    <Fab
      onClick={() => setAddContactOpen(true)}
      aria-label="Add Contact"
      variant={"extended"}
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        color: "white",
        bgcolor: "primary.main",
        ":hover": { bgcolor: "#5634FC" },
      }}
    >
      <AddIcon sx={{ color: "white" }} />
      Add
    </Fab>
  );
}

export default Home;
