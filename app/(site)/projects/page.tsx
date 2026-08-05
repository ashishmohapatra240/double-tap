import ProjectsClient from "./ProjectsClient";
import { getWorks } from "@/sanity/lib/content";

export const metadata = {
  title: "Case Studies | Double Tap",
  description: "Exploring our creative process",
};

export default async function ProjectsPage() {
  const works = await getWorks();

  return <ProjectsClient works={works} />;
}
