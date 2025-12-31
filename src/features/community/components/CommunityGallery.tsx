'use client';

import { Container, Section } from "@/components/ui";
import { motion } from "framer-motion";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const GALLERY_IMAGES = [
  {
    src: "/community/cse-phoenix-girls.jpg",
    alt: "CSE Phoenix Girls Team",
    title: "Phoenix Girls Team"
  },
  {
    src: "/community/cse-phoenix_admins.jpg",
    alt: "CSE Phoenix Admins",
    title: "Phoenix Admins"
  }
];

export default function CommunityGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <Section variant="light" className="!py-10 md:!py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100 mb-4">
            <Camera className="w-4 h-4 text-rose-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-rose-700">
              Our Community
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2 md:mb-4 font-anek">
            Community <span className="text-rose-600">Gallery</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto px-4 sm:px-0">
            Moments captured from our blood donation drives, events, and community gatherings
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105 bg-slate-100"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl">{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative w-full max-w-5xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_IMAGES[selectedImage]?.src || ''}
                alt={GALLERY_IMAGES[selectedImage]?.alt || ''}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-white font-semibold text-lg">
                {GALLERY_IMAGES[selectedImage]?.title || ''}
              </p>
            </div>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
