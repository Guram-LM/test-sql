import { useCreateWithModal } from "../../../component/hook/handleSubmit";
import ErrorModal from "../../../component/modal/errorModal/ErrorModal";
import SuccessModal from "../../../component/modal/successModal/SuccessModal";
import ResourceForm from "../../../component/resourceForm/ResourceForm";

const CreateSocialMedia = () => {
  const {
    handleSubmit,
    isPending,
    successOpen,
    errorOpen,
    setSuccessOpen,
    setErrorOpen
  } = useCreateWithModal("social_media");

  return (
    <> 
      <ResourceForm
        type="social_media"
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

export default CreateSocialMedia