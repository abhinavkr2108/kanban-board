import Header from "@/components/shared/Header";
import LandingPage from "@/components/shared/LandingPage";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <Header />
      <LandingPage />
    </React.Fragment>
  );
}
