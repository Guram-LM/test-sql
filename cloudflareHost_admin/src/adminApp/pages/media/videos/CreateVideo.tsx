import { useCreateWithModal } from "../../../component/hook/handleSubmit";
import ErrorModal from "../../../component/modal/errorModal/ErrorModal";
import SuccessModal from "../../../component/modal/successModal/SuccessModal";
import ResourceForm from "../../../component/resourceForm/ResourceForm";


const CreateVideo = () => {
  const {
    handleSubmit,
    isPending,
    successOpen,
    errorOpen,
    setSuccessOpen,
    setErrorOpen
  } = useCreateWithModal("videos");

  return (
    <> 
    <ResourceForm
      type="videos"
      onSubmit={handleSubmit}
      loading={isPending}
    />

    {successOpen && (
      <SuccessModal onClose={() => setSuccessOpen(false)} />
    )}

    {errorOpen && (
      <ErrorModal onClose={() => setErrorOpen(false)} />
    )}
  </>
  );
}

export default CreateVideo