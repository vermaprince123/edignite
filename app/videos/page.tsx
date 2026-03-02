"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink, Calendar, Clock } from "lucide-react";
import { youtubeVideos, YouTubeVideo } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Helper function to extract video ID from YouTube URL
const extractVideoId = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : "";
};

// Helper function to get YouTube thumbnail
const getThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// Helper function to get YouTube embed URL
const getEmbedUrl = (videoId: string, startTime?: number): string => {
  const baseUrl = `https://www.youtube.com/embed/${videoId}`;
  const params = new URLSearchParams();
  if (startTime) {
    params.append("start", startTime.toString());
  }
  params.append("autoplay", "1");
  params.append("rel", "0");
  params.append("modestbranding", "1");
  return `${baseUrl}?${params.toString()}`;
};

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [videoStartTime, setVideoStartTime] = useState<number>(0);

  // Extract start time from URL if present (e.g., &t=62s)
  const extractStartTime = (url: string): number => {
    const match = url.match(/[?&]t=(\d+)s?/);
    return match ? parseInt(match[1]) : 0;
  };

  const openVideo = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    // If video has a URL with timestamp, extract it
    const startTime = extractStartTime(video.videoId);
    setVideoStartTime(startTime);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setVideoStartTime(0);
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedVideo === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeVideo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVideo]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Header */}
        <section className="py-16 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                  <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Our <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Videos</span>
              </h1>
              <div className="w-32 h-1.5 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 mx-auto rounded-full mb-6" />
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Watch our journey of igniting lives through education. Explore stories of hope, transformation, and empowerment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Videos Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {youtubeVideos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-muted-foreground text-lg">
                  No videos available yet. Check back soon!
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="wait">
                  {youtubeVideos.map((video, index) => {
                    const thumbnail = getThumbnail(video.videoId);
                    
                    return (
                      <motion.div
                        key={video.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group relative bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        onClick={() => openVideo(video)}
                      >
                        {/* Thumbnail */}
                        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                          <img
                            src={thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              // Fallback to a gradient if thumbnail fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                          />
                          {/* Fallback gradient */}
                          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                          
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-20 h-20 rounded-full bg-red-600/90 backdrop-blur-sm flex items-center justify-center shadow-2xl"
                            >
                              <Play className="h-10 w-10 text-white ml-1" fill="currentColor" />
                            </motion.div>
                          </div>

                          {/* Duration Badge */}
                          {video.duration && (
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-white text-xs font-medium flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {video.duration}
                            </div>
                          )}
                        </div>

                        {/* Video Info */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {video.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {video.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              <span>{video.date}</span>
                            </div>
                            <a
                              href={`https://www.youtube.com/watch?v=${video.videoId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 hover:text-primary transition-colors"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span>Watch on YouTube</span>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full bg-background rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white transition-colors backdrop-blur-sm"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Video Player */}
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={getEmbedUrl(selectedVideo.videoId, videoStartTime)}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="p-6 bg-background">
                <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
                <p className="text-muted-foreground mb-4">{selectedVideo.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedVideo.date}</span>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Watch on YouTube</span>
                  </a>
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
