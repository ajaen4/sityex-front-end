"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";

import { Typography, Box, Tabs, Tab, Grid } from "@mui/material";

import PaperworkAccordeon from "components/Accordions/PaperworkAccordeon";
import EntreTramitesExp from "components/Cards/EntreTramitesExp";
import EssentialsPaperwork from "components/Cards/EssentialsPaperwork";
import ConsultationPaperwork from "components/Cards/ConsultationPaperwork";
import TaxPaperwork from "components/Cards/TaxPaperwork";

import {
  digitalNomadReq,
  goldenVisaReq,
  beckhamReq,
} from "constants/constants";

const tabs = [
  { value: "essentials", label: "Essentials" },
  { value: "visa", label: "Visa" },
  { value: "tax-declaration", label: "Tax Declaration" },
  {
    value: "driver-vehicle-licensing",
    label: "Driver's and Vehicle Licensing",
  },
];

const PaperworkPage = () => {
  const selectedCity = useSelector((state) => state.selectedCity.data);
  const [selectedTab, setSelectedTab] = useState("essentials");

  const searchParams = useSearchParams();
  const router = useRouter();

  const changeTab = useCallback(
    (newValue) => {
      setSelectedTab(newValue);
      router.push(
        `/services/${selectedCity.city_id}/paperwork/?tab=${newValue}`,
        undefined,
        { shallow: true }
      );
    },
    [setSelectedTab, router, selectedCity.city_id]
  );

  useEffect(() => {
    if (
      searchParams.get("tab") &&
      tabs.map((tab) => tab.value).includes(searchParams.get("tab"))
    ) {
      changeTab(searchParams.get("tab"));
    }
  }, [searchParams, changeTab]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" sx={{ my: 3, fontSize: 30 }}>
        Paperwork
      </Typography>
      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => changeTab(newValue)}
        textColor="secondary"
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        xs={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          mt: 0,
        }}
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      {selectedTab === "essentials" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <PaperworkAccordeon />
          <EntreTramitesExp
            ServiceName="Essentials"
            showFreeConsultation={true}
          />
          <Typography variant="h3" gutterBottom sx={{ m: 2 }}>
            Available services
          </Typography>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={10} md={4} lg={3}>
              <EssentialsPaperwork
                title="Non-Residential NIE"
                tooltipText="Tax identification number assigned to every foreigner who carries out an economic or professional activity."
                mdMinHeight={260}
                content={
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2">
                      For those who plan to:
                    </Typography>
                    <div>
                      <ul>
                        <li>Buy or sell property.</li>
                        <li>Inherit assets.</li>
                        <li>Conduct significant financial transactions.</li>
                        <li>
                          Engage in any legal activity that requires a Spanish
                          tax identification number.
                        </li>
                      </ul>
                    </div>
                  </Box>
                }
                price={189.97}
                paymentLink="https://app.entretramites.com/stripePaymentLink?id=5175&t=1b1e3c17"
              />
            </Grid>
            <Grid item xs={10} md={4} lg={3}>
              <EssentialsPaperwork
                title="Residential NIE"
                tooltipText="Certifies the right of a person to reside in Spain. Also
                brings the tax identification number."
                mdMinHeight={260}
                content={
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2">
                      For those who plan to:
                    </Typography>
                    <div>
                      <ul>
                        <li>
                          Work or engage in any professional activity in Spain.
                        </li>
                        <li>
                          Register for social services and health care in Spain.
                        </li>
                        <li>Apply for a driver&apos;s license in Spain.</li>
                        <li>
                          Buy, sell, or own property in Spain as a resident.
                        </li>
                      </ul>
                    </div>
                  </Box>
                }
                price={189.97}
                paymentLink="https://app.entretramites.com/stripePaymentLink?id=5176&t=48fcd379"
              />
            </Grid>
            <Grid item xs={10} md={4} lg={3}>
              <EssentialsPaperwork
                title="Empadronamiento"
                tooltipText="Allows individuals to declare their place of residence in
                Spain. It is required for accessing public services and
                benefits."
                mdMinHeight={260}
                content={
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2">
                      For those who plan to:
                    </Typography>
                    <div>
                      <ul>
                        <li>
                          Access any kind of public service and benefits in
                          Spain.
                        </li>
                      </ul>
                    </div>
                  </Box>
                }
                price={64.13}
                paymentLink="https://app.entretramites.com/stripePaymentLink?id=5186&t=81b370ad"
              />
            </Grid>
            <Grid item xs={12} style={{ width: "100%", height: 0 }}></Grid>
            <Grid item xs={10} md={4} lg={3}>
              <EssentialsPaperwork
                title="Non-EU citizen Half Pack"
                mdMinHeight={232}
                content={
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2">
                      Perfect if you don&apos;t need all the paperwork,
                      includes:
                    </Typography>
                    <div>
                      <ul>
                        <li>Residential NIE.</li>
                        <li>Empadronamiento Certificate.</li>
                      </ul>
                    </div>
                  </Box>
                }
                price={152.5}
                paymentLink="https://app.entretramites.com/stripePaymentLink?id=5179&t=7da3d896"
              />
            </Grid>
            <Grid item xs={10} md={4} lg={3}>
              <EssentialsPaperwork
                title="Non-EU citizen Full Pack"
                mdMinHeight={232}
                content={
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2">
                      For those who want all their paperwork ready in one go,
                      includes:
                    </Typography>
                    <div>
                      <ul>
                        <li>Residential NIE.</li>
                        <li>Empadronamiento Certificate.</li>
                        <li>Digital Certificate.</li>
                        <li>Social Security Number.</li>
                        <li>Individual Health Card (TSI).</li>
                      </ul>
                    </div>
                  </Box>
                }
                price={215.38}
                paymentLink="https://app.entretramites.com/stripePaymentLink?id=5180&t=b9898094"
              />
            </Grid>
            <Grid item xs={10} md={4} lg={3}>
              <EssentialsPaperwork
                title="EU citizen Half Pack"
                mdMinHeight={232}
                content={
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2">
                      Perfect if you don&apos;t need all the paperwork,
                      includes:
                    </Typography>
                    <div>
                      <ul>
                        <li>Residential NIE.</li>
                        <li>Empadronamiento Certificate.</li>
                      </ul>
                    </div>
                  </Box>
                }
                price={252.89}
                paymentLink="https://app.entretramites.com/stripePaymentLink?id=5177&t=92a353b4"
              />
            </Grid>
            <Grid item xs={10} md={4} lg={3}>
              <EssentialsPaperwork
                title="EU citizen Full Pack"
                mdMinHeight={232}
                content={
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2">
                      For those who want all their paperwork ready in one go,
                      includes:
                    </Typography>
                    <div>
                      <ul>
                        <li>Residential NIE.</li>
                        <li>Empadronamiento Certificate.</li>
                        <li>Digital Certificate.</li>
                        <li>Social Security Number.</li>
                        <li>Individual Health Card (TSI).</li>
                      </ul>
                    </div>
                  </Box>
                }
                price={315.81}
                paymentLink="https://app.entretramites.com/stripePaymentLink?id=5178&t=944e39a6"
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {selectedTab === "visa" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <EntreTramitesExp ServiceName="Visa" showFreeConsultation={false} />
          <Typography variant="h3" gutterBottom sx={{ m: 2 }}>
            Available Visas
          </Typography>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={10} md={4} lg={3}>
              <ConsultationPaperwork
                title="Digital Nomad Visa"
                mdMinHeight={205}
                content={
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2">
                      For those who plan to:
                    </Typography>
                    <div>
                      <ul>
                        <li>
                          Work remotely for companies based outside Spain.
                        </li>
                        <li>
                          Live and work in Spain while maintaining their
                          employment.
                        </li>
                      </ul>
                    </div>
                  </Box>
                }
                price={315.81}
                requirements={digitalNomadReq}
                freeConsultationLink="https://entretramites.com/en/digital-nomad-visa-consultation"
              />
            </Grid>
            <Grid item xs={10} md={4} lg={3}>
              <ConsultationPaperwork
                title="Golden Visa (Non-EU citizens)"
                mdMinHeight={205}
                content={
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2">
                      For those who plan to:
                    </Typography>
                    <div>
                      <ul>
                        <li>Stay long-term in Spain.</li>
                        <li>Make a significant investment in Spain.</li>
                      </ul>
                    </div>
                  </Box>
                }
                price={1201.5}
                requirements={goldenVisaReq}
                freeConsultationLink="https://entretramites.com/en/free-immigration-consultation"
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {selectedTab === "tax-declaration" && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={10} md={4} lg={3}>
              <TaxPaperwork
                title="Beckham Law Application"
                mdMinHeight={300}
                mdMinHeightContent={410}
                content={
                  <div>
                    <Typography variant="body2">
                      For those who want to:
                    </Typography>

                    <ul>
                      <li>
                        Pay tax only on Spanish-sourced income at a flat, lower
                        rate (24%).
                      </li>
                      <li>
                        Have a simplified tax filing process compared to regular
                        resident taxation.
                      </li>
                    </ul>
                  </div>
                }
                price={317.02}
                requirements={beckhamReq}
                paymentLink="https://app.entretramites.com/stripePaymentLink?id=5184&t=4f330a11"
              />
            </Grid>
            <Grid item xs={10} md={4} lg={3}>
              <TaxPaperwork
                title="Accountant Tax Declaration"
                mdMinHeight={300}
                mdMinHeightContent={461}
                content={
                  <div>
                    <Typography variant="body2">For those who:</Typography>

                    <ul>
                      <li>Are new to Spanish taxes.</li>
                      <li>Want simple, fast and up-to-date guidance.</li>
                      <li>Have a professional do your taxes for you.</li>
                    </ul>
                  </div>
                }
                price={70.18}
                paymentLink="https://app.entretramites.com/stripePaymentLink?id=5183&t=c23194a7"
              />
            </Grid>
            <Grid item xs={10} md={4} lg={3}>
              <TaxPaperwork
                title="Automated Tax Declaration"
                is_taxdown={true}
                mdMinHeight={405}
                mdMinHeightContent={461}
                content={
                  <div>
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "left", mt: 1 }}
                    >
                      For those who want to:
                    </Typography>
                    <Box sx={{ textAlign: "left" }}>
                      <ul>
                        <li>Do the Tax Declaration in an automated fashion.</li>
                        <li>Do the Tax Declaration completely online.</li>
                      </ul>
                    </Box>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{ my: 1, textAlign: "center" }}
                    >
                      We have partnered with <b>TaxDown</b> to offer you a{" "}
                      <b>15% discount</b> on their Tax Declaration automated
                      service.
                    </Typography>
                  </div>
                }
                paymentLink="https://taxdown.es/landings_partners/sityex/?utm_source=empleados&utm_medium=partnership&utm_campaign=empleados_partnership"
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {selectedTab === "driver-vehicle-licensing" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <EntreTramitesExp
            ServiceName="Driver's And Vehicle Licensing"
            showFreeConsultation={false}
          />
          <Typography variant="h3" gutterBottom sx={{ m: 2 }}>
            Available services
          </Typography>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs={10} md={4} lg={3}>
              <ConsultationPaperwork
                title="Driver's License Exchange"
                mdMinHeight={238}
                content={
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2">For those who:</Typography>
                    <div>
                      <ul>
                        <li>
                          Have a driver&apos;s license from a country different
                          from Spain.
                        </li>
                        <li>
                          Want to have that driver&apos;s license recognized in
                          Spain.
                        </li>
                        <li>Want a complete management of the procedure.</li>
                      </ul>
                    </div>
                  </Box>
                }
                price={315.8}
                freeConsultationLink="https://entretramites.com/en/partners-program/free-consultation-partners?aff=3d90441f"
              />
            </Grid>
            <Grid item xs={10} md={4} lg={3}>
              <ConsultationPaperwork
                title="Vehicle Registration"
                mdMinHeight={238}
                content={
                  <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2">For those who:</Typography>
                    <div>
                      <ul>
                        <li>Want to register a vehicle in Spain.</li>
                        <li>Want a complete management of the procedure.</li>
                      </ul>
                    </div>
                  </Box>
                }
                price={544.5}
                freeConsultationLink="https://entretramites.com/en/partners-program/free-consultation-partners?aff=3d90441f"
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default PaperworkPage;
