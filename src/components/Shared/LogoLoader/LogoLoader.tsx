/* eslint-disable react-hooks/static-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IMAGES } from "../../../assets";

interface LogoLoaderProps {
  isLoading?: boolean;
  showAnimation?: boolean;
}

const LogoLoader = ({
  isLoading = true,
  showAnimation = true,
}: LogoLoaderProps) => {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const logoVariants: any = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Bouncing dots with matching color
  const BounceLoader = () => (
    <div className="flex items-center gap-2 mt-6">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: "#d4af37" }} // Primary-5 color
          animate={{
            y: [0, -14, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-9999 flex items-center justify-center bg-white/60 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center">
            {/* Logo with Link */}
            <motion.div variants={logoVariants} className="relative mb-5">
              <Link to="/" className="flex items-center gap-3">
                <motion.img
                  src={IMAGES.logoFooter}
                  alt="Vedic Wisdom"
                  className={`w-54`}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </Link>
            </motion.div>

            {/* Bounce Animation */}
            {showAnimation && <BounceLoader />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoLoader;
