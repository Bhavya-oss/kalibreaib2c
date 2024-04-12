import { Box, Container, Typography } from "@mui/material";
import React from "react";

function Parivacy() {
  return (
    <Container maxWidth="xl" sx={{ marginTop: "150px", marginBottom: "150px" }}>
      <Typography variant="h2">Privacy and policy</Typography>

      <Typography variant="h5" mt={8} fontWeight={600}>
        WHAT DO WE DO WITH YOUR INFORMATION?
      </Typography>
      <Typography variant="body1" mt={2}>
        When you subscribe to a programme from our Website, we collect the
        personal information you give us such as your name, address and email
        address. When you browse our Website, we also automatically receive your
        computer’s internet protocol (IP) address in order to provide us with
        information that helps us learn about your browser and operating system.
        Email marketing (if applicable): With your permission, we may send you
        emails about our, new offerings and other updates.
      </Typography>

      <Box mt={5}>
        <Typography variant="h5" fontWeight={600}>
          CONSENT
        </Typography>
        <Typography variant="body1" mt={2}>
          How do you get my consent? When you provide us with personal
          information to complete a transaction, verify your credit card, place
          an order, we imply that you consent to our collecting it and using it
          for that specific reason only. If we ask for your personal information
          for a secondary reason, like marketing, we will either ask you
          directly for your expressed consent, or provide you with an
          opportunity to say no. How do I withdraw my consent? If after you
          opt-in, you change your mind, you may withdraw your consent for us to
          contact you, for the continued collection, use or disclosure of your
          information, at anytime, by contacting us at ____or mailing us ____ .
        </Typography>
      </Box>

      <Box mt={5}>
        <Typography variant="h5" fontWeight={600}>
          DISCLOSURE
        </Typography>
        <Typography variant="body1" mt={2}>
          We may disclose your personal information if we are required by law to
          do so or if you violate our Terms of Use. SECTION 4 – PAYMENT We use
          __ for processing payments. We___ do not store your card data on their
          servers. The data is encrypted through the Payment Card Industry Data
          Security Standard (PCI-DSS) when processing payment. Your purchase
          transaction data is only used as long as is necessary to complete your
          purchase transaction. After that is complete, your purchase
          transaction information is not saved. Our payment gateway adheres to
          the standards set by PCI-DSS as managed by the PCI Security Standards
          Council, which is a joint effort of brands like Visa, MasterCard,
          American Express and Discover. PCI-DSS requirements help ensure the
          secure handling of credit card information by our store and its
          service providers. For more insight, you may also want to read terms
          and conditions of razorpay on https://razorpay.com
        </Typography>
      </Box>

      <Box mt={5}>
        <Typography variant="h5" fontWeight={600}>
          THIRD-PARTY SERVICES
        </Typography>
        <Typography variant="body1" mt={2}>
          In general, the third-party providers used by us will only collect,
          use and disclose your information to the extent necessary to allow
          them to perform the services they provide to us. However, certain
          third-party service providers, such as payment gateways and other
          payment transaction processors, have their own privacy policies in
          respect to the information we are required to provide to them for your
          purchase-related transactions. For these providers, we recommend that
          you read their privacy policies so you can understand the manner in
          which your personal information will be handled by these providers. In
          particular, remember that certain providers may be located in or have
          facilities that are located a different jurisdiction than either you
          or us. So if you elect to proceed with a transaction that involves the
          services of a third-party service provider, then your information may
          become subject to the laws of the jurisdiction(s) in which that
          service provider or its facilities are located. Once you leave our
          Website or are redirected to a third-party website or application, you
          are no longer governed by this Privacy Policy or our website’s Terms
          of Use. Links When you click on links on our Website, they may direct
          you away from our site. We are not responsible for the privacy
          practices of other sites and encourage you to read their privacy
          statements.
        </Typography>
      </Box>
      <Box mt={5}>
        <Typography variant="h5" fontWeight={600}>
          SECURITY
        </Typography>
        <Typography variant="body1" mt={2}>
          To protect your personal information, we take reasonable precautions
          and follow industry best practices to make sure it is not
          inappropriately lost, misused, accessed, disclosed, altered or
          destroyed.
        </Typography>
      </Box>
      <Box mt={5}>
        <Typography variant="h5" fontWeight={600}>
          COOKIES
        </Typography>
        <Typography variant="body1" mt={2}>
          We use cookies to maintain session of your user. It is not used to
          personally identify you on other websites.
        </Typography>
      </Box>
      <Box mt={5}>
        <Typography variant="h5" fontWeight={600}>
          AGE OF CONSENT
        </Typography>
        <Typography variant="body1" mt={2}>
          By using this site, you represent that you are at least the age of
          majority in your state or province of residence, or that you are the
          age of majority in your state or province of residence and you have
          given us your consent to allow any of your minor dependents to use
          this site.
        </Typography>
      </Box>
      <Box mt={5}>
        <Typography variant="h5" fontWeight={600}>
          CHANGES TO THIS PRIVACY POLICY
        </Typography>
        <Typography variant="body1" mt={2}>
          We reserve the right to modify this privacy policy at any time, so
          please review it frequently. Changes and clarifications will take
          effect immediately upon their posting on the website. If we make
          material changes to this policy, we will notify you here that it has
          been updated, so that you are aware of what information we collect,
          how we use it, and under what circumstances, if any, we use and/or
          disclose it. If our store is acquired or merged with another company,
          your information may be transferred to the new owners so that we may
          continue to sell products to you.
        </Typography>
      </Box>
      <Box mt={5}>
        <Typography variant="h5" fontWeight={600}>
          QUESTIONS AND CONTACT INFORMATION
        </Typography>
        <Typography variant="body1" mt={2}>
          If you would like to: access, correct, amend or delete any personal
          information we have about you, register a complaint, or simply want
          more information contact our Privacy Compliance Officer at
          hello@kalibre.ai
        </Typography>
      </Box>

      <Box mt={8}>
        <Typography variant="h4" fontWeight={600}>
          ADDRESS
        </Typography>
        <Typography variant="h6" mt={2}>
          DWise TechLabs Pvt Ltd,
          <br />
          No 247, Swasmi Arcade,
          <br />
          JCK Industrial Park, <br />
          Hebbal Industrial Area,
          <br />
          Mysore - 570016
        </Typography>
      </Box>
    </Container>
  );
}

export default Parivacy;
