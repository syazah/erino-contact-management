import { CircularProgress, Container } from "@mui/material";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
function App() {
  return (
    <Suspense
      fallback={
        <Container sx={{ justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Container>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
