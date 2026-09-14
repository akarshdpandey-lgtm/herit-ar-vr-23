import React, { useState } from 'react';
import { Camera, ExternalLink, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import { PhotoItem } from '../types';
import { getAuthenticMonumentPhoto, handleMonumentImageError } from '../utils/monumentImages';

interface PhotoGalleryProps {
  photos: PhotoItem[];
  destinationName: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, destinationName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasError, setHasError] = useState<Record<string, boolean>>({});

  if (!photos || photos.length === 0) {
    const fallbackPhoto = getAuthenticMonumentPhoto(destinationName);
    return (
      <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-stone-900 border border-stone-200">
        <img
          src={fallbackPhoto}
          alt={destinationName}
          onError={(e) => handleMonumentImageError(e, destinationName)}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-5">
          <p className="text-white font-serif font-bold text-lg">{destinationName}</p>
        </div>
      </div>
    );
  }

  const activePhoto = photos[selectedIndex] || photos[0];
  const activePhotoSrc = getAuthenticMonumentPhoto(
    activePhoto.title || destinationName,
    undefined,
    hasError[activePhoto.id] ? undefined : (activePhoto.url || activePhoto.thumbnailUrl)
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-amber-700" />
          <h3 className="font-serif text-base font-bold text-stone-900">
            Heritage Gallery ({photos.length})
          </h3>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-medium text-stone-600">
          <ShieldCheck className="h-3 w-3 text-emerald-600" />
          CC Attribution Preserved
        </span>
      </div>

      {/* Main Active Photo View */}
      <div className="relative h-[260px] sm:h-[340px] md:h-[390px] w-full overflow-hidden rounded-2xl bg-stone-900 shadow-sm group">
        <img
          src={activePhotoSrc}
          alt={activePhoto.title || destinationName}
          onError={(e) => {
            setHasError((prev) => ({ ...prev, [activePhoto.id]: true }));
            handleMonumentImageError(e, destinationName);
          }}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
        />

        {/* Caption & Attribution Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-transparent p-4 text-white">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-sm font-semibold tracking-wide text-stone-100">
                {activePhoto.title || `${destinationName} Heritage`}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-stone-300">
                <span>Photo: {activePhoto.author || 'Verified Contributor'}</span>
                <span>•</span>
                <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-mono font-medium">
                  {activePhoto.license || 'CC BY-SA'}
                </span>
              </div>
            </div>

            {activePhoto.sourceUrl && (
              <a
                href={activePhoto.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-300 hover:text-amber-200 underline"
              >
                <span>{activePhoto.source}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnails row */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {photos.map((p, idx) => {
            const thumbSrc = getAuthenticMonumentPhoto(
              p.title || destinationName,
              undefined,
              p.thumbnailUrl || p.url
            );
            return (
              <button
                key={p.id || idx}
                onClick={() => setSelectedIndex(idx)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                  selectedIndex === idx ? 'border-amber-600 ring-2 ring-amber-600/30' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={thumbSrc}
                  alt={p.title}
                  onError={(e) => {
                    handleMonumentImageError(e, destinationName);
                  }}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
