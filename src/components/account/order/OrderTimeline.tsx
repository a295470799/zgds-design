import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { formatDate } from "@/utils/format";

const StyledTimeline = styled(Timeline)`
  & .MuiTimelineItem-root:before {
    flex: 0;
    padding: 0;
  }
  & .MuiTimelineConnector-root {
    background-color: rgba(0, 116, 163, 0.2);
  }
  & .MuiTimelineDot-filled {
    background-color: #cce3ed;
    box-shadow: none;
  }
`;

const StyledItemTitle = styled(Typography)<{ current: number }>`
  color: ${(props) =>
    props.current == 0
      ? props.theme.palette.primary.main
      : "rgba(0,116,163,.5)"};
  font-size: 1.2rem;
  font-weight: 700;
`;

const StyledItemContent = styled(Typography)<{ current: number }>`
  font-size: 1.2rem;
  color: ${(props) =>
    props.current == 0
      ? props.theme.palette.text.third
      : "rgba(136,136,136,.5)"};
`;

type Props = {
  items: {
    title: string;
    content: string;
  }[];
};

const OrderTimeline: React.FC<Props> = (props) => {
  const { items = [] } = props;
  return (
    <StyledTimeline>
      {items?.map((item, index) => {
        return (
          <TimelineItem key={index}>
            <TimelineSeparator>
              {index == 0 ? (
                <TimelineDot variant="outlined" color="primary" />
              ) : (
                <TimelineDot />
              )}
              {index != items.length - 1 ? <TimelineConnector /> : null}
            </TimelineSeparator>
            <TimelineContent>
              <StyledItemTitle current={index}>{item.title}</StyledItemTitle>
              <StyledItemContent current={index}>
                {formatDate(item.content)}
              </StyledItemContent>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </StyledTimeline>
  );
};

export default OrderTimeline;
