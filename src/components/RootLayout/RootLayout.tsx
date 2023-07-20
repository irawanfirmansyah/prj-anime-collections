import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "900"] });

const RootLayout = ({ children }: { children?: React.ReactNode }) => {
  return <div className={`${inter.className}`}>{children}</div>;
};

export default RootLayout;
