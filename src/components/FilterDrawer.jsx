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
import { getArticles, getTopics } from "../../api";
import { useTopics } from "./TopicsContext";
import { UserContext } from "./UserContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Badge, CircularProgress, IconButton } from "@mui/joy";

export default function FilterDrawer({
  articles,
  filteredArticles,
  setFilteredArticles,
  filters,
  setFilters,
  searchParams,
  setSearchParams,
}) {
  let location = useLocation();
  let { topic } = useParams(); // Extract topic param from URL
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  //set filter states - use params where available, otherwise filter object from articles otherwise defaults
  const [dateRange, setDateRange] = React.useState(
    searchParams.get("date_range") || filters.date_range || "all"
  );
  const [hideNegative, setHideNegative] = React.useState(
    searchParams.get("hide_negative") === "true" ||
      filters.hide_negative ||
      false
  );
  const [showAuthoredByUser, setShowAuthoredByUser] = React.useState(
    filters.author || false
  );
  //to store total count of filtered results for real time feedback
  const [filteredCount, setFilteredCount] = React.useState(null);
  const [isFetchingCount, setIsFetchingCount] = React.useState(false);

  //from context
  const { topics, isLoading } = useTopics();
  const { user, setModalOpen } = React.useContext(UserContext);

  //state for all the topic titles populated from topic context -----MOVE THESE UP TO ARTICLES SO THE STATE CAN BE RESET EASILY IS NO ARTICLES AVAILABLE
  const [topicSlugs, setTopicSlugs] = React.useState([]);

  // state for topics selected by checkbox filters
  const [selectedTopics, setSelectedTopics] = React.useState(() => {
    const topicsParam = searchParams.get("selected_topics");
    if (topicsParam) {
      return topicsParam.split(",");
    }
    return filters.selected_topics || [];
  });

  // detect screen size
  const [isLargeScreen, setIsLargeScreen] = React.useState(
    window.innerWidth >= 900
  );
  const [isSmallScreen, setIsSmallScreen] = React.useState(
    window.innerWidth <= 600
  );
  const anchor = isLargeScreen ? "right" : "bottom"; // Set anchor dynamically
  // Update screen size on resize

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Fetch filtered count
  const fetchFilteredCount = React.useCallback(
    debounce((newFilters) => {
      setIsFetchingCount(true);
      getArticles(
        topic,
        undefined,
        undefined,
        undefined,
        undefined,
        newFilters,
        true
      )
        .then((data) => {
          setFilteredCount(data.total_count);
          setIsFetchingCount(false);
        })
        .catch((error) => {
          console.error("Error fetching count:", error);
          setIsFetchingCount(false);
        });
    }, 300),
    [topic]
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 900); // > 900px breakpoint (md)
      setIsSmallScreen(window.innerWidth <= 600); // < 600px breakpoint (xs)
    };
    window.addEventListener("resize", handleResize);
    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //hide filter button when user has scrolled to bottom so it doesnt cover the footer links
  const [isVisible, setIsVisible] = React.useState(true); // start visible
  const bottomThreshold = 150; // hide when within 150px of the bottom to stop button covering footer
  React.useEffect(() => {
    const handleScroll = () => {
      //only change visible state of filter button on small screens
      if (isSmallScreen) {
        // Calculate distance from bottom
        const scrollY = window.scrollY; // pixels scrolled from top
        const windowHeight = window.innerHeight; // viewport height
        const documentHeight = document.documentElement.scrollHeight; // total document height
        const distanceFromBottom = documentHeight - (scrollY + windowHeight);
        // hide if within threshold of bottom on small screen, show otherwise
        setIsVisible(distanceFromBottom > bottomThreshold);
      } else {
        setIsVisible(true); // Filter button always visible on larger screens
      }
    };
    // scroll event listener
    window.addEventListener("scroll", handleScroll);
    // cleanup listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSmallScreen]);

  //set selectedTopics to topic or all if empty so topic searchParam is not overridden
  React.useEffect(() => {
    const slugs = topics.map((topic) => topic.slug);
    //set the state for all topic slugs aswell as pre populating the selectedTopics to be used to precheck the checkboxes
    setTopicSlugs(slugs);
    if (topics.length > 0 && selectedTopics.length === 0) {
      if (topic) {
        setSelectedTopics([topic]);
      } else {
        setSelectedTopics(slugs);
      }
    }
  }, [topic, topics]);

  // Sync filters with searchParams and apply them
  React.useEffect(() => {
    setDateRange(searchParams.get("date_range") || filters.date_range || "all");
    setHideNegative(
      searchParams.get("hide_negative") === "true" ||
        filters.hide_negative ||
        false
    );
    setShowAuthoredByUser(
      (user && searchParams.get("author") === user.username) ||
        filters.author ||
        false
    );
    const topicsParam = searchParams.get("selected_topics");
    if (topicsParam) {
      setSelectedTopics(topicsParam.split(","));
    } else if (filters.selected_topics) {
      setSelectedTopics(filters.selected_topics);
    }
  }, [searchParams, filters, user]);

  // Update filtered count in real-time
  React.useEffect(() => {
    const newFilters = {};
    if (dateRange !== "all") newFilters.date_range = dateRange;
    if (hideNegative) newFilters.hide_negative = true;
    if (showAuthoredByUser && user?.username) newFilters.author = user.username;
    if (
      selectedTopics.length > 0 &&
      selectedTopics.length < topicSlugs.length
    ) {
      newFilters.selected_topics = selectedTopics;
    }
    fetchFilteredCount(newFilters);
  }, [
    dateRange,
    hideNegative,
    showAuthoredByUser,
    selectedTopics,
    user,
    topicSlugs,
    fetchFilteredCount,
  ]);

  const applyFilters = () => {
    const newFilters = {};
    if (dateRange !== "all") newFilters.date_range = dateRange; //set to either all (default)  or week, month or year
    if (hideNegative) newFilters.hide_negative = true;
    if (showAuthoredByUser && user?.username) newFilters.author = user.username;
    if (
      selectedTopics.length > 0 &&
      selectedTopics.length < topicSlugs.length
    ) {
      newFilters.selected_topics = selectedTopics;
    }
    setFilters(newFilters);

    // Update URL search params
    const updatedParams = {
      ...Object.fromEntries(searchParams),
      ...(newFilters.date_range && { date_range: newFilters.date_range }),
      ...(newFilters.hide_negative && { hide_negative: "true" }),
      ...(newFilters.author && { author: newFilters.author }),
      ...(newFilters.selected_topics && {
        selected_topics: newFilters.selected_topics.join(","),
      }),
      page: "1", // Reset to page 1 when filters change
    };

    // Remove params if their values are cleared
    if (!newFilters.date_range) delete updatedParams.date_range;
    if (!newFilters.hide_negative) delete updatedParams.hide_negative;
    if (!newFilters.author) delete updatedParams.author;
    if (
      !newFilters.selected_topics ||
      newFilters.selected_topics.length === topicSlugs.length
    ) {
      delete updatedParams.selected_topics;
    }

    setSearchParams(updatedParams);
    setOpen(false);
  };

  //old client side filtering
  // React.useEffect(() => {
  //   let filtered = [...articles]; // start with all articles
  //   // filter by selected topics
  //   filtered = filtered.filter((article) =>
  //     selectedTopics.includes(article.topic)
  //   );
  //   // filter to hide negative vote counts if hideNegative is true
  //   if (hideNegative) {
  //     filtered = filtered.filter((article) => article.votes >= 0);
  //   }
  //   // filter only user authored articles when showAuthoredByUser is true
  //   if (showAuthoredByUser && user?.username) {
  //     filtered = filtered.filter((article) => article.author === user.username);
  //   }
  //   setFilteredArticles(filtered);
  // }, [articles, selectedTopics, hideNegative, showAuthoredByUser, user]);

  const handleCheckboxChange = (topicSlug) => (event) => {
    navigate("/articles");

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
      {isVisible && (
        <Badge
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              position: "fixed",
              bottom: 5,
              zIndex: 1001,
              left: "50%", // Move left edge to center of parent
              transform: "translateX(-50%)", // Shift back by half its width
            },
            mr: "3rem",
          })}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          // badgeInset="30%"
          badgeContent={Object.keys(filters).length}
        >
          <Button
            sx={(theme) => ({
              bgcolor: "var(--joy-palette-background-level1)",
              "&:hover": {
                backgroundColor: "var(--joy-palette-neutral-100)", // Lighten on hover
              },
              [theme.breakpoints.down("sm")]: {
                bgcolor: "var(--joy-palette-background-transparent)",
                position: "static",
              },
            })}
            variant="outlined"
            color="neutral"
            startDecorator={<TuneIcon />}
            onClick={() => setOpen(true)}
            size="lg"
          >
            Filters
            {/* {isSmallScreen ? <TuneIcon /> : "Filters"} */}
          </Button>
        </Badge>
      )}
      <Drawer
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            //width: "100%",
          },
          maxWidth: "100vw",
        })}
        size="md"
        variant="plain"
        open={open}
        anchor={anchor}
        onClose={() => setOpen(false)}
        slotProps={{
          content: {
            sx: (theme) => ({
              bgcolor: "var(--joy-palette-background-transparent)",
              p: { md: 3, sm: 0 },
              boxShadow: "none",
              maxWidth: "100vw",
              [theme.breakpoints.down("md")]: {
                minWidth: "auto",
                maxWidth: "100vw",
              },
              [theme.breakpoints.up("md")]: {
                minWidth: 400,
              },
            }),
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
            maxWidth: "100vw",
            bgcolor: "transparent",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <DialogTitle>Filters</DialogTitle>
            <Typography sx={{ mr: 5 }} level="body-sm">
              Apply filters to load{" "}
              {isFetchingCount ? (
                <CircularProgress
                  variant="solid"
                  color="primary"
                  sx={{
                    "--CircularProgress-trackThickness": "2px",
                    "--CircularProgress-progressThickness": "2px",
                    "--CircularProgress-size": "15px",
                  }}
                />
              ) : (
                filteredCount
              )}{" "}
              results
            </Typography>
          </Box>

          <ModalClose />
          <Divider sx={{ mt: "auto" }} />
          <DialogContent sx={{ gap: 2 }}>
            <FormControl>
              <FormLabel sx={{ typography: "title-md", fontWeight: "bold" }}>
                Published
              </FormLabel>
              <RadioGroup
                value={dateRange || ""}
                onChange={(event) => {
                  setDateRange(event.target.value);
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
                      value: "all",
                    },
                    {
                      name: "Last week",
                      icon: <ApartmentRoundedIcon />,
                      value: "week",
                    },
                    {
                      name: "Last month",
                      icon: <MeetingRoomRoundedIcon />,
                      value: "month",
                    },
                    {
                      name: "Last year",
                      icon: <HotelRoundedIcon />,
                      value: "year",
                    },
                  ].map((item) => (
                    <Card
                      key={item.value}
                      sx={{
                        boxShadow: "none",
                        bgcolor: "var(--joy-palette-background-level1)",

                        "&:hover": {
                          bgcolor: "var(--joy-palette-primary-50)",
                        },
                      }}
                    >
                      <CardContent>
                        {/* {item.icon} */}
                        <Typography level="title-md">{item.name}</Typography>
                      </CardContent>
                      <Radio
                        disableIcon
                        overlay
                        checked={dateRange === item.value}
                        variant="outlined"
                        color="neutral"
                        value={item.value}
                        sx={{ mt: -2 }}
                        slotProps={{
                          action: {
                            sx: {
                              ...(dateRange === item.value && {
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
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress size="sm" />
                  <Typography>Topics loading...</Typography>
                </Box>
              ) : (
                <List
                  orientation="horizontal"
                  size="sm"
                  sx={(theme) => ({
                    //[theme.breakpoints.up("md")]: {
                    display: "flex",
                    justifyContent: "start",
                    flexWrap: "wrap",
                    //  },
                    gap: "12px",
                    "--ListItem-radius": "20px",
                  })}
                >
                  {topics.map((topic, index) => {
                    const selected = selectedTopics.includes(topic.slug);
                    return (
                      <ListItem
                        key={topic.slug}
                        sx={{
                          "&:hover": {
                            bgcolor: "var(--joy-palette-primary-50)",
                          },
                        }}
                      >
                        <AspectRatio
                          variant={selected ? "solid" : "outlined"}
                          color={selected ? "primary" : "neutral"}
                          ratio={1}
                          sx={{
                            width: 20,
                            borderRadius: 20,
                            ml: -0.5,
                            mr: 0.75,
                          }}
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
              )}
            </div>

            <Typography level="title-md" sx={{ fontWeight: "bold", mt: 2 }}>
              More options
            </Typography>
            <FormControl orientation="horizontal">
              <Box sx={{ flex: 1, pr: 1 }}>
                <FormLabel sx={{ typography: "title-sm" }}>Votes</FormLabel>
                <FormHelperText sx={{ typography: "body-sm", mt: 1 }}>
                  Hide articles with negative vote counts
                </FormHelperText>
              </Box>
              <Switch
                sx={{ mt: 3 }}
                checked={hideNegative}
                onChange={(event) => setHideNegative(event.target.checked)}
                inputProps={{ "aria-label": "controlled" }}
              />
            </FormControl>
            <Divider />

            <FormControl orientation="horizontal">
              <Box sx={{ flex: 1, mr: 1 }}>
                <FormLabel sx={{ typography: "title-sm" }}>
                  My Articles
                </FormLabel>
                <FormHelperText sx={{ typography: "body-sm", mt: 1 }}>
                  {user.name ? (
                    "Only show articles which I published"
                  ) : (
                    <Typography>
                      Please{" "}
                      <Button
                        variant="outlined"
                        color="neutral"
                        onClick={() => setModalOpen(true)}
                      >
                        Log in
                      </Button>{" "}
                      to view your articles
                    </Typography>
                  )}
                </FormHelperText>
              </Box>
              <Switch
                sx={{ mt: 3 }}
                checked={showAuthoredByUser}
                onChange={(event) =>
                  setShowAuthoredByUser(event.target.checked)
                }
                inputProps={{ "aria-label": "controlled" }}
                disabled={!user.name}
              />
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
                // CLIENT SIDE VERSION
                //setFilteredArticles(articles);
                setDateRange("all");
                setSelectedTopics(topicSlugs);
                setHideNegative(false);
                setShowAuthoredByUser(false);
                setSearchParams({ page: "1" });
                setFilters({});
                setFilteredCount(null);
              }}
            >
              Reset
            </Button>
            <Button
              sx={{ width: "140px" }}
              // disabled={isFetchingCount}
              onClick={applyFilters}
            >
              {filteredCount !== null ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {/* Show{" "} */}
                  {isFetchingCount ? (
                    <CircularProgress
                      variant="solid"
                      color="primary"
                      sx={{
                        "--CircularProgress-trackThickness": "2px",
                        "--CircularProgress-progressThickness": "2px",
                        "--CircularProgress-size": "15px",
                      }}
                      aria-label="Loading article count"
                    />
                  ) : (
                    `Show ${filteredCount} articles`
                  )}
                </Box>
              ) : (
                "Apply Filters" //if filtered  count is null
              )}
            </Button>

            {/* <Button onClick={() => setOpen(false)}>
              Show {filteredArticles.length} articles
            </Button> */}
          </Stack>
        </Sheet>
      </Drawer>
    </React.Fragment>
  );
}
