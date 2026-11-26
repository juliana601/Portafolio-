import { existsSync } from "node:fs";
import { join } from "node:path";
import Hero from "./components/hero/Hero";
import PortfolioContent from "./components/sections/PortfolioContent";
import Nox from "./components/experience/Nox";
import ScrollStory from "./components/experience/ScrollStory";

export default function Home() {
  const images = Object.fromEntries(["profile","effiadmi","alquipc","tienda"].map(name=>[name,existsSync(join(process.cwd(),"public","images",`${name}.jpg`))?`/images/${name}.jpg`:null]));
  return <main className="site-shell"><ScrollStory /><Hero /><PortfolioContent images={images}/><Nox /></main>;
}
