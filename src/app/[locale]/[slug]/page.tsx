import { notFound } from "next/navigation";
import { contentfulClient } from "@/lib/contentful";
import { PageEntry, HeroEntry, RichTextSectionEntry } from "@/types/contentful";
import { Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

// type PageProps = {
//   params: {
//     locale: string;
//     slug: string;
//   };
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const { locale, slug } = params;

  const res = await contentfulClient.getEntries<PageEntry>({
    content_type: "page",
    "fields.slug": slug,
    locale,
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

      {hero?.fields?.title && (
        <section className="mt-8">
          <h2>{hero.fields.title as string}</h2>
          <p>{hero.fields.subtitle as string}</p>
        </section>
      )}

      {sections.map((section, i) => (
        <section key={i} className="mt-6 prose max-w-none">
          {documentToReactComponents(section.fields.content as Document)}
        </section>
      ))}
    </main>
  );
}
