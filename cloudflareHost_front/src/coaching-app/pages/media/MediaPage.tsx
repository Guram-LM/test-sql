import PublicMedia from "./PublicMedia"
import SectionHeader from "./SectionHeader"
import SocialMediaInterviews from "./SocialInterview"
import VideoMedia from "./VideoMedia"


const MediaPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-linear-to-br from-amber-50 via-stone-100 to-amber-100">
      <SectionHeader/>
      <VideoMedia />
      <PublicMedia />
      <SocialMediaInterviews/>
    </div>
  )
}

export default MediaPage