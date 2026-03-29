import { motion } from "framer-motion";

const PageWrapper = ({
  children,
  locationKey,
}: {
  children: React.ReactNode;
  locationKey: string;
}) => {
  return (
    <motion.div
      key={locationKey}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper
