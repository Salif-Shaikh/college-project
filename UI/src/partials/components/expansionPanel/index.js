import * as React from "react";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { arrowRight } from "../../icons";

const ExpansionPanel = props => {
  const { panelList = [] } = props;

  const AccordionSummary = styled(props => (
    <MuiAccordionSummary expandIcon={arrowRight} {...props} />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  return panelList.map(panel => (
    <Accordion key={panel.name}>
      <AccordionSummary
        expandIcon={arrowRight}
        aria-controls={`${panel.name}-content`}
        id={`${panel.name}-header`}
      >
        {panel.name}
        {panel.count && (
          <span
            className="ml-2"
            style={{
              padding: "0px 9px",
              backgroundColor: "blue",
              color: "white",
              borderRadius: "5px",
            }}
          >
            {panel.count}
          </span>
        )}
      </AccordionSummary>
      <AccordionDetails>{panel.component}</AccordionDetails>
    </Accordion>
  ));
};

export default ExpansionPanel;
