import AdminIndexPage from "./AdminIndexPage";
import AdminLoginPage from "./AdminLoginPage";
import { useSelector } from "react-redux";

export default function Admin() {
  const isLogin = useSelector((state)=>state.adminLogin.isManagementPageOpen)
  return (
    <>
      {
        isLogin?(<AdminIndexPage/>):(<AdminLoginPage/>)
      }
    </>
  );
}
