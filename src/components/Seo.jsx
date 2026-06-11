import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://kungabasics.com";
const DEFAULT_DESCRIPTION =
  "Kunga Basics helps parents and caregivers support children with Autism, Speech Delay, ADHD, Down Syndrome, Cerebral Palsy, and other developmental challenges through guided daily routines, expert video modules, and Ask Dr. Gad.";
const DEFAULT_IMAGE = `${SITE_URL}/images/img-01.png`;

/**
 * Per-page <title> + meta description, canonical URL, and Open Graph /
 * Twitter Card tags. Pass the full title (including the "Kunga Basics"
 * branding) — pages don't share a generic suffix so each one can target its
 * own keyword cluster.
 */
export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = "website",
  jsonLd,
}) {
  const { pathname } = useLocation();
  const url = `${SITE_URL}${pathname === "/" ? "" : pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Kunga Basics" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

export { SITE_URL };
