interface InlineErrorProps {
  message: string | null;
}

const InlineError = ({ message }: InlineErrorProps) => {
  if (!message) return null;

  return (
    <p className="text-red-500 text-sm mt-1 animate-fadeInOut text-center mb-4">
      {message}
    </p>
  );
};


export default InlineError;
