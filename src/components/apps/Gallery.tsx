import { useState } from 'react';

export default function Gallery() {
  // We have img1.avif to img12.avif inside the public/gallery directory
  const images = Array.from({ length: 12 }, (_, i) => `/gallery/img${i + 1}.avif`);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div style={{ padding: 16, height: '100%', overflowY: 'auto' }}>
      {selectedImage ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <button 
            onClick={() => setSelectedImage(null)}
            style={{ 
              alignSelf: 'flex-start', 
              marginBottom: 16, 
              background: 'var(--color-title-bar)', 
              border: '1.5px solid var(--color-border-light)', 
              color: 'white', 
              padding: '6px 16px', 
              cursor: 'pointer', 
              fontFamily: 'inherit' 
            }}
          >
            ← Back to Gallery
          </button>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <img 
              src={selectedImage} 
              alt="Fullscreen view" 
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', border: '2px solid var(--color-border-light)' }} 
            />
          </div>
        </div>
      ) : (
        <>
          <h2 style={{ color: 'var(--color-phosphor-green)', marginBottom: 16 }}>Image Gallery</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 16 }}>
            {images.map((img) => (
              <div 
                key={img} 
                onClick={() => setSelectedImage(img)}
                style={{ 
                  padding: 4, 
                  background: 'var(--color-card-bg)', 
                  border: '1.5px solid var(--color-border-light)', 
                  cursor: 'pointer', 
                  aspectRatio: '1/1', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  overflow: 'hidden' 
                }}
                className="project-card"
              >
                <img 
                  src={img} 
                  alt="Gallery thumbnail" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  loading="lazy" 
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
