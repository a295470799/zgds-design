import {
  Box,
  Typography,
  Popover,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  CheckboxButtonGroup,
  FormContainer,
  useForm,
} from "react-hook-form-mui";
import { styled } from "@mui/material/styles";
import _ from "lodash-es";
import { useSetState } from "ahooks";

const StyledAccordionDetails = styled(AccordionDetails)`
  padding: 0;
  & .MuiFormControl-root {
    width: 100%;
  }
  & .MuiCheckbox-root {
    padding: 0;
    padding-right: 2px;
  }
  & .MuiFormControlLabel-root {
    margin: 0;
    margin-bottom: 10px;
    justify-content: space-between;
  }
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  &.MuiAccordionSummary-root {
    padding: 0;
  }
`;

interface Props {
  id?: string;
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLButtonElement | null;
  data?: any;
  onFilter?: (data: API.WishListParams) => void;
}

interface State {
  expanded: string[];
  brands: string[];
  categories: number[];
}

const WishListFilter: React.FC<Props> = (props) => {
  const { id, open, onClose, anchorEl, data, onFilter } = props;
  const [state, setState] = useSetState<State>({
    expanded: ["panel1", "panel2"],
    brands: [],
    categories: [],
  });

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setState({
        expanded: newExpanded
          ? _.union(state.expanded, [panel])
          : _.without(state.expanded, panel),
      });
    };

  const { control, handleSubmit, setValue, resetField } =
    useForm<API.WishListParams>({
      values: {
        cids: [],
        bnames: [],
      },
    });

  const onSubmit = async (values: API.WishListParams) => {
    onFilter?.(values);
  };

  const handleClear = () => {
    resetField("cids");
    resetField("bnames");
  };

  const handleSelectAll = () => {
    setValue("cids", state.categories);
    setValue("bnames", state.brands);
  };

  useEffect(() => {
    if (data?.brands) {
      setState({
        brands: Object.keys(data.brands),
      });
    }
    if (data?.categorys) {
      setState({
        categories: _.flattenDepth(
          Object.keys(data.categorys)?.map((item) => {
            return Object.values(data.categorys[item]?.childs)?.map(
              (child: any) => {
                return child.id;
              }
            );
          })
        ),
      });
    }
  }, [data]);

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        sx: {
          mt: 1,
          p: "30px 25px",
          width: 300,
          backgroundColor: "#fff",
        },
      }}
    >
      <FormContainer FormProps={{ onSubmit: handleSubmit(onSubmit) }}>
        <Box height={500} sx={{ overflowY: "auto" }}>
          <Accordion
            disableGutters
            sx={{
              boxShadow: "none",
              "& ::before": { opacity: 0 },
              color: (theme) => theme.palette.text.secondary,
            }}
            expanded={state.expanded.includes("panel1")}
            onChange={handleChange("panel1")}
          >
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                fontSize={"1.4rem"}
                fontWeight={700}
                color={"text.secondary"}
              >
                Category
              </Typography>
            </StyledAccordionSummary>
            {data?.categorys && (
              <StyledAccordionDetails>
                {Object.keys(data.categorys)?.map((item: any) => {
                  return (
                    <Box key={item}>
                      <Typography fontSize={"1.2rem"} fontWeight={500}>
                        {data.categorys[item]?.name}
                      </Typography>
                      {data.categorys[item]?.childs && (
                        <CheckboxButtonGroup
                          name="cids"
                          options={Object.values(
                            data.categorys[item].childs
                          ).map((child: any) => {
                            return {
                              id: child.id,
                              label: `${child.name} (${child.count})`,
                            };
                          })}
                          labelProps={{
                            labelPlacement: "start",
                            sx: { fontSize: "1.2rem" },
                          }}
                          control={control}
                        />
                      )}
                    </Box>
                  );
                })}
              </StyledAccordionDetails>
            )}
          </Accordion>
          <Accordion
            disableGutters
            sx={{ boxShadow: "none" }}
            expanded={state.expanded.includes("panel2")}
            onChange={handleChange("panel2")}
          >
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                fontSize={"1.4rem"}
                fontWeight={700}
                color={"text.secondary"}
              >
                Brand
              </Typography>
            </StyledAccordionSummary>
            {data?.brands && (
              <StyledAccordionDetails>
                <CheckboxButtonGroup
                  name="bnames"
                  options={Object.keys(data.brands).map((item: any) => {
                    return {
                      id: item,
                      label: `${item} (${data.brands[item]})`,
                    };
                  })}
                  labelProps={{
                    labelPlacement: "start",
                    sx: { fontSize: "1.2rem" },
                  }}
                  control={control}
                />
              </StyledAccordionDetails>
            )}
          </Accordion>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"}>
          <Button type="submit">VIEW</Button>
          <Button variant="outlined" color="dark" onClick={handleSelectAll}>
            ALL {data?.products?.total ?? 0}
          </Button>
          <Button variant="outlined" color="dark" onClick={handleClear}>
            CLEAR
          </Button>
        </Box>
      </FormContainer>
    </Popover>
  );
};

export default WishListFilter;
