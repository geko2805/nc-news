import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Checkbox from "@mui/joy/Checkbox";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Stack from "@mui/joy/Stack";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Sheet from "@mui/joy/Sheet";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
import TuneIcon from "@mui/icons-material/TuneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import Done from "@mui/icons-material/Done";
import { getTopics } from "../../api";
import { useTopics } from "./TopicsContext";

export default function FilterDrawer() {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("All time"); //change to be date published !!!!!!!!!!!!
  const { topics, isLoading } = useTopics();

  const topicSlugs = topics.map((topic) => {
    return topic.slug;
  }); // move this inside useeffect?

  const [selectedTopics, setSelectedTopics] = React.useState(topicSlugs);
  console.log(selectedTopics);

  React.useEffect(() => {
    if (topics.length > 0 && selectedTopics.length === 0) {
      setSelectedTopics(topics.map((topic) => topic.slug));
    }
  }, [topics]);

  const handleCheckboxChange = (topicSlug) => (event) => {
    setSelectedTopics((prev) => {
      if (event.target.checked) {
        // Add the topic if checked
        return [...prev, topicSlug];
      } else {
        // Remove the topic if unchecked
        return prev.filter((slug) => slug !== topicSlug);
      }
    });
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<TuneIcon />}
        onClick={() => setOpen(true)}
      >
        Filters
      </Button>
      <Drawer
        size="md"
        variant="plain"
        open={open}
        anchor="bottom"
        onClose={() => setOpen(false)}
        slotProps={{
          content: {
            sx: {
              bgcolor: "transparent",
              p: { md: 3, sm: 0 },
              boxShadow: "none",
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: "md",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <DialogTitle>Filters</DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: "auto" }} />
          <DialogContent sx={{ gap: 2 }}>
            <FormControl>
              <FormLabel sx={{ typography: "title-md", fontWeight: "bold" }}>
                Published
              </FormLabel>
              <RadioGroup
                value={type || ""}
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: 1.5,
                  }}
                >
                  {[
                    {
                      name: "All time",
                      icon: <HomeRoundedIcon />,
                    },
                    {
                      name: "Last week",
                      icon: <ApartmentRoundedIcon />,
                    },
                    {
                      name: "Last month",
                      icon: <MeetingRoomRoundedIcon />,
                    },
                    {
                      name: "Last year",
                      icon: <HotelRoundedIcon />,
                    },
                  ].map((item) => (
                    <Card
                      key={item.name}
                      sx={{
                        boxShadow: "none",
                        "&:hover": { bgcolor: "background.level1" },
                      }}
                    >
                      <CardContent>
                        {item.icon}
                        <Typography level="title-md">{item.name}</Typography>
                      </CardContent>
                      <Radio
                        disableIcon
                        overlay
                        checked={type === item.name}
                        variant="outlined"
                        color="neutral"
                        value={item.name}
                        sx={{ mt: -2 }}
                        slotProps={{
                          action: {
                            sx: {
                              ...(type === item.name && {
                                borderWidth: 2,
                                borderColor:
                                  "var(--joy-palette-primary-outlinedBorder)",
                              }),
                              "&:hover": {
                                bgcolor: "transparent",
                              },
                            },
                          },
                        }}
                      />
                    </Card>
                  ))}
                </Box>
              </RadioGroup>
            </FormControl>

            <Typography level="title-md" sx={{ fontWeight: "bold", mt: 1 }}>
              Topics
            </Typography>
            <div role="group" aria-labelledby="rank">
              <List
                orientation="horizontal"
                size="sm"
                sx={{ "--List-gap": "12px", "--ListItem-radius": "20px" }}
              >
                {topics.map((topic, index) => {
                  const selected = selectedTopics.includes(topic.slug);
                  return (
                    <ListItem key={topic.slug}>
                      <AspectRatio
                        variant={selected ? "solid" : "outlined"}
                        color={selected ? "primary" : "neutral"}
                        ratio={1}
                        sx={{ width: 20, borderRadius: 20, ml: -0.5, mr: 0.75 }}
                      >
                        <div>{selected && <Done fontSize="md" />}</div>
                      </AspectRatio>
                      <Checkbox
                        size="sm"
                        color="neutral"
                        disableIcon
                        overlay
                        label={topic.slug}
                        variant="outlined"
                        checked={selected}
                        onChange={handleCheckboxChange(topic.slug)} // Update state
                        slotProps={{
                          action: {
                            sx: {
                              "&:hover": {
                                bgcolor: "transparent",
                              },
                            },
                          },
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </div>

            <Typography level="title-md" sx={{ fontWeight: "bold", mt: 2 }}>
              Booking options
            </Typography>
            <FormControl orientation="horizontal">
              <Box sx={{ flex: 1, pr: 1 }}>
                <FormLabel sx={{ typography: "title-sm" }}>Votes</FormLabel>
                <FormHelperText sx={{ typography: "body-sm" }}>
                  Hide articles with negative vote counts{" "}
                </FormHelperText>
              </Box>
              <Switch />
            </FormControl>

            <FormControl orientation="horizontal">
              <Box sx={{ flex: 1, mt: 1, mr: 1 }}>
                <FormLabel sx={{ typography: "title-sm" }}>
                  My Articles
                </FormLabel>
                <FormHelperText sx={{ typography: "body-sm" }}>
                  Only show articles which I published
                </FormHelperText>
              </Box>
              <Switch />
            </FormControl>
          </DialogContent>

          <Divider sx={{ mt: "auto" }} />
          <Stack
            direction="row"
            useFlexGap
            spacing={1}
            sx={{ justifyContent: "space-between" }}
          >
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => {
                setType("");
                setSelectedTopics(topicSlugs);
              }}
            >
              Reset
            </Button>
            <Button onClick={() => setOpen(false)}>Show 165 properties</Button>
          </Stack>
        </Sheet>
      </Drawer>
    </React.Fragment>
  );
}
