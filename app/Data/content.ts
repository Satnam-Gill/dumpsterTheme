import aboutData from "@/components/Content/about.json";
import blogDataJson  from "@/components/Content/blogs.json";
import blogCategoryMetaJson  from "@/components/Content/blogsCategoryMetas.json";
import contactPageDataJson  from "@/components/Content/contact.json";
import contactDataJson from "@/components/Content/ContactInfo.json";
import homePageDataJson  from "@/components/Content/home.json";
import locationPageDataJson   from "@/components/Content/location.json";
import brandsDataJson  from "@/components/Content/ourBrand.json";
import servicePageDataJson  from "@/components/Content/servicePage.json";
import typesJson  from "@/components/Content/typesPage.json";


// Contact Content
const {
  No = undefined,
  tel = undefined,
  mail = undefined,
  baseUrl = undefined,
  host = undefined,
  name = undefined,
  address = undefined,
  service = undefined,
  location = undefined,
  zipCode = undefined,
  bannerImage = undefined,
  logoImage = "",
  favicon = "",
  googleAnalytics = undefined,
  minor = "#fed700",
  main = "#283143",
} = (contactDataJson as any) || {};

const contactContent: any = {
  No,
  tel,
  mail,
  baseUrl,
  host,
  name,
  address,
  service,
  location,
  zipCode,
  bannerImage,
  logoImage,
  favicon,
  googleAnalytics,
  minor,
  main
};

//About Content
const {
  metaTitle = undefined,
  metaDescription = undefined,
  bannerQuote = undefined,
  bannerImage: aboutBannerImage = undefined, // renamed here
  h1Banner = undefined,
  p1Banner = undefined,
  p2 = "",
  h2Image = "",
  missionSection = [],
  areaweserveSection = {},
} = aboutData || {};

const aboutContent: any = {
  metaTitle,
  metaDescription,
  bannerQuote,
  bannerImage: aboutBannerImage,
  h1Banner,
  p1Banner,
  p2,
  h2Image,
  missionSection,
  areaweserveSection,
};

// Blogs Content
const blogContent: any = {
  posts: Array.isArray(blogDataJson) ? blogDataJson : [],
};

// Blogs Category Content
const blogCategoryMetaMap: any =
  (blogCategoryMetaJson as any) || {};

// Contact Page Content
const {
  metaTitle: contactPageMetaTitle = undefined,
  metaDescription: contactPageMetaDescription = undefined,
  bannerQuote: contactPageBannerQuote = undefined,
  bannerImage: contactPageBannerImage = undefined,
  h1Banner: contactPageH1Banner = undefined,
  p1Banner: contactPageP1Banner = "",
  h2 = undefined,
  h2Image: contacth2Image = "",
  p2:contactp2 = "",
  h3 = undefined,
  p3 = "",
  h3Image = "",
  ctaText = undefined,
  mapLink = undefined,
} = (contactPageDataJson as any) || {};

const contactPageContent: any = {
  metaTitle: contactPageMetaTitle,
  metaDescription: contactPageMetaDescription,
  bannerQuote: contactPageBannerQuote,
  bannerImage: contactPageBannerImage,
  h1Banner: contactPageH1Banner,
  p1Banner: contactPageP1Banner,
  h2,
  h2Image: contacth2Image,
  p2:contactp2,
  h3,
  p3,
  h3Image,
  ctaText,
  mapLink,
};

// Home Content
const {
  metaTitle: homeMetaTitle = undefined,
  metaDescription: homeMetaDescription = undefined,
  bannerQuote: homeBannerQuote = undefined,
  bannerImage: homeBannerImage = undefined,
  h1Banner: homeH1Banner = undefined,
  p1Banner: homeP1Banner = "",
  h2: homeh2 = undefined,
  p2: homep2 = "",
  h2Image: homeh2Image = "",
  h3: homeh3 = undefined,
  p3: homep3 = "",
  h3Image: homeh3Image = "",
  mapLink: homemapLink = undefined,
  faq = [],
  reviews = [],
  whyChooseSection = { title: "", whyChooseData: [] },
  affordableWidget = {
    title: "",
    description: "",
    ctaText: "",
    cards: [],
  },
  processWidget = { title: "", description: "", steps: [] },
  hourCtaWidget = { title: "" },
} = (homePageDataJson as any) || {};

const homePageContent: any = {
  metaTitle: homeMetaTitle,
  metaDescription: homeMetaDescription,
  bannerQuote: homeBannerQuote,
  bannerImage: homeBannerImage,
  h1Banner: homeH1Banner,
  p1Banner: homeP1Banner,
  h2: homeh2,
  p2: homep2,
  h2Image: homeh2Image,
  h3: homeh3,
  p3: homep3,
  h3Image: homeh3Image,
  mapLink: homemapLink,
  faq,
  reviews,
  whyChooseSection,
  affordableWidget,
  processWidget,
  hourCtaWidget,
};

// location Page Content
const {
  metaTitle: locationMetaTitle = undefined,
  metaDescription: locationMetaDescription = undefined,
  bannerQuote: locationBannerQuote = undefined,
  bannerImage: locationBannerImage = undefined,
  h1Banner: locationH1Banner = undefined,
  p1Banner: locationP1Banner = "",
  blogMetas = {
    metaTitle: undefined,
    metaDescription: undefined,
  },
} = (locationPageDataJson as any) || {};

const locationPageContent: any = {
  metaTitle: locationMetaTitle,
  metaDescription: locationMetaDescription,
  bannerQuote: locationBannerQuote,
  bannerImage: locationBannerImage,
  h1Banner: locationH1Banner,
  p1Banner: locationP1Banner,
  blogMetas,
};

// Brands Content
const {
  metaTitle: brandsMetaTitle = undefined,
  metaDescription: brandsMetaDescription = undefined,
  bannerImage: brandsBannerImage = undefined,
  h1Banner: brandsH1Banner = undefined,
  h2: brandh2 = undefined,
  p2: brandsP2 = "",
  h2Image :brandsh2Image = "",
  brandslist = [],
} = (brandsDataJson as any) || {};

const brandsContent: any = {
  metaTitle: brandsMetaTitle,
  metaDescription: brandsMetaDescription,
  bannerImage: brandsBannerImage,
  h1Banner: brandsH1Banner,
  h2:brandh2,
  p2: brandsP2,
  h2Image:brandsh2Image,
  brandslist,
};

// Service Page Content
const {
  metaTitle: serviceMetaTitle = undefined,
  metaDescription: serviceMetaDescription = undefined,
  bannerQuote: serviceBannerQuote = undefined,
  bannerImage: serviceBannerImage = undefined,
  h1Banner: serviceH1Banner = undefined,
  p1Banner: serviceP1Banner = "",
  serviceTitle = undefined,
  serviceData = { title: "", p: "", lists: [] },
} = (servicePageDataJson as any) || {};

const servicePageContent: any = {
  metaTitle: serviceMetaTitle,
  metaDescription: serviceMetaDescription,
  bannerQuote: serviceBannerQuote,
  bannerImage: serviceBannerImage,
  h1Banner: serviceH1Banner,
  p1Banner: serviceP1Banner,
  serviceTitle,
  serviceData,
};

// Types Page Content
const {
  metaTitle: portableMetaTitle = undefined,
  metaDescription: portableMetaDescription = undefined,
  bannerQuote: portableBannerQuote = undefined,
  bannerImage: portableBannerImage = undefined,
  h1Banner: portableH1Banner = undefined,
  p1Banner: portableP1Banner = "",
  serviceTitle: portableServiceTitle = undefined,
  serviceData:typeserviceData = { title: "", p: "", lists: [] },
} = (typesJson as any) || {};
const typesJsonContent: any = {
  metaTitle: portableMetaTitle,
  metaDescription: portableMetaDescription,
  bannerQuote: portableBannerQuote,
  bannerImage: portableBannerImage,
  h1Banner: portableH1Banner,
  p1Banner: portableP1Banner,
  serviceTitle: portableServiceTitle,
  serviceData:typeserviceData,
};


// Utility function to replace placeholders in strings
function replacePlaceholders(obj: any, ContactInfo: any): any {
  if (typeof obj === "string") {
    return obj
      .split("[location]").join(ContactInfo.location)
      .split("[phone]").join(ContactInfo.No);
  } else if (Array.isArray(obj)) {
    return obj.map(item => replacePlaceholders(item, ContactInfo));
  } else if (obj && typeof obj === "object") {
    const result: any = {};
    for (const key in obj) {
      result[key] = replacePlaceholders(obj[key], ContactInfo);
    }
    return result;
  }
  return obj;
}

// Use contactContent as ContactInfo for replacements
const ContactInfo = contactContent;

const content: {
  aboutContent: any;
  contactContent: any;
  blogContent: any;
  blogCategoryMetaMap: any;
  contactPageContent: any;
  homePageContent: any;
  locationPageContent: any;
  brandsContent: any;
  servicePageContent: any;
  typesJsonContent: any;
} = {
  aboutContent: replacePlaceholders(aboutContent, ContactInfo),
  contactContent: replacePlaceholders(contactContent, ContactInfo),
  blogContent: replacePlaceholders(blogContent, ContactInfo),
  blogCategoryMetaMap: replacePlaceholders(blogCategoryMetaMap, ContactInfo),
  contactPageContent: replacePlaceholders(contactPageContent, ContactInfo),
  homePageContent: replacePlaceholders(homePageContent, ContactInfo),
  locationPageContent: replacePlaceholders(locationPageContent, ContactInfo),
  brandsContent: replacePlaceholders(brandsContent, ContactInfo),
  servicePageContent: replacePlaceholders(servicePageContent, ContactInfo),
  typesJsonContent: replacePlaceholders(typesJsonContent, ContactInfo),
};

export default content;