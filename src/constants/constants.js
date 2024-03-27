export const pages = ["Services", "Blog", "About Us"];
export const settings = ["Account", "Logout"];
export const drawerWidth = 200;
export const tabletDrawerWidth = 200;
export const minBottomNavHeight = 60;
export const housingPageSize = 30;
export const minNavbarHeight = {
  xs: "50px",
  sm: "50px",
  md: "64px",
  lg: "64px",
  xl: "64px",
};

export const contentHeight = {
  xs: "87vh",
  md: "82vh",
  lg: "92vh",
  xl: "93.5vh",
};

export const defaultHousingFilters = {
  minPrice: "",
  maxPrice: "",
  propertyType: [],
  furniture: "",
  totalSize: "",
  bedrooms: "",
  facilities: [],
  amenities: [],
  rentType: [],
  partner: "",
};

export const defaultEventFilters = {
  categories: [],
};

export const eventCategories = [
  "Exclusive events",
  "Experiences",
  "Music",
  "Party",
  "Food & Drinks",
  "Play",
  "Cinema",
  "Museums",
  "Courses",
  "Sport",
  "Fitness",
  "Games",
  "Other",
];

export const imagesCdn = "https://d1dshnpqadx0e7.cloudfront.net/images";
export const documentsCdn = "https://d1dshnpqadx0e7.cloudfront.net/documents";

export const spotAHomeDocLink = `${documentsCdn}/partners/spotahome/discount_explanation.pdf`;

export const digitalNomadReq = (
  <ul style={{ fontSize: 15 }}>
    <li style={{ marginBottom: "5px" }}>
      Demonstrate at least{" "}
      <b>
        3 years of work experience in the field or hold a Professional Degree
      </b>{" "}
      related to the job position.
    </li>
    <li style={{ marginBottom: "5px" }}>
      You must have been working for your company for at least 3 months and have
      a <b>contract of at least 1 year.</b> Also, you need to have a written
      authorization to work remotely.
    </li>
    <li style={{ marginBottom: "5px" }}>
      Your company should be <b>located outside Spain.</b>
    </li>
    <li style={{ marginBottom: "5px" }}>
      Prove that your income from Spanish clients{" "}
      <b>does not represent more than 20% of your total earnings.</b>
    </li>
    <li style={{ marginBottom: "5px" }}>
      Have a <b>minimum income level</b> of at least €30.240 (and even more if
      you take your relatives with you).
    </li>
    <li>
      Have a{" "}
      <b>
        clean criminal record and private health insurance with full coverage
      </b>{" "}
      in Spain.
    </li>
  </ul>
);

export const goldenVisaReq = (
  <ul style={{ fontSize: 15 }}>
    <li style={{ marginBottom: "5px" }}>
      Not being a citizen of the European Union.
    </li>
    <li style={{ marginBottom: "5px" }}>
      Be of legal age <b>(+18 in Spain).</b>
    </li>
    <li style={{ marginBottom: "5px" }}>
      Have no criminal record, either in Spain or in any other country, for the
      last 5 years.
    </li>
    <li style={{ marginBottom: "5px" }}>
      Have health care coverage in Spain. This can be through public insurance
      or private insurance but{" "}
      <b>it must belong to an insurance company in Spain.</b>
    </li>
    <li style={{ marginBottom: "5px" }}>
      To have and prove the possession of sufficient financial resources to
      support both the main investor and their family if the application is made
      for them as well.
    </li>
    <li>
      Making the relevant investment{" "}
      <b>(whether 500,000, €1M or €2M depending on which path is chosen)</b>,
      and provide the corresponding document to prove it.
    </li>
  </ul>
);

export const beckhamReq = (
  <div style={{ fontSize: 15 }}>
    You can apply for the Beckham Law if you are a foreign worker{" "}
    <b>who just moved to Spain</b> and one of the following:
    <ul>
      <li style={{ marginTop: "5px", marginBottom: "5px" }}>
        An expat with an executive or management position and high income.
      </li>
      <li style={{ marginBottom: "5px" }}>
        A highly qualified professional who provides services to emerging
        companies (this case has some extra conditions).
      </li>
      <li style={{ marginBottom: "5px" }}>
        A remote worker in Spain that works for a foreign company.
      </li>
      <li style={{ marginBottom: "5px" }}>
        An administrator who will work for a Spanish company (they should have a
        participation of less than 25% in the case of asset-holding companies).
      </li>
      <li>
        An entrepreneur with an innovative project of special economic interest
        for Spain.
      </li>
    </ul>
  </div>
);
