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
} from "@mui/material";
import Topbar from "../components/Topbar.tsx";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useEffect, useState } from "react";
import Banner from "../components/Banner.tsx";

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
  const [errorOcurred, setErrorOcurred] = useState({
    ocurred: false,
    message: "",
  });
  async function GetContactData() {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/contacts", {
        headers: { "Content-Type": "application/json" },
      });
      const data: contactResponse = res.data;
      if (data) {
        console.log(data);
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
      }}
    >
      {/* ACTIONS  */}
      <Topbar />
      {contactData === null && <LinearProgress />}
      <AddButton />
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
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
              <TableCell sx={{ fontSize: 15, border: 0 }} align="left">
                {row.jobTitle}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
function AddButton() {
  return (
    <Fab
      aria-label="Add Contact"
      variant={"extended"}
      sx={{
        position: "absolute",
        bottom: 30,
        right: 30,
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
