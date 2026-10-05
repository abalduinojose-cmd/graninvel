import { SITE_URL, site } from "@/content/site";

/**
 * JSON-LD da marmoraria. SEM aggregateRating de propósito: avaliação do
 * próprio negócio marcada no próprio site é "self-serving" para
 * LocalBusiness e não gera rich result. A pedido do cliente o site não
 * mostra a média, só as avaliações de 5 estrelas, com link para o perfil.
 */
export function schemaNegocio() {
  const { endereco, geo } = site;
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${SITE_URL}/#graninvel`,
    name: site.nome,
    alternateName: site.nomeGoogle,
    slogan: site.slogan,
    description: site.descricao,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image.png`,
    logo: `${SITE_URL}/marca/losango.png`,
    telephone: site.whatsapp,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${endereco.rua} (${endereco.referencia})`,
      addressLocality: `${endereco.bairro}, ${endereco.cidade}`,
      addressRegion: endereco.uf,
      postalCode: endereco.cep,
      addressCountry: "BR",
    },
    geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:30", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "14:00" },
    ],
    areaServed: [
      { "@type": "City", name: "Petrópolis" },
      { "@type": "AdministrativeArea", name: "Região Serrana do Rio de Janeiro" },
    ],
    sameAs: [site.instagram, site.google],
  };
}
