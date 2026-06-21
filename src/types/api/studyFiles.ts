import type { ApiDate, Guid } from "@/types/api/common";
import type { FileOwnerType, FileType } from "@/types/api/enums";

export type StudyFileDto = {
  id: Guid;
  fileName: string | null;
  blobName: string | null;
  fileType: FileType;
  contentType: string | null;
  fileSize: number;
  altText: string | null;
  ownerType: FileOwnerType;
  ownerId: Guid | null;
  uploadedById: Guid;
  uploadedByName: string | null;
  createdAt: ApiDate;
  updatedAt: ApiDate | null;
};