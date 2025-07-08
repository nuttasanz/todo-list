import HomePage from "@/components/Home/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TODO LIST",
  description: "TODO LIST",
};

export default function Home() {
  return (
    <div className="container m-auto p-4 sm:p-12">
      <HomePage />
    </div>
  );
}
