import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Layout from "#lib/Layout";
import HelpSide from "@/components/account/HelpSide";

export default function ReturnPolicy() {
  return (
    <Layout
      title="Privacy Policy"
      spaceBetween
      bodySx={{ marginBlockStart: 0 }}
    >
      <HelpSide code="privacy" />
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
            <b>Privacy Policy</b>
            We are very delighted that you have shown interest in our
            enterprise. Data protection is of a particularly high priority for
            the management of the EUZIEL International GmbH. The use of the
            Internet pages of the EUZIEL International GmbH is possible without
            any indication of personal data; however, if a data subject wants to
            use special enterprise services via our website, processing of
            personal data could become necessary. If the processing of personal
            data is necessary and there is no statutory basis for such
            processing, we generally obtain consent from the data subject. The
            processing of personal data, such as the name, address, e-mail
            address, or telephone number of a data subject shall always be in
            line with the General Data Protection Regulation (GDPR), and in
            accordance with the country-specific data protection regulations
            applicable to the EUZIEL International GmbH. By means of this data
            protection declaration, our enterprise would like to inform the
            general public of the nature, scope, and purpose of the personal
            data we collect, use and process. Furthermore, data subjects are
            informed, by means of this data protection declaration, of the
            rights to which they are entitled.
          </Typography>
          <Typography>
            As the controller, the EUZIEL International GmbH has implemented
            numerous technical and organizational measures to ensure the most
            complete protection of personal data processed through this website.
            However, Internet-based data transmissions may in principle have
            security gaps, so absolute protection may not be guaranteed. For
            this reason, every data subject is free to transfer personal data to
            us via alternative means, e.g. by telephone.
          </Typography>
          <Typography>
            <b>1. Definitions</b>
            The data protection declaration of the EUZIEL International GmbH is
            based on the terms used by the European legislator for the adoption
            of the General Data Protection Regulation (GDPR). Our data
            protection declaration should be legible and understandable for the
            general public, as well as our customers and business partners. To
            ensure this, we would like to first explain the terminology used.
          </Typography>
          <Typography>
            In this data protection declaration, we use, inter alia, the
            following terms:
            <b>{"a) Personal data"}</b>
            Personal data means any information relating to an identified or
            identifiable natural person (“data subject”). An identifiable
            natural person is one who can be identified, directly or indirectly,
            in particular by reference to an identifier such as a name, an
            identification number, location data, an online identifier or to one
            or more factors specific to the physical, physiological, genetic,
            mental, economic, cultural or social identity of that natural
            person.
          </Typography>

          <Typography>
            <b>{"b) Data subject"}</b>
            Data subject is any identified or identifiable natural person, whose
            personal data is processed by the controller responsible for the
            processing.
          </Typography>

          <Typography>
            <b>{"c) Processing"}</b>
            Processing is any operation or set of operations which is performed
            on personal data or on sets of personal data, whether or not by
            automated means, such as collection, recording, organization,
            structuring, storage, adaptation or alteration, retrieval,
            consultation, use, disclosure by transmission, dissemination or
            otherwise making available, alignment or combination, restriction,
            erasure or destruction.
          </Typography>

          <Typography>
            <b>{"d) Restriction of processing"}</b>
            Restriction of processing is the marking of stored personal data
            with the aim of limiting their processing in the future.
          </Typography>
          <Typography>
            <b>{"e) Profiling"}</b>
            Profiling means any form of automated processing of personal data
            consisting of the use of personal data to evaluate certain personal
            aspects relating to a natural person, in particular to analyse or
            predict aspects concerning that natural person’s performance at
            work, economic situation, health, personal preferences, interests,
            reliability, behaviour, location or movements.
          </Typography>
          <Typography>
            <b>{"f) Pseudonymisation"}</b>
            Pseudonymisation is the processing of personal data in such a manner
            that the personal data can no longer be attributed to a specific
            data subject without the use of additional information, provided
            that such additional information is kept separately and is subject
            to technical and organizational measures to ensure that the personal
            data are not attributed to an identified or identifiable natural
            person.
          </Typography>
          <Typography>
            <b>
              {"g) Controller or controller responsible for the processing"}
            </b>
            Controller or controller responsible for the processing is the
            natural or legal person, public authority, agency or other body
            which, alone or jointly with others, determines the purposes and
            means of the processing of personal data; where the purposes and
            means of such processing are determined by Union or Member State
            law, the controller or the specific criteria for its nomination may
            be provided for by Union or Member State law.
          </Typography>
          <Typography>
            <b>{"h) Processor"}</b>
            Processor is a natural or legal person, public authority, agency or
            other body which processes personal data on behalf of the
            controller.
          </Typography>
          <Typography>
            <b>{"i) Recipient"}</b>
            Recipient is a natural or legal person, public authority, agency or
            another body, to which the personal data are disclosed, whether a
            third party or not. However, public authorities which may receive
            personal data in the framework of a particular inquiry in accordance
            with Union or Member State law shall not be regarded as recipients;
            the processing of those data by those public authorities shall be in
            compliance with the applicable data protection rules according to
            the purposes of the processing.
          </Typography>
          <Typography>
            <b>{"j) Third party"}</b>
            Third party is a natural or legal person, public authority, agency
            or body other than the data subject, controller, processor and
            persons who, under the direct authority of the controller or
            processor, are authorized to process personal data.
          </Typography>
          <Typography>
            <b>{"k) Consent"}</b>
            Consent of the data subject is any freely given, specific, informed
            and unambiguous indication of the data subject’s wishes by which he
            or she, by a statement or by a clear affirmative action, signifies
            agreement to the processing of personal data relating to him or her.
          </Typography>
          <Typography>
            <b>{"2. Name and Address of the controller"}</b>
            Controller for the purposes of the General Data Protection
            Regulation (GDPR), other data protection laws applicable in Member
            states of the European Union and other provisions related to data
            protection is:
            <Box component={"span"} display={"block"}>
              EUZIEL INTERNATIONAL GMBH
            </Box>
            <Box component={"span"} display={"block"}>
              Grünenplatzstr. 16-18, D-42899 Remscheid, Germany
            </Box>
          </Typography>
          <Typography>
            <b>{"3. Cookies"}</b>
            The Internet pages of the EUZIEL International GmbH use cookies.
            Cookies are text files that are stored in a computer system via an
            Internet browser.
          </Typography>
          <Typography>
            Many Internet sites and servers use cookies. Many cookies contain a
            so-called cookie ID. A cookie ID is a unique identifier of the
            cookie. It consists of a character string through which Internet
            pages and servers can be assigned to the specific Internet browser
            in which the cookie was stored. This allows visited Internet sites
            and servers to differentiate the individual browser of the dats
            subject from other Internet browsers that contain other cookies. A
            specific Internet browser can be recognized and identified using the
            unique cookie ID. Through the use of cookies, the EUZIEL
            International GmbH can provide the users of this website with more
            user-friendly services that would not be possible without the cookie
            setting.
          </Typography>
          <Typography>
            By means of a cookie, the information and offers on our website can
            be optimized with the user in mind. Cookies allow us, as previously
            mentioned, to recognize our website users. The purpose of this
            recognition is to make it easier for users to utilize our website.
            The website user that uses cookies, e.g. does not have to enter
            access data each time the website is accessed, because this is taken
            over by the website, and the cookie is thus stored on the user’s
            computer system. Another example is the cookie of a shopping cart in
            an online shop. The online store remembers the articles that a
            customer has placed in the virtual shopping cart via a cookie.
          </Typography>
          <Typography>
            The data subject may, at any time, prevent the setting of cookies
            through our website by means of a corresponding setting of the
            Internet browser used, and may thus permanently deny the setting of
            cookies. Furthermore, already set cookies may be deleted at any time
            via an Internet browser or other software programs. This is possible
            in all popular Internet browsers. If the data subject deactivates
            the setting of cookies in the Internet browser used, not all
            functions of our website may be entirely usable.
          </Typography>
          <Typography>
            <b>{"4. Collection of general data and information"}</b>
            EUZIEL International GmbH collects a series of general data and
            information when a data subject or automated system calls up the
            website. This general data and information are stored in the server
            log files. Collected may be (1) the browser types and versions used,
            (2) the operating system used by the accessing system, (3) the
            website from which an accessing system reaches our website
            (so-called referrers), (4) the sub-websites, (5) the date and time
            of access to the Internet site, (6) an Internet protocol address (IP
            address), (7) the Internet service provider of the accessing system,
            and (8) any other similar data and information that may be used in
            the event of attacks on our information technology systems.
          </Typography>
          <Typography>
            When using these general data and information, the EUZIEL
            International GmbH does not draw any conclusions about the data
            subject. Rather, this information is needed to (1) deliver the
            content of our website correctly, (2) optimize the content of our
            website as well as its advertisement, (3) ensure the long-term
            viability of our information technology systems and website
            technology, and (4) provide law enforcement authorities with the
            information necessary for criminal prosecution in case of a
            cyber-attack. Therefore, the EUZIEL International GmbH analyzes
            anonymously collected data and information statistically, with the
            aim of increasing the data protection and data security of our
            enterprise, and to ensure an optimal level of protection for the
            personal data we process. The anonymous data of the server log files
            are stored separately from all personal data provided by a data
            subject.
          </Typography>
        </Box>
      </Box>
    </Layout>
  );
}
