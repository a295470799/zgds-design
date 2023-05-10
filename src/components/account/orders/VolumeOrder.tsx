import BootstrapDialogTitle from "#lib/BootstrapDialogTitle";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import UploadSimpleIcon from "@assets/icons/account/UploadSimple-r.svg";
import DownloadSimpleIcon from "@assets/icons/account/DownloadSimple-r.svg";
import { ChangeEvent } from "react";
import { createdropOrders } from "@/api/order";
import { useMessage } from "#lib/MessageProvider";
import WarningIcon from "@assets/icons/account/Warning-f.svg";

type Props = {
  open: boolean;
  onClose: () => void;
};

const VolumeOrder: React.FC<Props> = (props) => {
  const { open = false, onClose } = props;
  const { msg } = useMessage();

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var formdata = new FormData();
      formdata.set("file", file);
      try {
        await createdropOrders(formdata);
        msg({
          message: "Order placed, please go to My Orders to confirm!",
          width: 500,
          onConfirm() {
            window.location.reload();
          },
        });
      } catch (e: any) {
        if (e.code == 4001) {
          const errMsg = `
            <li>Order creation partially successful.</li>
            <li>The following information is incorrect and the creation failed:</li>
            ${e.message}
          `;
          msg({
            message: (
              <Box>
                <Box>
                  <img src={WarningIcon} />
                </Box>
                <Box
                  component={"ul"}
                  dangerouslySetInnerHTML={{ __html: errMsg }}
                  sx={{
                    lineHeight: "24px",
                    textAlign: "left",
                    "& li.item": {
                      textDecoration: "underline",
                    },
                  }}
                />
              </Box>
            ),
            width: 400,
          });
        } else {
          msg({
            message:
              "Order format incorrect, please refer to the template and upload again.",
          });
        }
      } finally {
        event.target.value = "";
      }
    }
  };

  return (
    <Dialog open={open} maxWidth="xs">
      <BootstrapDialogTitle
        onClose={onClose}
        titleSx={{
          padding: "9px 24px",
          textAlign: "center",
          background: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.common.white,
          fontWeight: 700,
        }}
        closeSx={{
          top: 5,
          color: (theme) => theme.palette.common.white,
        }}
      >
        Volume order
      </BootstrapDialogTitle>
      <DialogContent sx={{ margin: "36px 0 10px" }}>
        <Box display={"flex"} justifyContent={"space-between"} width={260}>
          <Button color="success" sx={{ fontSize: "1.2rem" }}>
            <Typography
              component="label"
              marginRight={"5px"}
              htmlFor="upload_order"
              display={"flex"}
              columnGap={"5px"}
              sx={{ cursor: "pointer" }}
            >
              Upload order
              <img src={UploadSimpleIcon} />
            </Typography>
            <TextField
              type="file"
              id="upload_order"
              onChange={handleChange}
              inputProps={{
                accept: ".xls,.xlsx",
              }}
              sx={{ display: "none" }}
            />
          </Button>
          <Button href="/file/Template of Daily Dropshipment Order List.xlsx">
            <Typography marginRight={"5px"}>Template</Typography>
            <img src={DownloadSimpleIcon} />
          </Button>
        </Box>
        <Typography
          fontSize={"1.2rem"}
          fontWeight={500}
          mt={1}
          color={"secondary"}
        >
          Only drop-order supported
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default VolumeOrder;
