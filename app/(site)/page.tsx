import HomeClient from "./HomeClient";
import { getBrands, getReasons, getTeam, getWorks } from "@/sanity/lib/content";

export default async function Home() {
  const [works, team, brands, reasons] = await Promise.all([
    getWorks(),
    getTeam(),
    getBrands(),
    getReasons(),
  ]);

  return (
    <HomeClient
      works={works}
      featuredMembers={team.filter((member) => member.featured)}
      teamMembers={team.filter((member) => !member.featured)}
      brands={brands}
      reasons={reasons}
    />
  );
}
