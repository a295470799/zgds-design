import { styled } from "@mui/material/styles";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Box, Button } from "@mui/material";
import Link from "@mui/material/Link";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
// import { useState } from "react";
import ImageComponent from "#lib/Image";
import { useRequest } from "ahooks";
import { login } from "@/api/user";
import { setToken } from "@/utils/auth";

const Container = styled("div")`
  background-color: #0074a3;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 1080px;
  height: 600px;
  background: #fff;
  border-radius: 6px;
`;

const LoginSwiper = styled(Swiper)`
  width: 680px;
  margin-right: -14px;
  .swiper-pagination-bullet {
    background-color: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    width: 20px;
    border-radius: 6px;
  }
`;

const LoginForm = styled("div")`
  flex: 1;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const FormHead = styled("div")`
  font-weight: 700;
  font-size: 2rem;
  line-height: 20px;
  color: #0074a3;
`;
const FormBody = styled("div")`
  padding: 0 50px;
  margin: 0 auto;
  & > form {
    display: flex;
    flex-direction: column;
  }
  & .MuiTextField-root {
    width: 240px;
  }
  & .MuiFormHelperText-root.Mui-error {
    opacity: 0;
  }
`;

const StyledOr = styled("div")`
  text-align: center;
  color: ${(props) => props.theme.palette.primary.main};
  margin: 10px 0;
`;

const StyledLine = styled("span")`
  display: inline-block;
  width: 2px;
  height: 8px;
  background: #0074a3;
  border-radius: 6px;
  margin: 0 12px;
`;

const StyledTitle = styled("div")`
  font-weight: 700;
  font-size: 2rem;
  color: ${(props) => props.theme.palette.primary.main};
  margin-bottom: 25px;
  text-align: center;
`;

// type FormProps = {
//   email: string;
//   password: string;
// };

export default function Login() {
  const { data: images } = useRequest(async () => {
    return await ["/image/login/1.jpg", "/image/login/2.jpg"];
  });

  // const [values, setValues] = useState<FormProps>();
  // const onSubmit = (data: FormProps) => {
  //   setValues(data);
  // };

  return (
    <Container>
      <LoginWrapper>
        <LoginSwiper modules={[Pagination]} pagination={{ clickable: true }}>
          {images?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <ImageComponent
                  src={item}
                  alt="banner"
                  width={680}
                  height={600}
                />
              </SwiperSlide>
            );
          })}
        </LoginSwiper>
        <LoginForm>
          <FormHead>ZIEL Global Distributor System</FormHead>
          <FormBody>
            <StyledTitle>LOGIN</StyledTitle>
            <FormContainer
              onSuccess={async (data: API.Login) => {
                const res = await login(data);
                if (res.token) {
                  setToken(res.token);
                  window.location.href = "/";
                }
              }}
            >
              <TextFieldElement required label="Email" name="email" />
              <TextFieldElement
                type="password"
                required
                label="Password"
                name="password"
              />
              <Button type="submit" size="medium">
                LOGIN
              </Button>
              <StyledOr>OR</StyledOr>
              <Button href="/register" size="medium" color="success">
                REGISTER
              </Button>
            </FormContainer>
          </FormBody>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link href="/about-us">About us</Link>
            <StyledLine />
            <Link href="/contact-us">Contact us</Link>
          </Box>
        </LoginForm>
      </LoginWrapper>
    </Container>
  );
}
