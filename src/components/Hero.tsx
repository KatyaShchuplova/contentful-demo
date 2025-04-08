/* eslint-disable @typescript-eslint/no-explicit-any */
export function Hero({ title, subtitle, image }: any) {
  return (
    <section className="p-8">
      <h1 className="text-4xl">{title}</h1>
      <p className="text-xl text-gray-600">{subtitle}</p>
      <img src={image?.fields?.file?.url} alt={title} className="mt-4" />
    </section>
  );
}
