"use client";

import { useState } from "react";
import { ShieldAlert, Eye } from "lucide-react";
import { getImages, getUsers, getAgeVerified, setAgeVerified } from "@/lib/store";
import type { PortfolioImage, User } from "@/lib/types";
import ImageCard from "@/components/ImageCard";

export default function NsfwPage() {
  const [verified, setVerified] = useState<boolean>(() => getAgeVerified());
  const [images] = useState<PortfolioImage[]>(() => getImages().filter((i) => i.isNsfw));
  const [users] = useState<User[]>(() => getUsers());

  const handleVerify = () => {
    setAgeVerified(true);
    setVerified(true);
  };

  if (!verified) {
    return (
      <div className="py-16 text-center space-y-6 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-danger/10">
          <ShieldAlert size={40} className="text-danger" />
        </div>
        <h1 className="text-2xl font-bold">Age Verification Required</h1>
        <p className="text-muted text-sm max-w-xs mx-auto">
          This section contains content marked as NSFW (Not Safe For Work) by
          the uploaders. You must confirm you are 18 or older to view.
        </p>
        <div className="space-y-3">
          <button
            onClick={handleVerify}
            className="w-full max-w-xs mx-auto py-3 bg-danger text-white font-semibold rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <Eye size={18} />
            I confirm I am 18 or older
          </button>
          <p className="text-xs text-muted">
            By clicking, you confirm you are of legal age in your jurisdiction
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <ShieldAlert size={24} className="text-danger" />
        <h1 className="text-2xl font-bold">NSFW Content</h1>
      </div>
      <p className="text-sm text-muted">
        Content in this section has been marked as explicit by the creators.
      </p>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {images.map((img) => {
            const owner = users.find((u) => u.id === img.userId);
            return (
              <ImageCard
                key={img.id}
                src={img.thumbnail}
                caption={img.caption}
                likes={img.likes}
                isNsfw={img.isNsfw}
                userName={owner?.name}
                userAvatar={owner?.avatar}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-muted">
          <p>No NSFW content yet</p>
        </div>
      )}
    </div>
  );
}
