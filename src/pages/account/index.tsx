import AccountWrapper from "@/components/account/AccountWrapper";
import { formatPrice } from "@/utils/format";
import { Box, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import DownloadIcon from "@assets/icons/product/pdf-download.svg";
import CsvIcon from "@assets/icons/account/csv.svg";
import XlsIcon from "@assets/icons/account/xls.svg";

const StyledStatistic = styled(Paper)<{ width?: number }>`
  width: ${(props) => props?.width ?? 220}px;
  height: 120px;
  padding: 20px 20px 30px 20px;
`;

const StyledStatisticTitle = styled("p")`
  font-size: 1.2rem;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: 500;
`;

const StyledStatisticContent = styled("p")`
  color: ${(props) => props.theme.palette.text.secondary};
  font-size: 2.4rem;
  font-weight: 700;
  margin-top: 20px;
`;

const StyledCard = styled(Paper)`
  margin-top: 50px;
  padding: 20px;
`;

const StyledCardTitle = styled("p")`
  font-weight: 500;
  font-size: 1.2rem;
  color: ${(props) => props.theme.palette.primary.main};
  margin-bottom: 9px;
`;

const StyledDownloadCard = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  padding: 25px;
  width: 190;
  height: 160;
  background: #f8f9fa;
`;

const StyledDownloadCardTitle = styled("p")`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${(props) => props.theme.palette.text.secondary};
`;

const StyledCardTable = styled("ul")`
  & .table-head {
    color: ${(props) => props.theme.palette.primary.light};
  }
  li {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: ${(props) => props.theme.palette.text.secondary};
    padding: 8px 0;
    border-bottom: 1px solid rgba(102, 102, 102, 0.2);
    :last-child {
      border-bottom: 0;
    }
    span {
      flex: 0 0 auto;
      box-sizing: border-box;
      padding-right: 10px;
      :nth-of-type(1) {
        width: 40%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      :nth-of-type(2) {
        width: 20%;
      }
      :nth-of-type(3) {
        width: 15%;
      }
      :nth-of-type(4) {
        width: 25%;
        padding-right: 0;
      }
    }
  }
`;

export default function () {
  return (
    <AccountWrapper>
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
            Hello EUziel!
          </Typography>
          <Typography color="inherit" fontSize="1.6rem" fontWeight={500}>
            Welcome to ZIEL Global Distributor System
          </Typography>
        </Box>
      </Paper>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="0 30px"
        marginTop="-40px"
      >
        <StyledStatistic elevation={24}>
          <StyledStatisticTitle>TOTAL ORDERS</StyledStatisticTitle>
          <StyledStatisticContent>0</StyledStatisticContent>
        </StyledStatistic>
        <StyledStatistic width={300} elevation={24}>
          <StyledStatisticTitle>TOTAL AMOUNTS</StyledStatisticTitle>
          <StyledStatisticContent>{formatPrice(0)}</StyledStatisticContent>
        </StyledStatistic>
        <StyledStatistic elevation={24}>
          <StyledStatisticTitle>TOTAL UNITS</StyledStatisticTitle>
          <StyledStatisticContent>0</StyledStatisticContent>
        </StyledStatistic>
      </Box>
      <StyledCard elevation={24}>
        <StyledCardTitle>Document DOWNLOAD</StyledCardTitle>
        <Box display="flex" justifyContent="space-evenly">
          <StyledDownloadCard elevation={24}>
            <StyledDownloadCardTitle>PRODUCTS INFO</StyledDownloadCardTitle>
            <img src={CsvIcon} />
            <Button variant="outlined">
              <Typography
                color="#4d9ebf"
                fontSize={"1.2rem"}
                fontWeight={500}
                sx={{ marginRight: 1 }}
              >
                DOWNLOAD
              </Typography>
              <img src={DownloadIcon} />
            </Button>
          </StyledDownloadCard>
          <StyledDownloadCard elevation={24}>
            <StyledDownloadCardTitle>STOCK TEMPLATE</StyledDownloadCardTitle>
            <img src={XlsIcon} />
            <Button variant="outlined">
              <Typography
                color="#4d9ebf"
                fontSize={"1.2rem"}
                fontWeight={500}
                sx={{ marginRight: 1 }}
              >
                DOWNLOAD
              </Typography>
              <img src={DownloadIcon} />
            </Button>
          </StyledDownloadCard>
        </Box>
      </StyledCard>
      <StyledCard elevation={24}>
        <StyledCardTitle>TOP ITEMS YOU BOUGHT</StyledCardTitle>
        <StyledCardTable>
          <li>
            <span>VASAGLE Side Table</span>
            <span>SKU: PCT161W01</span>
            <span>QTY: 200</span>
            <span>TOTAL: 3769,99 €</span>
          </li>
          <li>
            <span>VASAGLE Side Table</span>
            <span>SKU: PCT161W01</span>
            <span>QTY: 200</span>
            <span>TOTAL: 3769,99 €</span>
          </li>
          <li>
            <span>VASAGLE Side Table</span>
            <span>SKU: PCT161W01</span>
            <span>QTY: 200</span>
            <span>TOTAL: 3769,99 €</span>
          </li>
          <li>
            <span>VASAGLE Side Table</span>
            <span>SKU: PCT161W01</span>
            <span>QTY: 200</span>
            <span>TOTAL: 3769,99 €</span>
          </li>
          <li>
            <span>VASAGLE Side Table</span>
            <span>SKU: PCT161W01</span>
            <span>QTY: 200</span>
            <span>TOTAL: 3769,99 €</span>
          </li>
        </StyledCardTable>
        {/* <Typography>---</Typography> */}
      </StyledCard>
      <StyledCard elevation={24}>
        <StyledCardTitle>TOP COOPERATIVE CUSTOMERS</StyledCardTitle>
        <StyledCardTable>
          <li className="table-head">
            <span>CUSTOMER NAME</span>
            <span>COUNTRY</span>
            <span>SALES%</span>
            <span>TOTAL AMOUNTS</span>
          </li>
          <li>
            <span>HOME24</span>
            <span>DE</span>
            <span>65.72%</span>
            <span>87,769,99 €</span>
          </li>
          <li>
            <span>Wayfair</span>
            <span>UK</span>
            <span>45.95%</span>
            <span>69,569,99 €</span>
          </li>
          <li>
            <span>MADE</span>
            <span>FR</span>
            <span>32.00%</span>
            <span>5,330,99 €</span>
          </li>
          <li>
            <span>Westelm</span>
            <span>ES</span>
            <span>17.26%</span>
            <span>789,99 €</span>
          </li>
        </StyledCardTable>
        {/* <Typography>---</Typography> */}
      </StyledCard>
    </AccountWrapper>
  );
}
