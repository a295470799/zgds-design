import { getProductInfo } from "@/api/product";
import { Box, Button, IconButton, Paper, Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Stepper from "#lib/Stepper";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Breadcrumb from "#lib/Breadcrumb";
import { formatPrice } from "@/utils/format";
import ImageComponent from "#lib/Image";
import WishIcon from "@assets/icons/product/wish.svg";
import PdfIcon from "@assets/icons/product/pdf.svg";
import DownloadIcon from "@assets/icons/product/pdf-download.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { Thumbs, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Layout from "#lib/Layout";
import { useRequest } from "ahooks";
import { useParams } from "react-router";
import { enqueueSnackbar } from "notistack";
import { addToCart } from "@/api/cart";

const StyledInfo = styled("div")`
  display: flex;
`;

const StyledInfoLeft = styled("div")`
  flex: 0 0 auto;
  width: 500px;
  .product-thumbs-swiper {
    .swiper-button-next,
    .swiper-button-prev {
      color: ${(props) => props.theme.palette.grey[900]};
      background: #fff;
      ::after {
        font-size: 1.6rem;
      }
    }
    .swiper-slide {
      opacity: 0.5;
    }
    .swiper-slide-thumb-active {
      opacity: 1;
    }
  }
`;

const StyledInfoRight = styled("div")`
  flex: 1;
  padding: 0 35px;
`;

const StyledPriceInterval = styled("div")`
  display: flex;
  column-gap: 20px;
  margin: 10px 0 20px;
`;

const StyledAttrs = styled("div")`
  display: flex;
  margin-bottom: 25px;
  > div {
    flex: 0 0 auto;
    width: 33.33%;
  }
`;

const StyleTabs = styled(Box)`
  .MuiTab-root.Mui-selected {
    color: ${(props) => props.theme.palette.secondary.main};
  }
  .MuiTabs-indicator {
    background-color: ${(props) => props.theme.palette.secondary.main};
  }
`;

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export default function Product() {
  const { sku } = useParams();
  const { data: info } = useRequest<any, [string]>(getProductInfo, {
    defaultParams: [sku ?? ""],
  });

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [qty, setQty] = useState(1);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
      sx: { fontWeight: 500, color: "text.third" },
    };
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
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  const handleAddToCart = async () => {
    await addToCart(info.id, qty);
    enqueueSnackbar(`You've added ${qty} item(s) to your cart.`, {
      variant: "success",
    });
  };

  return (
    <Layout>
      <Breadcrumb>
        <Link href="/" color="inherit">
          Home
        </Link>
        <Typography color="secondary" fontSize={"1.2rem"}>
          {info?.short_name}
        </Typography>
      </Breadcrumb>
      <StyledInfo>
        <StyledInfoLeft>
          <Swiper
            modules={[Thumbs]}
            thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
            observer
            observeParents
            observeSlideChildren
          >
            {info?.images?.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <ImageComponent
                    src={item.image}
                    alt="product image"
                    width={500}
                    height={500}
                    fit="contain"
                    loadingType="loading"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            className="product-thumbs-swiper"
            modules={[Thumbs, Navigation]}
            watchSlidesProgress
            watchOverflow
            onSwiper={setThumbsSwiper}
            slidesPerView={6}
            spaceBetween={10}
            navigation={true}
            style={{ marginBlockStart: 10 }}
            observer
            observeParents
            observeSlideChildren
          >
            {info?.images?.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <ImageComponent
                    src={item.image}
                    alt="product image"
                    width={75}
                    height={75}
                    fit="cover"
                    sx={{ cursor: "pointer" }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </StyledInfoLeft>
        <StyledInfoRight>
          <Typography color="text.secondary" fontWeight={500}>
            {info?.long_name}
          </Typography>
          <Typography
            color="text.fourth"
            fontSize={"1.4rem"}
            sx={{ marginBlock: "10px", lineHeight: 1 }}
          >
            SKU: {info?.sku}
          </Typography>
          <Box>
            <Typography
              color="text.secondary"
              fontSize={"1.4rem"}
              fontWeight={500}
              component="span"
            >
              Unit Price:{" "}
            </Typography>
            <Typography
              color="secondary"
              fontSize={"1.4rem"}
              fontWeight={500}
              component="span"
            >
              {formatPrice(41.99)}
            </Typography>
            <Typography
              color="secondary"
              fontSize={"1.4rem"}
              component="span"
              sx={{ marginLeft: "20px" }}
            >
              Tax and Shipping Not Included
            </Typography>
          </Box>
          <StyledPriceInterval>
            {info?.prices.map((item: any, index: number) => {
              return (
                <Box
                  sx={{
                    backgroundColor: "rgba(71,168,180,.3)",
                    width: 70,
                    padding: "5px 0 5px 7px",
                  }}
                  key={index}
                >
                  <Typography
                    color="text.primary"
                    fontSize={"1.4rem"}
                    fontWeight={500}
                  >
                    {item.section}
                  </Typography>
                  <Typography
                    color="secondary"
                    fontSize={"1.4rem"}
                    fontWeight={500}
                  >
                    {formatPrice(item.price)}
                  </Typography>
                </Box>
              );
            })}
          </StyledPriceInterval>
          <StyledAttrs>
            <Box>
              <Typography color="text.fourth" fontSize={"1.4rem"}>
                Color:
              </Typography>
              <Typography
                color="text.secondary"
                fontSize={"1.4rem"}
                fontWeight={500}
              >
                Silver
              </Typography>
            </Box>
            <Box>
              <Typography color="text.fourth" fontSize={"1.4rem"}>
                Material:
              </Typography>
              <Typography
                color="text.secondary"
                fontSize={"1.4rem"}
                fontWeight={500}
              >
                Steel
              </Typography>
            </Box>
          </StyledAttrs>
          <StyledAttrs>
            <Box>
              <Typography color="text.fourth" fontSize={"1.4rem"}>
                Stock:
              </Typography>
              <Typography
                color="text.secondary"
                fontSize={"1.4rem"}
                fontWeight={500}
              >
                Backorder
              </Typography>
            </Box>
            <Box>
              <Typography color="text.fourth" fontSize={"1.4rem"}>
                Restock Date:
              </Typography>
              <Typography
                color="text.secondary"
                fontSize={"1.4rem"}
                fontWeight={500}
              >
                2022-10-01
              </Typography>
            </Box>
            <Box>
              <Typography color="text.fourth" fontSize={"1.4rem"}>
                Restock Quantity:
              </Typography>
              <Typography
                color="text.secondary"
                fontSize={"1.4rem"}
                fontWeight={500}
              >
                200
              </Typography>
            </Box>
          </StyledAttrs>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography color="text.fifth" fontSize={"1.4rem"} fontWeight={500}>
              QTY:
            </Typography>
            <Box sx={{ margin: "0 15px 0 10px" }}>
              <Stepper value={qty} onChange={setQty} />
            </Box>
            <Typography color="secondary" fontSize={"1.4rem"} fontWeight={500}>
              MOQ 1pcs
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBlockStart: "25px",
              columnGap: "23px",
            }}
          >
            <Button
              color="secondary"
              size="medium"
              sx={{ width: 280, fontWeight: 500, fontSize: 16 }}
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
            <IconButton aria-label="add to wish">
              <img src={WishIcon} />
            </IconButton>
          </Box>
        </StyledInfoRight>
      </StyledInfo>
      <StyleTabs sx={{ width: "100%", marginBlockStart: "40px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Feature" {...a11yProps(0)} />
            <Tab label="Description" {...a11yProps(1)} />
            <Tab label="Instrustion" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          {info?.features.map((item: string, index: number) => {
            return (
              <Typography
                fontSize={"1.4rem"}
                key={index}
                color="text.fifth"
                marginBottom="5px"
              >
                {item}
              </Typography>
            );
          })}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography
            dangerouslySetInnerHTML={{ __html: info?.content }}
            fontSize={"1.4rem"}
            color="text.fifth"
          ></Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              rowGap: "10px",
              padding: "25px",
              width: 190,
              height: 160,
              background: "#f8f9fa",
            }}
          >
            <Typography
              color="text.secondary"
              fontSize={"1.4rem"}
              fontWeight={500}
            >
              PRODUCT MANUAL
            </Typography>
            <img src={PdfIcon} />
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
          </Paper>
        </TabPanel>
      </StyleTabs>
    </Layout>
  );
}
