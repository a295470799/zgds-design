import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Layout from "#lib/Layout";
import HelpSide from "@/components/account/HelpSide";
import BannerImg from "@assets/images/help/about_us.jpg";
import ImageComponent from "#lib/Image";

export default function AboutUs() {
  return (
    <Layout title="About Us" spaceBetween bodySx={{ marginBlockStart: 0 }}>
      <HelpSide code="about" />
      <Box flex={1}>
        <ImageComponent
          src={BannerImg}
          width={912}
          height={388}
          loading="lazy"
        />
        <Box
          fontSize={"1.4rem"}
          color={"text.secondary"}
          p={"33px 95px 40px"}
          sx={{
            ["& .MuiTypography-root"]: {
              mb: "20px",
            },
          }}
        >
          <Typography>
            Since we began in 2012, SONGMICS has been on a mission to make
            quality home necessities more accessible to homes far and wide. We
            design affordable, functional products that help you to furnish and
            organize your home while making your life just a little bit easier
            and more comfortable.
          </Typography>
          <Typography>
            We wouldn’t be where we are today without the valuable feedback we
            receive from our customers. With their input, we are able to
            continuously improve our products and experiences by tailoring our
            growth to their needs.As a result of their wide support, SONGMICS
            has become one of the top sellers for storage organizers, furniture,
            and other household essentials on Amazon and is now available in
            countries like Germany, the United States, France, Spain, Italy, the
            United Kingdom, Canada, and Japan.Since we began in 2012, SONGMICS
            has been on a mission to make quality home necessities more
            accessible to homes far and wide. We design affordable, functional
            products that help you to furnish and organize your home while
            making your life just a little bit easier and more comfortable.
          </Typography>
          <Typography>
            We wouldn’t be where we are today without the valuable feedback we
            receive from our customers. With their input, we are able to
            continuously improve our products and experiences by tailoring our
            growth to their needs.
          </Typography>
          <Typography>
            As a result of their wide support, SONGMICS has become one of the
            top sellers for storage organizers, furniture, and other household
            essentials on Amazon and is now available in countries like Germany,
            the United States, France, Spain, Italy, the United Kingdom, Canada,
            and Japan.
          </Typography>
        </Box>
      </Box>
    </Layout>
  );
}
