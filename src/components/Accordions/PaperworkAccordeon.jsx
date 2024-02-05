"use client";

import React from "react";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMoreOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const PaperworkAccordeon = () => {
  return (
    <Accordion
      sx={{
        textAlign: "center",
        my: 1,
        width: "95%",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        Which documents/services do I need? (Also applicable to EU citizens)
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center">
                  Non-residential NIE
                  <Tooltip
                    enterTouchDelay={0}
                    title="
              Tax identification number assigned to every foreigner who
              carries out an economic or professional activity."
                  >
                    <IconButton>
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  Residential NIE{" "}
                  <Tooltip
                    enterTouchDelay={0}
                    title="
                  Certifies the right of a person to reside in Spain. Also
                  brings the tax identification number."
                  >
                    <IconButton>
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  Empadronamiento{" "}
                  <Tooltip
                    enterTouchDelay={0}
                    title="
                  Allows individuals to declare their place of residence in
              Spain. It is required for accessing public services and
              benefits."
                  >
                    <IconButton>
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  Social Security number
                  <Tooltip
                    enterTouchDelay={0}
                    title="
                  It identifies the citizen with Social Security, which provides residents with medical assistance and social benefits in cases of unemployment, old age, sick leave, etc."
                  >
                    <IconButton>
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  Health Card
                  <Tooltip
                    enterTouchDelay={0}
                    title="
                  It is the document that identifies and allows foreigners to have access to medical centers and services of your assigned public health system."
                  >
                    <IconButton>
                      <HelpOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key="spanishTaxNotLivingSpain"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Engage in any activity that requires a Spanish tax number
                  without living in Spain
                </TableCell>
                <TableCell align="center">✅</TableCell>
                <TableCell align="center">❌</TableCell>
                <TableCell align="center">❌</TableCell>
                <TableCell align="center">❌</TableCell>
                <TableCell align="center">❌</TableCell>
              </TableRow>
              <TableRow
                key="moreThan3Months"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Staying in Spain for more than 3 months
                </TableCell>
                <TableCell align="center">❌</TableCell>
                <TableCell align="center">✅</TableCell>
                <TableCell align="center">❌</TableCell>
                <TableCell align="center">❌</TableCell>
                <TableCell align="center">❌</TableCell>
              </TableRow>
              <TableRow
                key="gettingAJob"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Work in Spain
                </TableCell>
                <TableCell align="center">❌</TableCell>
                <TableCell align="center">✅</TableCell>
                <TableCell align="center">❌</TableCell>
                <TableCell align="center">✅</TableCell>
                <TableCell align="center">❌</TableCell>
              </TableRow>
              <TableRow
                key="usingPublicHealthcare"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Using the public health system
                </TableCell>
                <TableCell align="center">❌</TableCell>
                <TableCell align="center">✅</TableCell>
                <TableCell align="center">✅</TableCell>
                <TableCell align="center">✅</TableCell>
                <TableCell align="center">✅</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default PaperworkAccordeon;
