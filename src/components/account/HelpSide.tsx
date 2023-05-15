import Link from "@mui/material/Link";
import { Box } from "@mui/material";

interface Props {
  code: "about" | "return" | "privacy" | "contact";
}

const HelpSide: React.FC<Props> = (props) => {
  const { code } = props;

  const linkList = [
    {
      url: "/about-us",
      name: "About us",
      code: "about",
    },
    {
      url: "/return-policy",
      name: "Return Policy",
      code: "return",
    },
    {
      url: "/privacy-policy",
      name: "Privacy Policy",
      code: "privacy",
    },
    {
      url: "/contact-us",
      name: "Contact us",
      code: "contact",
    },
  ];

  return (
    <Box
      component={"ul"}
      width={240}
      bgcolor={"rgba(71,168,180,.2)"}
      fontSize={"2.0rem"}
      color={"text.secondary"}
      p={"45px 0 0 42px"}
    >
      {linkList.map((item) => {
        const active = item.code == code;
        return (
          <Box
            component={"li"}
            key={item.code}
            sx={() => {
              const activeStyle = active
                ? {
                    "&::before": {
                      content: '""',
                      display: "inline-block",
                      width: " 10px",
                      height: "30px",
                      background: "#ed5933",
                      borderRadius: "6px",
                    },
                  }
                : {
                    "&::before": {
                      content: '""',
                      display: "inline-block",
                      width: " 10px",
                    },
                  };
              return {
                display: "flex",
                alignItems: "center",
                columnGap: "10px",
                mb: "45px",
                ...activeStyle,
              };
            }}
          >
            <Link
              href={!active ? item.url : undefined}
              underline={!active ? "hover" : "none"}
              color={"inherit"}
              fontWeight={active ? 700 : 400}
            >
              {item.name}
            </Link>
          </Box>
        );
      })}
    </Box>
  );
};

export default HelpSide;
