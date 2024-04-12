import { Box, Container, Typography } from "@mui/material";

function page() {
  return (
    <Container maxWidth="xl" sx={{ marginTop: "150px", marginBottom: "150px" }}>
      <Typography variant="h2">Cancellation and Refund policy</Typography>

      <Typography variant="body1" mt={8}>
        The terms hereof shall constitute DWise TechLabs Private Limited’s
        (“Company”) cancellation and refund policy in relation to the Solutions
        rendered on the Website (“Cancellation and Refund Policy”). Capitalized
        terms not defined herein shall have the meaning ascribed to them in the
        Terms of Use.
      </Typography>

      <Typography variant="h5" mt={6}>
        Cancellation and Refunds by the Company
      </Typography>

      <Typography variant="body1" mt={2}>
        Please note that there may be certain orders that we are unable to
        accept and must cancel. We reserve the right, at our sole discretion, to
        refuse or cancel any order for any reason, without any claims or
        liability to pay finance charges or interest on the amount. Some
        situations that may result in your order being canceled include but are
        not limited to inaccuracies or errors in Solutions or pricing
        information, technical or technological problems or problems identified
        in relation to credit / debit fraud. We may also require additional
        verifications or information before accepting any order. We will contact
        you if all or any portion of your order is canceled or if additional
        information is required to accept your order. If your order is cancelled
        by the Company after your credit / debit card has been charged, the said
        amount will be refunded to that credit / debit card account.
      </Typography>

      <Typography variant="h5" mt={6}>
        Cancellation by you
      </Typography>

      <Typography variant="body1" mt={2}>
        You agree and acknowledge that unless stated otherwise you are not
        entitled to cancel any orders made by you on this Website. In the event
        you subscribe to any Solutions, the same may be cancelled by you at any
        point in the timeline, in such a case you will be refunded the
        outstanding amount remaining in the account at the cancellation time
        taking into account of all the amount that has been used in after the
        recharge. We will refund the remaining amount after deducting any bank
        charges that may have been applicable.
      </Typography>
    </Container>
  );
}

export default page;
