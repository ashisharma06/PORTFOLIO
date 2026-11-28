import { PaperStage } from "@/components/paper/PaperStage";
import { PlaceholderPage } from "@/components/paper/pages/PlaceholderPage";

const pages = [
  "Front Page",
  "Wins",
  "Dashify",
  "BlogSeek",
  "DocuMind",
  "Commit Story",
  "Toolkit and Education",
  "Contact",
];

export default function Home() {
  return (
    <PaperStage>
      {pages.map((title, index) => (
        <PlaceholderPage key={title} number={index + 1} title={title} />
      ))}
    </PaperStage>
  );
}
