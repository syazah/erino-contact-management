import { AppBar, Container, Toolbar, Typography } from "@mui/material";

function Topbar() {
  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "primary.main",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{ display: "flex", flexDirection: "row", gap: "4px" }}
        >
          <img
            src={"/logo.jpeg"}
            style={{ width: "30px", borderRadius: "100%" }}
          />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 600,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Erino
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Topbar;
