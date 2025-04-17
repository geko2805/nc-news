import { Breadcrumbs, Button, Typography } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";

function BreadcrumbNav({ trail }) {
  const navigate = useNavigate();

  return (
    <>
      {/* <Button onClick={() => navigate(-1)}>Back</Button> */}

      <Breadcrumbs
        separator="›"
        aria-label="breadcrumbs"
        size="sm"
        sx={{ zIndex: 1200 }}
      >
        <Link color="primary" href="/">
          <HomeIcon fontSize="xl3" sx={{ mr: 0.5 }} />
          Home
        </Link>
        {trail.map((item) => (
          <Link key={item} color="success" href={"/" + item}>
            {item}
          </Link>
        ))}
      </Breadcrumbs>
    </>
  );
}

export default BreadcrumbNav;
