import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Input, Stack } from "@mui/joy";
import { UserContext } from "./UserContext";

export default function SignInModal() {
  // const [open, setOpen] = React.useState(false);
  // const { user, setUser } = React.useContext(UserContext);
  const { setUser, modalOpen, setModalOpen } = React.useContext(UserContext);

  return (
    <>
      {/* <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Log in
      </Button> */}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: "lg", mb: 1 }}
          >
            Sign In
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Make sure to use <code>aria-labelledby</code> on the modal dialog
            with an optional <code>aria-describedby</code> attribute.
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setUser({
                username: "jessjelly",
                avatar_url:
                  "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
                name: "Jess Jelly",
              });
              setModalOpen(false);
              // const formData = new FormData(event.currentTarget);
              // const formJson = Object.fromEntries(formData.entries());
              // alert(JSON.stringify(formJson));
            }}
          >
            <Stack spacing={1}>
              <Input placeholder="Username" required />
              <Input placeholder="*******" disabled />
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </Sheet>
      </Modal>
    </>
  );
}
