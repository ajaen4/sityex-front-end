"use client";

import React from "react";

import { Box } from "@mui/material";

import { useParams } from "next/navigation";

const mediumStyle = {
  fontFamily: "'Georgia', serif",
  lineHeight: 1.6,
  color: "#333",
  backgroundColor: "#fff",
  maxWidth: "65%",
  margin: "40px auto",
  padding: "20px",
};

const h1Style = {
  fontSize: "32px",
  marginBottom: "20px",
};

const h2Style = {
  fontSize: "24px",
  marginTop: "30px",
  marginBottom: "15px",
  color: "#333",
};

const pStyle = {
  fontSize: "18px",
  marginBottom: "20px",
};

const ulStyle = {
  listStyle: "disc",
  marginLeft: "20px",
  marginBottom: "20px",
};

const liStyle = {
  fontSize: "18px",
  marginBottom: "10px",
};

const aStyle = {
  color: "#1a0dab",
  textDecoration: "none",
};

const SingleBlogPage = () => {
  const { blog_id } = useParams();

  return (
    <Box>
      {blog_id === "nie" && (
        <div style={mediumStyle}>
          <h1 style={h1Style}>
            Unlocking Spain: Your Complete Guide to Getting a NIE/TIE
            hassle-free
          </h1>
          <h2 style={h2Style}>1) Introduction to NIE:</h2>
          <p style={pStyle}>
            Understanding the NIE (Número de Identificación de Extranjero or
            Foreigner’s Identification Number) is the first step in making Spain
            your home. It's more than just a number; it's your key to numerous
            activities, from opening a bank account to signing a lease. As a
            citizen of the European Union you will need this number within 3
            months of arriving in Spain, while non-EU citizens will normally
            receive their tax ID along with their Spanish residency. Let's dive
            into the step-by-step process to make obtaining your NIE a breeze.
          </p>
          <h2 style={h2Style}>2) How to Get an Appointment:</h2>
          <p style={pStyle}>
            You can either make the appointment online or in-person, but we
            recommend the former since you could be waiting outside of their
            offices for hours! You can make an appointment for a NIE on this{" "}
            <a href="#" style={aStyle}>
              Link
            </a>
            :
            <ul style={ulStyle}>
              <li style={liStyle}>Select your province</li>
              <li style={liStyle}>
                If you are from the European Union, select Certificados UE; or
                if you are from outside the European Union, select Expedición de
                tarjeta de identidad de extranjero
              </li>
            </ul>
            Normally you need to wait at least a month for your appointment, so
            it is best to do this as soon as possible after you arrive in Spain.
            If you are not in Spain yet and are applying for the NIE number via
            a Spanish consulate in a different country, the process will take
            longer, often up to two months or more.
          </p>
          <h2 style={h2Style}>3) Documents Required:</h2>
          <p style={pStyle}>
            Gathering the right documents is the backbone of a successful NIE
            application. Combining insights from both guides, the essential
            documents include a:
          </p>
          <ul style={ulStyle}>
            <li style={liStyle}>Valid passport (original and copies)</li>
            <li style={liStyle}>2 passport size colour photographs</li>
            <li style={liStyle}>
              2 copies of the completed EX-15 form. Note that these must be
              filled out in Spanish! but don't worry, there is an English
              version available for reference (Do not bring the English form
              with you to the appointment because only the Spanish one is
              valid!)
            </li>
            <li style={liStyle}>
              Proof of legal residence in Spain (such as a visa)
            </li>
            <li style={liStyle}>
              Supporting documentation based on your purpose of residency (work,
              study, or other)
            </li>
          </ul>
          <h2 style={h2Style}>4) Paying the fee</h2>
          <p style={pStyle}>
            Before you go to the police station, you will also have to pay 9.84
            euros in taxes for your NIE number. You need to fill in a second
            form online, the 790, print it, bring it to a bank (they’ll know
            what to do) and pay. Some banks even provide the possibility to pay
            this tax on an ATM, so it couldn’t be easier. You will get a stamp
            on the form and proof of payment. Don't forget to bring both with
            you to your appointment. Be very careful when filling in the form,
            however, not to mix instructions for EU citizens with those for
            non-EU citizens, because the boxes you have to tick are different.
          </p>

          <h2 style={h2Style}>5) The Appointment Day:</h2>
          <p style={pStyle}>
            On your scheduled day, arrive at the immigration office with all
            your documents in hand. This is your opportunity to shine, so
            communicate clearly with the officials. While some offices may
            accept English, having a basic understanding of Spanish can be
            immensely helpful.
          </p>

          <p style={pStyle}>
            Your NIE number may either be ready immediately or you might have to
            go back in a few days to collect it, depending on the city and
            region where you make the application.
          </p>
        </div>
      )}
      {blog_id === "empadronamiento" && (
        <div style={mediumStyle}>
          <h1 style={h1Style}>
            Claim Your Spanish Address: A Step-by-Step Empadronamiento Guide
          </h1>

          <h2 style={h2Style}>1) Introduction to Empadronamiento:</h2>
          <p style={pStyle}>
            The <em>certificado de empadronamiento</em> or <em>padròn</em> is a
            document that registers where you live in Spain and with whom. The
            Spanish law requires all nationals and expat residents (legal or
            not) who live more than 6 months in Spain to register at the city
            hall (<em>Padrón Municipal de Habitantes</em>). By registering,
            you’ll get your <em>certificado de empadronamiento</em>!
          </p>

          <p style={pStyle}>
            It’s highly advisable to get your “Certificado de Empadronamiento”
            as soon as you arrive in Spain because it confirms your current
            address in Spain, which allows you to conduct various
            administrative, legal, and fiscal tasks, such as:
          </p>

          <ul style={ulStyle}>
            <li style={liStyle}>
              Apply for:
              <ul style={ulStyle}>
                <li style={liStyle}>NIE number and TIE number</li>
                <li style={liStyle}>Residence permit</li>
                <li style={liStyle}>Spanish health insurance</li>
              </ul>
            </li>
            <li style={liStyle}>
              and enable you to:
              <ul style={ulStyle}>
                <li style={liStyle}>Vote in elections</li>
                <li style={liStyle}>Buy a house in Spain</li>
                <li style={liStyle}>Buy or sell a car</li>
                <li style={liStyle}>Register your child at a public school</li>
                <li style={liStyle}>Get married in Spain</li>
                <li style={liStyle}>
                  Receive grants or subsidies from the Spanish government
                </li>
              </ul>
            </li>
          </ul>

          <h2 style={h2Style}>2) How to Get an Appointment:</h2>
          <p style={pStyle}>
            In cities such as Madrid or Barcelona, you can apply for an
            empadronamiento online. For this, you’ll need to digitally identify
            yourself using methods listed on your city hall’s website, such as
            CI @ ve or eDNI/Electronic certificate.
          </p>

          <p style={pStyle}>
            Digitally identifying yourself can be tricky, so you can also call
            010 to apply via phone or visit the city hall directly
            (unfortunately this might be the easiest option). If you want to
            make an appointment at the city hall, follow the steps below:
          </p>

          <ol>
            <li style={liStyle}>
              Make a “cita previa” or prior appointment via the municipality’s
              website.
            </li>
            <li style={liStyle}>Select the office that is nearest to you.</li>
            <li style={liStyle}>
              Select the option that mentions Certificados Empadronamiento.
            </li>
            <li style={liStyle}>Pick your preferred date and time.</li>
            <li style={liStyle}>Download the appointment confirmation PDF.</li>
          </ol>

          <p style={pStyle}>
            When you’re at the city hall, be prepared to speak in Spanish or
            take a friend with you who can speak Spanish.
          </p>

          <h2 style={h2Style}>3) Documents Required:</h2>
          <p style={pStyle}>
            A filled out{" "}
            <a href="Link for Madrid">Solicitud de Empadronamiento</a> or
            application form.
          </p>

          <p style={pStyle}>
            A valid passport and copy for each member you’re registering.
          </p>

          <p style={pStyle}>
            Proof of address. This can be proved in many ways, depending on your
            situation.
          </p>

          <ul style={ulStyle}>
            <li style={liStyle}>
              If you own the property, submit the original and copy of the
              property deed.
            </li>
            <li style={liStyle}>
              If you’re renting, submit the original and copy of your rental
              contract in Spanish. The rental contract must be at least 6 months
              long. You also need to submit a signed letter by the landlord
              proving you live there, along with a copy of their ID (unless they
              come to the city hall appointment with you).
            </li>
            <li style={liStyle}>
              If you’re just renting a room and living with roommates, you could
              submit an Autorización de Empadronamiento, a signed document by
              your flatmate, alongside a copy of their ID.
            </li>
            <li style={liStyle}>
              If it's not possible to submit Autorización de Empadronamiento,
              you can prove your residence by sharing bills that confirm your
              delivery address has remained the same for the past few months.
            </li>
          </ul>

          <h2 style={h2Style}>4) Getting the padrón</h2>
          <p style={pStyle}>
            Some municipalities grant the <em>padrón</em> or “Certificado de
            Empadronamiento” immediately. But some may take a few days. In case
            it takes a few days, they’ll issue a “Volante de Empadronamiento”, a
            temporary document that does not contain the official signature of
            the city hall. A “Volante de Empadronamiento” can be used to prove
            your address for some administrative formalities, such as school
            registration or getting a Spanish SIM.
          </p>

          <p style={pStyle}>
            Compared to this, the <em>certificado de empadronamiento</em> is the
            official certificate bearing the city hall’s signature. This
            document carries more weight and is essential for important
            administrative formalities such as collecting your NIE or getting
            married.
          </p>
        </div>
      )}
      {blog_id === "social-security" && (
        <div style={mediumStyle}>
          <h1 style={h1Style}>Obtaining your Social Security Number</h1>
          <h2 style={h2Style}>1) Introduction to SSN:</h2>
          <p style={pStyle}>
            The Spanish Social Security Number is a crucial requirement for
            living and working in Spain. It’s used to access the healthcare
            system, pay taxes, and, importantly, for employment purposes. For
            those this number is crucial and should be one of your first steps
            upon starting your placement or even earlier.
          </p>

          <p style={pStyle}>
            If you’re being employed by a company in Spain, the good news is
            that your employer will typically apply for this number on your
            behalf, saving you the hassle. However, if you plan on working for
            yourself, becoming a self-employed worker, or starting a business,
            you will need to apply yourself.
          </p>

          <p style={pStyle}>
            Note, you must have your NIE before you can apply for your Social
            Security Number
          </p>

          <h2 style={h2Style}>
            2) How to Apply for your SSN and get an appointment:
          </h2>
          <p style={pStyle}>
            There are two ways to apply for a Social Security number in Spain:
            online and in-person.
          </p>

          <p style={pStyle}>
            <strong>Online Application:</strong> The fastest and easiest way to
            obtain your Social Security number is to apply online through the
            Spanish Social Security website. Look for the drop-down menu and
            choose “Solicitar número de la Seguridad Social”. Before starting,
            make sure to have a digital certificate, so that you can sign any
            online documents required. This is a crucial part of the process, so
            make sure you have it.
          </p>

          <p style={pStyle}>
            <strong>In-Person Application:</strong> Although we recommend you do
            it online (much easier!), if you prefer to apply in person, you can
            do so at your nearest Tesorería de la Seguridad Social office.
            You’ll need to make an appointment first (cita previa).
          </p>

          <h2 style={h2Style}>3) Documents Required:</h2>
          <p style={pStyle}>
            Download and fill out <a href="FORM_TA-1.pdf">FORM TA-1</a>: This is
            the application form for the SSN
          </p>

          <p style={pStyle}>
            <strong>Required Documents:</strong> ID or passport, your TIE or
            physical residency card in which your NIE number appears, and your
            employment or internship contract. If you have a digital
            certificate, you can submit these documents through the submission
            link.
          </p>

          <p style={pStyle}>
            <strong>Visit the Social Security Office:</strong> On the day of
            your appointment (cita previa) bring the same documents as mentioned
            above and your Social Security number will be issued at that very
            moment.
          </p>

          <p style={pStyle}>
            When you’re at the SSN office, be prepared to speak in Spanish or
            take a friend with you who can speak Spanish.
          </p>
        </div>
      )}
    </Box>
  );
};

export default SingleBlogPage;
