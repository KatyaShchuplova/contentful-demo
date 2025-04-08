import { EntrySkeletonType, EntryFieldTypes } from "contentful";
//   import { Document } from '@contentful/rich-text-types';

// Модель "hero"
export interface HeroFields {
  title: EntryFieldTypes.Text;
  subtitle: EntryFieldTypes.Text;
  image: EntryFieldTypes.AssetLink;
}
export type HeroEntry = EntrySkeletonType<HeroFields, "hero">;

// Модель "richTextSection"
export interface RichTextSectionFields {
  content: EntryFieldTypes.RichText;
}
export type RichTextSectionEntry = EntrySkeletonType<
  RichTextSectionFields,
  "richTextSection"
>;

// Модель "page"
export interface PageFields {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  hero: EntryFieldTypes.EntryLink<HeroEntry>;
  sections: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<RichTextSectionEntry>
  >;
}
export type PageEntry = EntrySkeletonType<PageFields, "page">;
