import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Layout from "#lib/Layout";
import HelpSide from "@/components/account/HelpSide";

export default function ReturnPolicy() {
  return (
    <Layout title="Return Policy" spaceBetween bodySx={{ marginBlockStart: 0 }}>
      <HelpSide code="return" />
      <Box flex={1}>
        <Box
          fontSize={"1.4rem"}
          color={"text.secondary"}
          p={"33px 95px 40px"}
          sx={{
            ["& .MuiTypography-root"]: {
              mb: "20px",
            },
            ["& b"]: {
              display: "block",
            },
          }}
        >
          <Typography>
            <b>Retention of title</b>
            We reserve the ownership of the purchased item until receipt of all
            the payments for the products. The buyer is entitled to resell the
            goods in the ordinary course of business, but he assigns to us now
            all claims in the amount of the invoice amount (including value
            added tax and any default interest) of our claim, which accrue to
            him from the resale against his customers or third parties. If the
            buyer does not fulfill his obligation to pay from the proceeds
            received, we can demand that the buyer notifies us of the assigned
            claim and its debtors, provides all information necessary for
            collection and notifies the debtors (third parties) of the
            assignment.
          </Typography>
          <Typography>
            <b>After-sale service for drop shipping orders?</b>
            If there is product quality problem, a 14-day free return,
            replacement, refund service are provided. Please report the
            information by e-mail in time if there is any problem. If it is
            necessary to return back, please ship the goods unused, in original
            packaging and unbreakable.After expiry of the 14-day right of
            return, the goods cannot be returned until communicating with B2B
            department and getting a permission.If the product cannot be sent by
            express for the reason of wrong address or the customer problem. The
            return service can still be provided, but EUZIEL is not responsible
            for the product cost and freight cost.
          </Typography>
          <Typography>
            <b>Damages in transit?</b>
            If goods are delivered with obvious damages during the
            transportation, please claim such errors immediately to the
            deliverer and contact us immediately. The failure of a complaint or
            contact has no consequences for your legal rights and their
            enforcement, especially for your warranty rights. But you help us to
            plead our own claims against the carrier or transport insurance.
          </Typography>
          <Typography>
            <b>Received the wrong product?</b>
            In the unlikely event that you have received the incorrect product,
            EUZIEL will re-deliver your original order free of charge and will,
            most likely, provide a Reply Paid address for the return of the
            items.
          </Typography>
        </Box>
      </Box>
    </Layout>
  );
}
