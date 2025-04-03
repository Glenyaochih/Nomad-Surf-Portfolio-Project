import { useState } from "react";
import AdminManagementPage from "./AdminManagmentPage";
import AdminLoadingPage from "./AdminLoadingPage";

export default function Admin() {
  const [isLoading,setIsLoading]=useState(false);
  return (
    <>
      {
        isLoading?(<AdminManagementPage/>):(<AdminLoadingPage/>)
      }
    </>
  );
}
