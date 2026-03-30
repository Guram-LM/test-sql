import { useFetchResources } from "../../../services/queries/query/useFetchResources";
import AdminLoader from "../../adminLoader/AdminLoader";
import AdminError from "../../adminError/AdminError";
import Facebook from "./Facebook";
import Instagram from "./Instagram";
import LinkedIn from "./LinkedIn";


const SocialMediaList = () => {

  const { data, isLoading, isError } = useFetchResources("social_media");
  

  


  if (isLoading) return <AdminLoader/>
  if (isError) return <AdminError/>
  

  return (
    <>
      <Facebook data={data}/>
      <Instagram data={data}/>
      <LinkedIn data={data}/>
    </>
    
  );
};

export default SocialMediaList;