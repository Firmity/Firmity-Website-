"use client";
import Image from "next/image";
//import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type FeatureItemProps = {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
};

const FeatureItem: React.FC<FeatureItemProps> = ({
  imgSrc,
  imgAlt,
  title,
  description,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="flex gap-4 items-start p-5 rounded-2xl 
               bg-white/80 dark:bg-gray-900/70 
               shadow-lg backdrop-blur-md 
               hover:shadow-2xl hover:-translate-y-1 
               transition-all duration-300"
  >
    <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden border border-gray-200 shadow-md">
      <Image src={imgSrc} alt={imgAlt} fill className="object-cover" />
    </div>
    <div>
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
        {title}
      </h4>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
);

export default function StylishFeaturesBenefits() {
  // features swapped per user request (split into left and right sets)
  const leftFeatures = [
    {
      imgSrc: "/FacilityManagement/alerts.png",
      imgAlt: "Asset Management Icon",
      title: "Asset management & timely alerts",
      description:
        "Monitor assets and get timely alerts for maintenance and service due dates.",
    },
    {
      imgSrc: "/FacilityManagement/visitorman.jpg",
      imgAlt: "Visitor Management Icon",
      title: "Visitor management with digital records",
      description:
        "Log, monitor, and retrieve visitor records digitally for enhanced security and reporting.",
    },
    {
      imgSrc: "/FacilityManagement/eventbook.png",
      imgAlt: "Event Booking Icon",
      title: "Event & club room bookings with ease",
      description:
        "Digitally manage club and conference room bookings and community events transparently.",
    },
    {
      imgSrc: "/FacilityManagement/complain.png",
      imgAlt: "Complaint Management QR Icon",
      title: "Complaint logging with live QR scanning",
      description:
        "Scan, log, and track complaints in real time with QR-based reporting system.",
    },
  ];

  const rightFeatures = [
    {
      imgSrc: "/FacilityManagement/inventandstock.png",
      imgAlt: "Inventory and Stock Icon",
      title: "Inventory & stock paperless tracking",
      description:
        "Generate purchase orders, track purchases, and maintain real-time stock records efficiently.",
    },
    {
      imgSrc: "/FacilityManagement/auto.png",
      imgAlt: "Preventive Maintenance Icon",
      title: "Auto-scheduled preventive maintenance",
      description:
        "Schedule and track maintenance tasks are there to avoid last-minute breakdowns.",
    },
    {
      imgSrc: "/FacilityManagement/cloud-based.jpg",
      imgAlt: "Cloud Based Digital Storage Icon",
      title: "Cloud-based document access anytime",
      description:
        "Access and update all your facility documents anytime, securely stored in the cloud.",
    },
    {
      imgSrc: "/FacilityManagement/staff.png",
      imgAlt: "Staff Attendance Icon",
      title: "Staff attendance & transparent leave approvals",
      description:
        "Digitally track staff attendance and approve leaves with transparency and ease.",
    },
  ];

  // Paragraph text relocated below features (same style as intro paragraph)
  const relocatedParagraph = `Imagine missing an AMC renewal, overlooking a water tank cleaning schedule, or losing track of vendor payments—these are everyday challenges Firmity solves. Experience how technology can simplify facility management.`;

  return (
    <section className="relative pt-20 pb-10 px-6 md:px-20 w-full bg-gradient-to-tr from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-6 
                     text-gray-900 dark:text-white tracking-tight"
        >
          Valuable Facility Management Solutions
        </motion.h2>

        {/* Intro Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16 
                     text-gray-700 dark:text-gray-300 
                     text-lg leading-relaxed font-medium"
        >
          Firmity is a smart, integrated facility management software built to
          simplify operations, enhance visibility, and empower teams with
          real-time control over maintenance, assets, workforce, and
          compliance—digitally and efficiently.
        </motion.p>

        {/* Features grid with swapped sides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column - was right features */}
          <div className="space-y-6">
            {leftFeatures.map(({ imgSrc, imgAlt, title, description }, idx) => (
              <FeatureItem
                key={idx}
                imgSrc={imgSrc}
                imgAlt={imgAlt}
                title={title}
                description={description}
              />
            ))}
          </div>

          {/* Right Column - was left features */}
          <div className="space-y-6">
            {rightFeatures.map(
              ({ imgSrc, imgAlt, title, description }, idx) => (
                <FeatureItem
                  key={idx}
                  imgSrc={imgSrc}
                  imgAlt={imgAlt}
                  title={title}
                  description={description}
                />
              )
            )}
          </div>
        </div>

        {/* Relocated paragraph below features */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center max-w-5xl mx-auto my-16 
                     text-gray-700 dark:text-gray-300 
                     text-lg leading-relaxed font-medium"
        >
          {relocatedParagraph}
        </motion.p>

        {/* Benefits Box below relocated paragraph */}
        {/* The Benefits Heading */}
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-center text-green-900 dark:text-green-300 mb-16"
        >
          The Benefits
        </motion.h3>

        {/* Three Benefit Boxes in 2+1 grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 px-4 md:px-0">
          {/* Top two boxes */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white/70 dark:bg-gray-900/60 rounded-3xl p-8 shadow-lg backdrop-blur-md border border-green-300 border-opacity-30 flex flex-col"
          >
            <h4 className="font-serif font-semibold text-xl text-green-800 dark:text-green-200 uppercase tracking-widest border-b-2 border-green-500 pb-3 mb-6">
              Productivity
            </h4>
            <ul className="list-disc list-inside text-green-900 dark:text-green-100 text-base space-y-3 leading-relaxed">
              <li>Centralized records enable faster decision-making.</li>
              <li>Automated task alerts ensure nothing is missed.</li>
              <li>Integrated modules boost team coordination and speed.</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white/70 dark:bg-gray-900/60 rounded-3xl p-8 shadow-lg backdrop-blur-md border border-green-300 border-opacity-30 flex flex-col"
          >
            <h4 className="font-serif font-semibold text-xl text-green-800 dark:text-green-200 uppercase tracking-widest border-b-2 border-green-500 pb-3 mb-6">
              Longevity
            </h4>
            <ul className="list-disc list-inside text-green-900 dark:text-green-100 text-base space-y-3 leading-relaxed">
              <li>Scheduled PPM extends asset life.</li>
              <li>Digital logs support better upkeep planning.</li>
              <li>Smart tracking reduces wear and tear.</li>
            </ul>
          </motion.div>

          {/* Spacer column */}
          {/* <div></div> */}

          {/* Centered bottom box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="bg-white/70 dark:bg-gray-900/60 rounded-3xl p-8 shadow-lg backdrop-blur-md border border-green-300 border-opacity-30 flex flex-col mx-auto max-w-md col-span-1 md:col-span-2"
          >
            <h4 className="font-serif font-semibold text-xl text-green-800 dark:text-green-200 uppercase tracking-widest border-b-2 border-green-500 pb-3 mb-6">
              Sustainability
            </h4>
            <ul className="list-disc list-inside text-green-900 dark:text-green-100 text-base space-y-3 leading-relaxed">
              <li>Efficient resource use cuts waste.</li>
              <li>Paperless operations promote eco-friendliness.</li>
              <li>Smart access control lowers energy use.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
