"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages, galleryCategories } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const selectedImageData = selectedImage !== null ? galleryImages.find((img) => img.id === selectedImage) : null;
  const selectedImageIndex = selectedImage !== null ? filteredImages.findIndex((img) => img.id === selectedImage) : -1;

  const getCategoryIcon = (category: string) => {
    const cat = galleryCategories.find((c) => c.id === category);
    return cat?.icon || "📸";
  };

  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      education: "from-blue-500 to-cyan-500",
      arts: "from-pink-500 to-rose-500",
      events: "from-yellow-500 to-orange-500",
      sports: "from-green-500 to-emerald-500",
      community: "from-purple-500 to-indigo-500",
    };
    return gradients[category] || "from-gray-500 to-gray-600";
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
    let newIndex;
    
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = filteredImages.length - 1;
    }
    
    setSelectedImage(filteredImages[newIndex].id);
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedImage === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
        const newIndex = currentIndex - 1 < 0 ? filteredImages.length - 1 : currentIndex - 1;
        setSelectedImage(filteredImages[newIndex].id);
      } else if (e.key === "ArrowRight") {
        const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
        const newIndex = (currentIndex + 1) % filteredImages.length;
        setSelectedImage(filteredImages[newIndex].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredImages]);

  // Helper function to check if image exists
  const imageExists = (imagePath: string) => {
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="py-12 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Photo <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Gallery</span>
              </h1>
              <div className="w-32 h-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 mx-auto rounded-full mb-6" />
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Explore our collection of moments capturing joy, learning, and creativity
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-background border-b sticky top-16 z-40 backdrop-blur bg-background/95">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {galleryCategories.map((category) => {
                const count = category.id === "all" 
                  ? galleryImages.length 
                  : galleryImages.filter((img) => img.category === category.id).length;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setSelectedImage(null);
                    }}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="wait">
                {filteredImages.map((image, index) => {
                  const gradient = getCategoryGradient(image.category);
                  
                  return (
                    <motion.div
                      key={image.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                      onClick={() => setSelectedImage(image.id)}
                    >
                      {imageExists(image.image) ? (
                        <Image
                          src={image.image}
                          alt={image.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className={`h-full w-full bg-gradient-to-br ${gradient} relative`}>
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                              {getCategoryIcon(image.category)}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-medium">{image.title}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && selectedImageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-background rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Navigation Buttons */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage("prev")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => navigateImage("next")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Image Display */}
              <div className="relative w-full h-[70vh] bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center overflow-hidden">
                {imageExists(selectedImageData.image) ? (
                  <Image
                    src={selectedImageData.image}
                    alt={selectedImageData.title}
                    fill
                    className="object-contain"
                    priority
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(selectedImageData.category)} flex items-center justify-center relative`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <span className="text-9xl opacity-80 relative z-10">
                      {getCategoryIcon(selectedImageData.category)}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <p className="text-white/80 text-sm bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
                        Add your image at: {selectedImageData.image}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Image Info */}
              <div className="p-6 bg-background">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{selectedImageData.title}</h3>
                    <p className="text-muted-foreground mb-4">{selectedImageData.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <span>{getCategoryIcon(selectedImageData.category)}</span>
                        {galleryCategories.find((c) => c.id === selectedImageData.category)?.name}
                      </span>
                      <span>•</span>
                      <span>{selectedImageData.date}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedImageIndex + 1} / {filteredImages.length}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

