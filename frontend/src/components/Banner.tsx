import { Typography, Button, Avatar, Container, Box } from "@mui/material";
function Banner() {
  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          bgcolor: "secondary.dark",
          p: 2,
          borderRadius: "10px",
          justifyContent: "start",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box sx={{ width: "70%" }}>
          <Typography
            component={"h2"}
            sx={{ color: "secondary.main", fontSize: "20px" }}
          >
            Your Contacts, Streamlined and Accessible
          </Typography>
          <Typography component={"p"} sx={{ color: "#ccc" }}>
            Quickly manage client contacts, stay organized, and build stronger
            connections
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: "primary.light",
              borderColor: "primary.light",
              marginTop: "20px",
            }}
          >
            Get Premium
          </Button>
        </Box>

        {/* BANNER */}
        <Box sx={{ position: "relative", width: "30%" }}>
          <Avatar
            sx={{
              width: "70px",
              height: "70px",
              position: "absolute",
              top: "50%",
              left: "34%",
              transform: "translate(-50%, -50%)",
              zIndex: 8,
              opacity: 0.2,
            }}
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/1260727/pexels-photo-1260727.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
          <Avatar
            sx={{
              width: "70px",
              height: "70px",
              position: "absolute",
              top: "50%",
              left: "42%",
              transform: "translate(-50%, -50%)",
              zIndex: 9,
              opacity: 0.6,
            }}
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/12911763/pexels-photo-12911763.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
          <Avatar
            sx={{
              width: "80px",
              height: "80px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/7792803/pexels-photo-7792803.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
          <Avatar
            sx={{
              width: "70px",
              height: "70px",
              position: "absolute",
              top: "50%",
              left: "60%",
              transform: "translate(-50%, -50%)",
              zIndex: 9,
              opacity: 0.6,
            }}
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/7821525/pexels-photo-7821525.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
          <Avatar
            sx={{
              width: "70px",
              height: "70px",
              position: "absolute",
              top: "50%",
              left: "65%",
              transform: "translate(-50%, -50%)",
              zIndex: 8,
              opacity: 0.2,
            }}
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/1260727/pexels-photo-1260727.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
        </Box>
      </Container>
    </Box>
  );
}

export default Banner;
