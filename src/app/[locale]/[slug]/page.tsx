import { contentfulClient } from "@/lib/contentful";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Entry } from "contentful";

import { Document } from '@contentful/rich-text-types';

import { PageEntry, HeroEntry, RichTextSectionEntry } from "@/types/contentful";

export async function generateStaticParams() {
  const res = await contentfulClient.getEntries<PageEntry>({
    content_type: "page",
  });

  return res.items.map((item) => ({
    locale: item.sys.locale,
    slug: item.fields.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const res = await contentfulClient.getEntries<PageEntry>({
    content_type: "page",
    "fields.slug": params.slug,
    locale: params.locale,
    include: 2,
  });

  const page = res.items[0];

  if (!page) return notFound();

  const hero = page.fields.hero as Entry<HeroEntry>;
  const sections = (page.fields.sections ||
    []) as Entry<RichTextSectionEntry>[];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{page.fields.title}</h1>

      {/* Hero Section */}
      {hero?.fields?.title && (
        <section className="mt-8">
          <h2 className="text-2xl">{hero.fields.title as string}</h2>
          <p className="text-lg">{hero.fields.subtitle as string}</p>
          {/* <img
            src={`https:${hero.fields.image.fields.file.url}`}
            alt={hero.fields.title}
            className="mt-4"
          /> */}
        </section>
      )}

      {/* Rich Text Sections */}
      {sections.map((section, i) => (
  <section key={i} className="mt-6 prose max-w-none">
    {documentToReactComponents(section.fields.content as Document)}
  </section>
))}
    </main>
  );
}
