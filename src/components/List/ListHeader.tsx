import { Box, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useRef } from "react";
import { useHover } from "ahooks";
import { styled } from "@mui/material/styles";

const SortbyWrapper = styled("div")<{ width?: number }>`
  position: relative;
  display: inline-block;
  & .MuiSelect-select {
    width: ${(props) => props?.width ?? 170}px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 1.4rem;
    box-sizing: border-box;
    cursor: pointer;
  }
  & .dropdown__paper {
    position: absolute;
    border: 1px solid ${(props) => props.theme.palette.grey["400"]};
    border-top: 0;
    width: ${(props) => props?.width ?? 170}px;
    z-index: 1;
    .MuiMenuItem-root {
      font-size: 1.2rem;
      color: ${(props) => props.theme.palette.grey["500"]};
    }
  }
`;

interface Props {
  urlState: API.ProductListParams;
  onChange: (data: API.ProductListParams) => void;
}

const ListFilter: React.FC<Props> = (props) => {
  const { urlState, onChange } = props;
  const sortRef = useRef(null);
  const isSortHovering = useHover(sortRef);

  const pageRef = useRef(null);
  const isPageHovering = useHover(pageRef);

  const handleSortBy = (value: string) => {
    onChange({
      order: value,
    });
  };

  const handlePageSize = (value: number) => {
    onChange({
      page_size: value,
    });
  };

  const sortByList = [
    {
      id: "discount",
      label: "Discount: High to Low",
    },
    {
      id: "price_lowToheight",
      label: "Price: Low to High",
    },
    {
      id: "price_heightTolow",
      label: "Price: High to Low",
    },
    {
      id: "point",
      label: "Avg: Customer Rating",
    },
  ];

  const pageSizeList = [30, 60, 90, 150].map((item) => {
    return {
      id: item,
      label: item,
    };
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBlockEnd: "20px",
      }}
    >
      <SortbyWrapper ref={sortRef}>
        <Select defaultValue={0} readOnly>
          <MenuItem value="0">Sort By</MenuItem>
        </Select>
        <Paper hidden={!isSortHovering} className="dropdown__paper">
          {sortByList.map((item) => {
            return (
              <MenuItem onClick={() => handleSortBy(item.id)} key={item.id}>
                <Typography
                  color={urlState.order == item.id ? "secondary" : "inherit"}
                >
                  {item.label}
                </Typography>
              </MenuItem>
            );
          })}
        </Paper>
      </SortbyWrapper>

      <SortbyWrapper ref={pageRef} width={90}>
        <Select defaultValue={0} readOnly>
          <MenuItem value="0">Show</MenuItem>
        </Select>
        <Paper hidden={!isPageHovering} className="dropdown__paper">
          {pageSizeList.map((item) => {
            return (
              <MenuItem onClick={() => handlePageSize(item.id)} key={item.id}>
                <Typography
                  color={
                    urlState.page_size == item.id ? "secondary" : "inherit"
                  }
                >
                  {item.label}
                </Typography>
              </MenuItem>
            );
          })}
        </Paper>
      </SortbyWrapper>
      {/* <Box
        sx={{
          display: "flex",
          columnGap: "10px",
          alignItems: "center",
        }}
      >
        <Typography color="text.secondary" fontSize={"1.4rem"}>
          Page Size:
        </Typography>
        <SelectElement
          name="page_size"
          options={["30", "60", "90", "150"].map((item) => {
            return {
              id: item,
              label: item,
            };
          })}
          sx={{
            width: 80,
            "& .MuiInputBase-root": { height: 33 },
            "& .MuiFormHelperText-root": {
              display: "none",
            },
            "& .MuiInputBase-input": { fontSize: "1.4rem" },
          }}
          onChange={(e) =>
            onChange({
              page_size: e,
            })
          }
        />
        {[30, 60, 90, 150].map((item) => {
          return (
            <Link
              key={item}
              sx={{ cursor: "pointer" }}
              underline={item == urlState.page_size ? "always" : "hover"}
              color="text.secondary"
              fontSize={"1.4rem"}
              onClick={() => {
                setUrlState({
                  page_size: item,
                });
              }}
            >
              {item}
            </Link>
          );
        })}
      </Box> */}
    </Box>
  );
};

export default ListFilter;
