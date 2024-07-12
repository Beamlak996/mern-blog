import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { DashSidebar } from "../components/dash-sidebar";
import { DashProfile } from "../components/dash-profile";

export function Dashobard() {
  const [tab, setTab] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabForms = urlParams.get("tab");

    if (tabForms) {
      setTab(tabForms);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row" >
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}
    </div>
  );
}
