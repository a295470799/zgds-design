import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, SxProps } from "@mui/material";
import { Property } from "csstype";

interface Props {
  loadingType?: "loading" | "none";
  containerSx?: SxProps;
  sx?: SxProps;
  fit?: Property.ObjectFit;
}

type NativeAttrs = Omit<React.ImgHTMLAttributes<any>, keyof Props>;

export type ImageProps = Props & NativeAttrs;

const StyledLoading = styled("div")`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  background-image: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100px%22%20height%3D%22100px%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22xMidYMid%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M24.3%2C30C11.4%2C30%2C5%2C43.3%2C5%2C50s6.4%2C20%2C19.3%2C20c19.3%2C0%2C32.1-40%2C51.4-40%20C88.6%2C30%2C95%2C43.3%2C95%2C50s-6.4%2C20-19.3%2C20C56.4%2C70%2C43.6%2C30%2C24.3%2C30z%22%20stroke%3D%22%232c3e50%22%20stroke-width%3D%222%22%20stroke-dasharray%3D%22205.271142578125%2051.317785644531256%22%3E%3Canimate%20attributeName%3D%22stroke-dashoffset%22%20calcMode%3D%22linear%22%20values%3D%220%3B256.58892822265625%22%20keyTimes%3D%220%3B1%22%20dur%3D%221%22%20begin%3D%220s%22%20repeatCount%3D%22indefinite%22%2F%3E%3C%2Fpath%3E%3C%2Fsvg%3E);
  background-repeat: no-repeat;
  background-position: center;
`;

const ImageComponent = React.forwardRef<HTMLImageElement, ImageProps>(
  (props, ref) => {
    const {
      src = "",
      loadingType = "none",
      width = 50,
      height = 50,
      alt = "zgds image",
      sx,
      containerSx,
      loading = "lazy",
    } = props;
    const [isloading, setIsLoading] = useState(true);

    // 显示到界面的图片
    const [preview, setPreview] = useState<string>(src);

    useEffect(() => {
      const img = new Image();
      img.onload = () => {
        setPreview(src);
        setIsLoading(false);
      };

      img.src = src;

      return () => {
        img.onload = null;
      };
    }, [src]);

    return (
      <Box sx={{ position: "relative", width, height, ...containerSx }}>
        <Box
          component="img"
          ref={ref}
          src={preview}
          alt={alt}
          sx={{
            ...sx,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: props.fit,
          }}
          loading={loading}
        />
        {loadingType === "loading" && isloading ? <StyledLoading /> : null}
      </Box>
    );
  }
);

ImageComponent.displayName = "Image";

export default ImageComponent;
