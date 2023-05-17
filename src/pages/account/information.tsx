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
import {
  FormContainer,
  TextFieldElement,
  useForm,
  PasswordRepeatElement,
  PasswordElement,
} from "react-hook-form-mui";
import { useRequest, useSetState } from "ahooks";
import EditIcon from "@assets/icons/account/edit.svg";
import PersonIcon from "@mui/icons-material/Person";
import {
  getInformation,
  updateEmail,
  updateFirstName,
  updateLastName,
  updatePassword,
} from "@/api/account";
import { useMessage } from "#lib/MessageProvider";

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

  const { data } = useRequest(getInformation);
  const { msg } = useMessage();

  const formContext = useForm<API.InformationParams>({
    values: {
      firstname: data?.user?.firstname,
      lastname: data?.user?.lastname,
      email: data?.user?.email,
    },
  });

  const handleClickOpen = (type: State["type"]) => {
    if (type == "password") {
      formContext.reset();
    }
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

  const handleSubmit = async (data: API.InformationParams) => {
    switch (state.type) {
      case "first name":
        if (data?.firstname) {
          await updateFirstName(data.firstname);
        }

        break;
      case "last name":
        if (data?.lastname) {
          await updateLastName(data.lastname);
        }

        break;
      case "email":
        if (data?.email) {
          await updateEmail(data.email);
        }
        break;
      case "password":
        await updatePassword({
          old_password: data.old_password,
          new_password: data.new_password,
          confirm_password: data.confirm_password,
        });
        break;
    }

    msg({
      message: "Update successfully!",
      onConfirm() {
        window.location.reload();
      },
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
          <Typography fontSize="2.0rem" fontWeight={700}>
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
            <Typography fontSize={"1.2rem"}>
              FIRST NAME:{data?.user?.firstname}
            </Typography>
            <IconButton onClick={() => handleClickOpen("first name")}>
              <img src={EditIcon} />
            </IconButton>
          </Box>
          <Box display={"flex"} alignItems={"center"} columnGap={1}>
            <Typography fontSize={"1.2rem"}>
              LAST NAME:{data?.user?.lastname}
            </Typography>
            <IconButton onClick={() => handleClickOpen("last name")}>
              <img src={EditIcon} />
            </IconButton>
          </Box>
          <Box display={"flex"} alignItems={"center"} columnGap={1}>
            <Typography fontSize={"1.2rem"}>
              EMAIL:{data?.user?.email}
            </Typography>
            <IconButton onClick={() => handleClickOpen("email")}>
              <img src={EditIcon} />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      <StyledCard>
        <StyledCardTitle>BASIC CUSTOMER INFORMATION</StyledCardTitle>
        <Box component={"ul"} display={"flex"} flexWrap={"wrap"}>
          <StyledLiItem>
            <span>Client Code:</span>{" "}
            <span>{data?.user?.eya_t2?.customerCode}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Client Type:</span>{" "}
            <span>{data?.user?.eya_t2?.customerTypeCode}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Client Name:</span>{" "}
            <span>{data?.user?.eya_t2?.customerName}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Tel:</span> <span>{data?.user?.eya_t2?.telephoneInfo}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Tax Code:</span> <span>{data?.user?.eya_t2?.taxNumber}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Currency:</span>{" "}
            <span>{data?.user?.eya_t2?.currencyCode}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Price Term Code:</span>{" "}
            <span>{data?.user?.eya_t2?.paymentConditionCode}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Business Scope:</span>{" "}
            <span>{data?.user?.eya_t2?.customerBusinessScopeCode}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Sales Range:</span>{" "}
            <span>{data?.user?.eya_t2?.customerSalesChannelCode}</span>
          </StyledLiItem>
        </Box>
      </StyledCard>

      <StyledCard>
        <StyledCardTitle>BASIC CUSTOMER INFORMATION-ADD.</StyledCardTitle>
        <Box component={"ul"} display={"flex"} flexWrap={"wrap"}>
          <StyledLiItem>
            <span>Country:</span>{" "}
            <span>{data?.user?.eya_t2?.countryAreaNameEn}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Province/State:</span>{" "}
            <span>{data?.user?.eya_t2?.provinceAreaNameEn}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Post code:</span> <span>{data?.user?.eya_t2?.postCode}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Tel:</span> <span>{data?.user?.eya_t2?.telephoneInfo}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Tax Code:</span> <span>{data?.user?.eya_t2?.taxNumber}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>ADD.:</span> <span>{data?.user?.eya_t2?.addressDetail}</span>
          </StyledLiItem>
        </Box>
      </StyledCard>

      <StyledCard>
        <StyledCardTitle>CLIENT ATTRIBUTION</StyledCardTitle>
        <Box component={"ul"} display={"flex"} flexWrap={"wrap"}>
          <StyledLiItem>
            <span>Sale Group:</span>{" "}
            <span>{data?.user?.eya_t2?.businessGroupCode}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Saler:</span>{" "}
            <span>{data?.user?.eya_t2?.businessEmptName_en}</span>
          </StyledLiItem>
          <StyledLiItem>
            <span>Sales Assistant:</span>{" "}
            <span>{data?.user?.eya_t2?.assistantEmptName_en}</span>
          </StyledLiItem>
        </Box>
      </StyledCard>

      <StyledCard>
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
          {data?.eya_users?.T5?.map((item: any, index: number) => {
            return (
              <Box
                key={index}
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
                  <Typography fontWeight={500}>{item?.customerName}</Typography>
                </StyledLiItem>
                <StyledLiItem>
                  <span>Client Code:</span> <span>{item?.partnerCode}</span>
                </StyledLiItem>
                <StyledLiItem>
                  <span>Short Name:</span>{" "}
                  <span>{item?.customerShortName}</span>
                </StyledLiItem>
                <StyledLiItem>
                  <span>Tax Code:</span> <span>{item?.taxNumber}</span>
                </StyledLiItem>
                <StyledLiItem>
                  <span>Country:</span> <span>{item?.countryAreaNameEn}</span>
                </StyledLiItem>
                <StyledLiItem>
                  <span>Province/State:</span>{" "}
                  <span>{item?.provinceAreaNameEn}</span>
                </StyledLiItem>
                <StyledLiItem>
                  <span>Post code:</span> <span>{item?.postCode}</span>
                </StyledLiItem>
                <StyledLiItem className="fullWidth">
                  <span>Tel:</span> <span>{item?.telephoneInfo}</span>
                </StyledLiItem>
                <StyledLiItem className="fullWidth">
                  <span>Detailed address:</span>{" "}
                  <span>{item?.addressDetail}</span>
                </StyledLiItem>
              </Box>
            );
          })}
        </TabPanel>
        <TabPanel value={state.tabValue} index={1}>
          {data?.eya_users?.T6?.map((item: any, index: number) => {
            return (
              <Box
                key={index}
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
                  <Typography fontWeight={500}>{item?.customerName}</Typography>
                </StyledLiItem>
                <StyledLiItem>
                  <span>Client Code:</span> <span>{item?.partnerCode}</span>
                </StyledLiItem>
                <StyledLiItem>
                  <span>Short Name:</span>{" "}
                  <span>{item?.customerShortName}</span>
                </StyledLiItem>
                <StyledLiItem>
                  <span>Tax Code:</span> <span>{item?.taxNumber}</span>
                </StyledLiItem>
                <StyledLiItem>
                  <span>Country:</span> <span>{item?.countryAreaNameEn}</span>
                </StyledLiItem>
                <StyledLiItem>
                  <span>Province/State:</span>{" "}
                  <span>{item?.provinceAreaNameEn}</span>
                </StyledLiItem>
                <StyledLiItem>
                  <span>Post code:</span> <span>{item?.postCode}</span>
                </StyledLiItem>
                <StyledLiItem className="fullWidth">
                  <span>Tel:</span> <span>{item?.telephoneInfo}</span>
                </StyledLiItem>
                <StyledLiItem className="fullWidth">
                  <span>Detailed address:</span>{" "}
                  <span>{item?.addressDetail}</span>
                </StyledLiItem>
              </Box>
            );
          })}
        </TabPanel>
      </StyledCard>
      <Dialog open={state.open}>
        <DialogTitle>CHANGE {state.type?.toUpperCase()}</DialogTitle>
        <FormContainer<API.InformationParams>
          onSuccess={handleSubmit}
          formContext={formContext}
        >
          <DialogContent sx={{ pt: "10px!important" }}>
            {state.type == "password" && (
              <>
                <PasswordElement
                  autoFocus
                  required
                  label="Old Password"
                  name="old_password"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <PasswordElement
                  required
                  label="New Password"
                  name="new_password"
                  fullWidth
                  sx={{ mb: 2 }}
                  validation={{
                    validate: (value: string) => {
                      if (!/(\w){6,25}$/.test(value)) {
                        return "Password between 6-25 characters";
                      }
                      return true;
                    },
                  }}
                />
                <PasswordRepeatElement
                  passwordFieldName="new_password"
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
                type="email"
                sx={{ width: 350 }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </FormContainer>
      </Dialog>
    </AccountWrapper>
  );
}
