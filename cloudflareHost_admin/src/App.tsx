import AppNavigation from "./adminApp/appNavigation/AppNavigation";
import NotificationPrompt from "./adminApp/component/notificationPrompt/NotificationPrompt";
import PWAInstallWidget from "./adminApp/component/PWAInstallWidget";



function App() {
 
  return (
  
    <>
      <PWAInstallWidget />
      <NotificationPrompt /> 
      <AppNavigation />
    
    </>
      
  );
}

export default App;
