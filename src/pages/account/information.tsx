import AccountWrapper from "@/components/account/AccountWrapper";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PasswordIcon from "@assets/icons/account/exchange-three.svg";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { useSetState } from "ahooks";
import EditIcon from "@assets/icons/account/edit.svg";
import PersonIcon from "@mui/icons-material/Person";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const StyledCard = styled(Paper)`
  margin-top: 50px;
  padding: 20px;
`;

const StyledCardTitle = styled("div")`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 1.2rem;
  color: ${(props) => props.theme.palette.primary.main};
  margin-bottom: 9px;
`;

const StyledLiItem = styled("li")`
  width: 33.33%;
  margin-top: 20px;
  &.fullWidth {
    width: 100%;
  }
  span {
    font-size: 1.4rem;
    font-weight: 500;
    &:first-of-type {
      font-weight: 400;
      color: ${(props) => props.theme.palette.text.secondary};
    }
  }
`;

type State = {
  type?: "first name" | "last name" | "password" | "email";
  open: boolean;
  tabValue: number;
};

export default function () {
  const [state, setState] = useSetState<State>({
    open: false,
    tabValue: 0,
  });

  const handleClickOpen = (type: State["type"]) => {
    setState({
      type,
      open: true,
    });
  };

  const handleClose = () => {
    setState({
      open: false,
    });
  };

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && <>{children}</>}
      </div>
    );
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setState({
      tabValue: newValue,
    });
  };

  return (
    <AccountWrapper code="information">
      <Paper
        sx={(theme) => {
          return {
            background: theme.palette.primary.light,
            height: "150px",
            padding: "20px 30px 20px 40px",
            color: theme.palette.common.white,
          };
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography color="inherit" fontSize="2.0rem" fontWeight={700}>
            PERSONAL INFO
          </Typography>
          <Link
            href="#"
            color="inherit"
            underline="always"
            fontSize={"1.2rem"}
            fontWeight={500}
            display={"flex"}
            columnGap={1}
            onClick={() => handleClickOpen("password")}
          >
            CHANGE PASSWORD
            <img src={PasswordIcon} />
          </Link>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"space-between"}
          padding={"28px 30px 44px"}
        >
          <Box display={"flex"} alignItems={"center"} columnGap={1}>
            <Typography fontSize={"1.2rem"}>FIRST NAME:Wang5</Typography>
            <IconButton onClick={() => handleClickOpen("first name")}>
              <img src={EditIcon} />
            </IconButton>
          </Box>
          <Box display={"flex"} alignItems={"center"} columnGap={1}>
            <Typography fontSize={"1.2rem"}>LAST NAME:Songxian5</Typography>
            <IconButton onClick={() => handleClickOpen("last name")}>
              <img src={EditIcon} />
            </IconButton>
          </Box>
          <Box display={"flex"} alignItems={"center"} columnGap={1}>
            <Typography fontSize={"1.2rem"}>
              EMAIL:wsxzieljob@126.com
            </Typography>
            <IconButton onClick={() => handleClickOpen("email")}>
              <img src={EditIcon} />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      <StyledCard elevation={24}>
        <StyledCardTitle>BASIC CUSTOMER INFORMATION</StyledCardTitle>
        <Box component={"ul"} display={"flex"} flexWrap={"wrap"}>
          <StyledLiItem>
            <span>Client Code:</span> <span>20000419</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Client Type:</span> <span>T2</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Client Name:</span> <span>Home24 SE</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Tel:</span> <span></span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Tax Code:</span> <span>DE266182271</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Currency:</span> <span>EUR</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Price Term Code:</span> <span>0019</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Business Scope:</span> <span></span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Sales Range:</span> <span>T1</span>
          </StyledLiItem>
        </Box>
      </StyledCard>

      <StyledCard elevation={24}>
        <StyledCardTitle>BASIC CUSTOMER INFORMATION-ADD.</StyledCardTitle>
        <Box component={"ul"} display={"flex"} flexWrap={"wrap"}>
          <StyledLiItem>
            <span>Country:</span> <span>Germany</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Province/State:</span> <span>Berlin</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Post code:</span> <span>10249</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Tel:</span> <span></span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Tax Code:</span> <span>DE266182271</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>ADD.:</span> <span>Otto-Ostrowski-Str. 3</span>
          </StyledLiItem>
        </Box>
      </StyledCard>

      <StyledCard elevation={24}>
        <StyledCardTitle>CLIENT ATTRIBUTION</StyledCardTitle>
        <Box component={"ul"} display={"flex"} flexWrap={"wrap"}>
          <StyledLiItem>
            <span>Sale Group:</span> <span>634010201</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Saler:</span> <span>Paola Han</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Sales Assistant:</span> <span>Paola Han</span>
          </StyledLiItem>
        </Box>
      </StyledCard>

      <StyledCard elevation={24}>
        <StyledCardTitle>
          <span>PARTNERS INFORMATION</span>
          <Tabs
            value={state.tabValue}
            onChange={handleTabChange}
            centered
            aria-label="partners information tabs"
            sx={{ minHeight: "auto", marginTop: "-10px" }}
          >
            <Tab
              icon={<PersonIcon fontSize="small" />}
              iconPosition="start"
              label="Ship-to Party"
              sx={{ fontSize: "1.2rem", minHeight: "auto" }}
            />
            <Tab
              icon={<PersonIcon fontSize="small" />}
              iconPosition="start"
              label="Bill-to Party"
              sx={{ fontSize: "1.2rem", minHeight: "auto" }}
            />
          </Tabs>
        </StyledCardTitle>

        <TabPanel value={state.tabValue} index={0}>
          <Box
            component={"ul"}
            display={"flex"}
            flexWrap={"wrap"}
            sx={(theme) => {
              return {
                background: theme.palette.background.paper,
                padding: "0 40px 25px",
                marginTop: "30px",
              };
            }}
          >
            <StyledLiItem className="fullWidth">
              <Typography fontWeight={500}>Home24 SE</Typography>
            </StyledLiItem>
            <StyledLiItem>
              <span>Client Code:</span> <span>20000419</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Short Name:</span> <span>Home24 SE</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Tax Code:</span> <span>DE266182271</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Country:</span> <span>Germany</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Province/State:</span> <span>Berlin</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Post code:</span> <span>10249</span>
            </StyledLiItem>
            <StyledLiItem className="fullWidth">
              <span>Tel:</span> <span></span>
            </StyledLiItem>
            <StyledLiItem className="fullWidth">
              <span>Detailed address:</span> <span>Otto-Ostrowski-Str. 3</span>
            </StyledLiItem>
          </Box>
        </TabPanel>
        <TabPanel value={state.tabValue} index={1}>
          <Box
            component={"ul"}
            display={"flex"}
            flexWrap={"wrap"}
            sx={(theme) => {
              return {
                background: theme.palette.background.paper,
                padding: "0 40px 25px",
                marginTop: "30px",
              };
            }}
          >
            <StyledLiItem className="fullWidth">
              <Typography fontWeight={500}>Home24 SE</Typography>
            </StyledLiItem>
            <StyledLiItem>
              <span>Client Code:</span> <span>20000419</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Short Name:</span> <span>Home24 SE</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Tax Code:</span> <span>DE266182271</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Country:</span> <span>Germany</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Province/State:</span> <span>Berlin</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Post code:</span> <span>10249</span>
            </StyledLiItem>
            <StyledLiItem className="fullWidth">
              <span>Tel:</span> <span></span>
            </StyledLiItem>
            <StyledLiItem className="fullWidth">
              <span>Detailed address:</span> <span>Otto-Ostrowski-Str. 3</span>
            </StyledLiItem>
          </Box>
          <Box
            component={"ul"}
            display={"flex"}
            flexWrap={"wrap"}
            sx={(theme) => {
              return {
                background: theme.palette.background.paper,
                padding: "0 40px 25px",
                marginTop: "30px",
              };
            }}
          >
            <StyledLiItem className="fullWidth">
              <Typography fontWeight={500}>Home24 SE</Typography>
            </StyledLiItem>
            <StyledLiItem>
              <span>Client Code:</span> <span>20000419</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Short Name:</span> <span>Home24 SE</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Tax Code:</span> <span>DE266182271</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Country:</span> <span>Germany</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Province/State:</span> <span>Berlin</span>
            </StyledLiItem>
            <StyledLiItem>
              <span>Post code:</span> <span>10249</span>
            </StyledLiItem>
            <StyledLiItem className="fullWidth">
              <span>Tel:</span> <span></span>
            </StyledLiItem>
            <StyledLiItem className="fullWidth">
              <span>Detailed address:</span> <span>Otto-Ostrowski-Str. 3</span>
            </StyledLiItem>
          </Box>
        </TabPanel>
      </StyledCard>

      <Dialog open={state.open}>
        <FormContainer
          onSuccess={async (data) => {
            console.log(data);
          }}
        >
          <DialogTitle>CHANGE {state.type?.toUpperCase()}</DialogTitle>
          <DialogContent sx={{ paddingTop: "10px!important" }}>
            {state.type == "password" && (
              <>
                <TextFieldElement
                  autoFocus
                  required
                  label="Old Password"
                  name="password"
                  fullWidth
                />
                <TextFieldElement
                  required
                  label="New Password"
                  name="new_password"
                  fullWidth
                />
                <TextFieldElement
                  required
                  label="Confirm Password"
                  name="confirm_password"
                  fullWidth
                />
              </>
            )}

            {state.type == "first name" && (
              <TextFieldElement
                required
                label="First Name"
                name="firstname"
                fullWidth
                autoFocus
                sx={{ width: 350 }}
              />
            )}

            {state.type == "last name" && (
              <TextFieldElement
                required
                label="Last Name"
                name="lastname"
                fullWidth
                autoFocus
                sx={{ width: 350 }}
              />
            )}

            {state.type == "email" && (
              <TextFieldElement
                required
                label="Email"
                name="email"
                fullWidth
                autoFocus
                sx={{ width: 350 }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </FormContainer>
      </Dialog>
    </AccountWrapper>
  );
}
