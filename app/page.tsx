import Hero from "./components/Home/Hero";
import homeData from "@/components/Content/home.json";
import ContactInfo from "@/components/Content/ContactInfo.json";

export async function generateMetadata() {
  return {
    title: homeData.metaTitle,
    description: `${homeData?.metaDescription
      ?.split("[location]")
      .join(ContactInfo.location)
      ?.split("[phone]")
      .join(ContactInfo.No)}.`,
    alternates: {
      canonical: `https://${ContactInfo.host}`,
    },
  };
}

export default function Home() {
  const newData = JSON.parse(
    JSON.stringify(homeData)
      .split("[location]")
      .join(ContactInfo.location)
      .split("[phone]")
      .join(ContactInfo.No),
  );
  return (
    <div className="">
      <Hero />
    </div>
  );
}
