import { Outlet } from "react-router-dom";
import Sitbar from "../component/sitbar/Sitbar";
import { NotificationProvider } from "../component/context/UniversalNotificationContext";


const AppLayout = () => {


 

  return (
    <NotificationProvider>
      <div className="flex bg-gray-50 min-h-[100dvh] overflow-hidden">
        <Sitbar />
        <main className=" flex-1 bg-gray-900 ml-0 2xl:ml-[288px] min-h-[100dvh] overflow-y-auto transition-all duration-300">
          <Outlet />
        </main>
      </div>
   </NotificationProvider>
  );
};

export default AppLayout;