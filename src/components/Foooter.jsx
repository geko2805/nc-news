import { Box, Link, Typography } from "@mui/joy";

function Footer() {
  return (
    <>
      <Box
        sx={{
          height: "auto",
          width: "100vw",
          display: "flex",

          flexDirection: { xs: "column", lg: "row" },
          alignItems: { xs: "center", lg: "center" },
          justifyContent: "space-between",
          p: 4,
          mb: 2,
        }}
      >
        <Typography>
          Created by <Link href="https://gethsworld.com">Gethin Jones</Link>
        </Typography>
        <Typography sx={{ minWidth: "300px", maxWidth: "500px" }}>
          This portfolio project was created as part of a Digital Skills
          Bootcamp in Software Engineering provided by{" "}
          <Link href="https://northcoders.com/">Northcoders</Link>
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Link href="https://github.com/geko2805/my_nc_news">Backend</Link>
          <Link href="https://github.com/geko2805">GitHub</Link>
          <Link href="https://www.linkedin.com/in/gethin-jones-8b6957a8/">
            LinkedIn
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
