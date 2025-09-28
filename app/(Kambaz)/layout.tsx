import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz">
      <div className="d-flex">
        <KambazNavigation />
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
