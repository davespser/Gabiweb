import { useState } from 'react';
import { Heart, Camera, X, ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface Photo {
  id: string;
  url: string;
  caption: string;
  date: string;
  location?: string;
}

interface GallerySectionProps {
  photos: Photo[];
}

export function GallerySection({ photos }: GallerySectionProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openPhoto = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') closePhoto();
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-love-purple/10 px-4 py-2 rounded-full mb-4">
            <Camera className="text-love-purple" size={18} />
            <span className="text-love-purple font-medium text-sm">Nuestros Recuerdos</span>
          </div>
          <h2 className="font-script text-4xl md:text-5xl text-gray-800 mb-3">
            Galería de Amor
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Cada foto cuenta una historia de nuestro amor
          </p>
        </div>

        {/* Photo Grid */}
        {photos.length === 0 ? (
          <div className="text-center py-16 bg-love-cream/50 rounded-3xl">
            <div className="w-20 h-20 rounded-full bg-love-purple/10 flex items-center justify-center mx-auto mb-4">
              <Camera className="text-love-purple" size={32} />
            </div>
            <p className="text-gray-500 mb-2">Aún no hay fotos</p>
            <p className="text-gray-400 text-sm">¡Agrega tus momentos favoritos juntos!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => openPhoto(photo, index)}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-soft hover:shadow-love transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium text-sm line-clamp-2">{photo.caption}</p>
                    <div className="flex items-center gap-2 mt-2 text-white/70 text-xs">
                      <Calendar size={12} />
                      <span>{photo.date}</span>
                    </div>
                  </div>
                </div>

                {/* Heart decoration */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="text-love-pink fill-love-pink" size={20} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Photo Dialog */}
        <Dialog open={!!selectedPhoto} onOpenChange={closePhoto}>
          <DialogContent 
            className="max-w-4xl p-0 bg-transparent border-0 overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            {selectedPhoto && (
              <div className="relative bg-black/90 rounded-2xl overflow-hidden">
                {/* Close button */}
                <button
                  onClick={closePhoto}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Navigation buttons */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Image */}
                <div className="flex items-center justify-center min-h-[300px] max-h-[70vh]">
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.caption}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                </div>

                {/* Info bar */}
                <div className="bg-white p-4">
                  <p className="text-gray-800 font-medium text-lg">{selectedPhoto.caption}</p>
                  <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{selectedPhoto.date}</span>
                    </div>
                    {selectedPhoto.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{selectedPhoto.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Photo counter */}
                {photos.length > 1 && (
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentIndex + 1} / {photos.length}
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add photo hint */}
        {photos.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Haz clic en cualquier foto para verla en tamaño completo
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
