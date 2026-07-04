import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { ICONS, IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import Badge from "../../Reusable/Badge/Badge";

const FAQ = () => {
  const [isAccordingOpen, setIsAccordingOpen] = useState<number | null>(0);

  const handleClick = (index: number) =>
    setIsAccordingOpen((prevIndex) => (prevIndex === index ? null : index));

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  type FAQItem = {
    title: string;
    description: string | React.ReactNode;
  };

  const faqs: FAQItem[] = [
    {
      title: "Q1. Do I need exact birth time?",
      description:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis sit repellat vero adipisci ab non amet, esse doloribus? Officia hic, eaque corrupti quae iure delectus ea distinctio quisquam, veritatis accusamus minima repellendus eius quo dignissimos laboriosam eum reprehenderit doloribus iste! Corporis ab ut officia non officiis quisquam fuga nulla architecto!",
    },
    {
      title: "Q2: Is my data सुरक्षित?",
      description:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis sit repellat vero adipisci ab non amet, esse doloribus? Officia hic, eaque corrupti quae iure delectus ea distinctio quisquam, veritatis accusamus minima repellendus eius quo dignissimos laboriosam eum reprehenderit doloribus iste! Corporis ab ut officia non officiis quisquam fuga nulla architecto!",
    },
    {
      title: "Q3: Is this only for astrology believers?",
      description:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis sit repellat vero adipisci ab non amet, esse doloribus? Officia hic, eaque corrupti quae iure delectus ea distinctio quisquam, veritatis accusamus minima repellendus eius quo dignissimos laboriosam eum reprehenderit doloribus iste! Corporis ab ut officia non officiis quisquam fuga nulla architecto!",
    },
  ];

  return (
    <div className="py-23 font-Manrope bg-gradient-app-features">
      <img src={IMAGES.horizontalLine} alt="" className="mx-auto" />
      <Container>
        <div className="flex flex-col gap-5 items-center text-center mt-20">
          <Badge label="FAQs" />

          <h1 className="heading">
            Questions About
            <br />
            <span className="text-primary-10">Vedic Wisdom.</span>
          </h1>

          <p className="description">
            Everything you need to know about the platform, memberships, AI
            guidance, and spiritual tools.
          </p>
          <motion.div
            className="flex gap-6 flex-col w-full text-neutral-5 mt-12"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {faqs?.map((according, index) => (
              <motion.article
                key={index}
                className={`bg-white shadow border border-neutral-20 rounded-2xl p-4 md:p-6 transform duration-300 w-full max-w-5xl mx-auto group`}
                variants={itemVariants}
                layout
              >
                <motion.div
                  className="flex gap-2 cursor-pointer items-center justify-between w-full"
                  onClick={() => handleClick(index)}
                >
                  <h2
                    className={`font-Satoshi font-semibold text-2xl leading-9 ${
                      isAccordingOpen === index && "text-primary-5"
                    }`}
                  >
                    {according.title}
                  </h2>
                  <button className="bg-white shadow group-hover:bg-primary-10/60 transition duration-300 border border-neutral-20 rounded-full size-8 flex items-center justify-center">
                    <img
                      src={ICONS.cross}
                      alt=""
                      className={`size-4 transition duration-300 ${
                        isAccordingOpen === index ? "rotate-0" : "rotate-44"
                      }`}
                    />
                  </button>
                </motion.div>

                <AnimatePresence initial={false}>
                  {isAccordingOpen === index && (
                    <motion.section
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto", marginTop: "8px" },
                        collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <p className="text-neutral-10 text-left max-w-[90%]">
                        {according.description}
                      </p>
                    </motion.section>
                  )}
                </AnimatePresence>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default FAQ;
