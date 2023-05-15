import Box from "@mui/material/Box";
import Layout from "#lib/Layout";
import HelpSide from "@/components/account/HelpSide";
import {
  FormContainer,
  SelectElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { Backdrop, Button, CircularProgress, Grid } from "@mui/material";
import { FEEDBACK_SUBJECTS } from "@/constants/common";
import { createFeedback } from "@/api/account";
import { useMessage } from "#lib/MessageProvider";
import { useRequest } from "ahooks";

export default function ContactUs() {
  const { msg } = useMessage();
  const { runAsync, loading } = useRequest<any, [API.ContactUsParams]>(
    createFeedback,
    {
      manual: true,
    }
  );
  const handleSubmit = async (data: API.ContactUsParams) => {
    await runAsync(data);
    msg({
      message: "Submit successfully!",
      onConfirm() {
        window.location.reload();
      },
    });
  };

  return (
    <Layout title="Contact us" spaceBetween bodySx={{ marginBlockStart: 0 }}>
      <HelpSide code="contact" />
      <Box flex={1} p={"65px 140px 100px"}>
        <FormContainer<API.ContactUsParams> onSuccess={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextFieldElement
                name="firstname"
                label="First Name"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldElement
                name="lastname"
                label="Last Name"
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextFieldElement
                name="email"
                label="Email"
                type="email"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldElement name="phone" label="Phone" fullWidth />
            </Grid>

            <Grid item xs={6}>
              <SelectElement
                name="subject"
                label="Subject"
                required
                fullWidth
                options={FEEDBACK_SUBJECTS.map((item) => {
                  return {
                    id: item,
                    label: item,
                  };
                })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldElement
                name="order_number"
                label="Order Number"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextFieldElement
                name="content"
                label="Your Message"
                fullWidth
                multiline
                rows={7}
              />
            </Grid>

            <Grid item xs={12} textAlign={"center"}>
              <Button type="submit" size="medium" sx={{ width: 240 }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </FormContainer>
      </Box>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
}
