import { useState } from "react";
import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import { PlayIcon } from "@/components/film/FilmIcons";
import PageHeroReel from "@/components/film/PageHeroReel";
import { SEO } from "@/components/SEO";
import { useReel } from "@/contexts/ReelContext";
import { site } from "@/data/site";
import { publicAsset } from "@/lib/publicAsset";

const page = site.commercialPage;
const reel = page.showreel;
const PREVIEW_COUNT = 3;

type SelectedItem = (typeof page.selectedWork)[number];

function playSelected(
  item: SelectedItem,
  openReel: ReturnType<typeof useReel>["openReel"],
) {
  const label = `${item.title} — ${item.client}`;
  if ("youtubeId" in item && item.youtubeId) {
    openReel({ provider: "youtube", id: item.youtubeId }, label);
    return;
  }
  openReel("vimeoId" in item ? item.vimeoId : null, label);
}

export default function CommercialPage() {
  const { openReel } = useReel();
  const [moreOpen, setMoreOpen] = useState(false);
  const hasMore = page.selectedWork.length > PREVIEW_COUNT;

  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        url={`${site.canonical}/client-work/`}
      />
      <div className="work-page page-with-hero-reel">
        <PageHeroReel titleId="client-work-heading" reel={reel}>
          <div className="page-title-row">
            <h1 id="client-work-heading">{page.name}</h1>
          </div>
          <p className="studio-page-hero__lead">{page.heroLead}</p>
        </PageHeroReel>

        <section
          className="studio-section studio-section--selected-work studio-section--selected-work-compact"
          aria-label={page.selectedWorkHeading}
        >
          <ul
            id="client-selected-work-grid"
            className="client-selected-grid client-selected-grid--flush"
            aria-label={page.selectedWorkHeading}
          >
            {page.selectedWork.map((item, index) => {
              const collapsed = hasMore && !moreOpen && index >= PREVIEW_COUNT;
              return (
                <li
                  key={item.id}
                  className={
                    collapsed
                      ? "client-selected-card client-selected-card--collapsed"
                      : "client-selected-card"
                  }
                  hidden={collapsed}
                >
                  <button
                    type="button"
                    className="client-selected-card__button"
                    aria-label={`Play ${item.title} — ${item.client}`}
                    style={{ animationDelay: `${index * 40}ms` }}
                    onClick={() => playSelected(item, openReel)}
                    tabIndex={collapsed ? -1 : undefined}
                  >
                    <span className="client-selected-card__media">
                      <img
                        className="client-selected-card__poster"
                        src={publicAsset(item.poster)}
                        alt=""
                        width={1280}
                        height={720}
                        loading={index < PREVIEW_COUNT ? "eager" : "lazy"}
                        decoding="async"
                      />
                      <span className="client-selected-card__play" aria-hidden="true">
                        <span className="client-selected-card__play-circle">
                          <PlayIcon />
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {hasMore && !moreOpen ? (
            <div className="client-selected-more">
              <button
                type="button"
                className="film-cta client-selected-more__cta"
                aria-expanded={false}
                aria-controls="client-selected-work-grid"
                onClick={() => setMoreOpen(true)}
              >
                {page.selectedWorkMore}
              </button>
            </div>
          ) : null}
        </section>

        <section className="studio-section studio-section--tint" aria-labelledby="what-we-make-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="what-we-make-heading" className="studio-section-heading">
                  {page.whatWeMakeHeading}
                </h2>
              </div>
              <div className="studio-section__body client-make">
                <p className="client-make__line">
                  <span className="client-make__label">Formats</span>
                  {page.formats.join(" · ")}
                </p>
                <p className="client-make__line client-make__line--secondary">
                  <span className="client-make__label">Techniques</span>
                  {page.techniques.join(" · ")}
                </p>
              </div>
            </div>
          </FilmReveal>
        </section>

        <section className="studio-section" aria-labelledby="ways-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="ways-heading" className="studio-section-heading">
                  {page.waysHeading}
                </h2>
              </div>
            </div>
          </FilmReveal>
          <ul className="studio-how-steps studio-how-steps--3 studio-section__full" aria-label="Ways to work">
            {page.ways.map((way) => (
              <li key={way.title} className="studio-how-steps__item">
                <h3 className="studio-models__title">{way.title}</h3>
                <p className="studio-models__text">{way.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="studio-section studio-section--tint" aria-labelledby="clients-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="clients-heading" className="studio-section-heading">
                  {page.clientsHeading}
                </h2>
              </div>
              <div className="studio-section__body">
                <div className="client-group">
                  <h3 className="client-group__heading">Brands</h3>
                  <div className="client-names" aria-label="Selected brands">
                    {site.trustedBy.brands.map((brand) => (
                      <span key={brand}>{brand}</span>
                    ))}
                  </div>
                </div>
                <div className="client-group">
                  <h3 className="client-group__heading">Agencies</h3>
                  <div className="client-names" aria-label="Selected agencies">
                    {site.trustedBy.agencies.map((agency) => (
                      <span key={agency}>{agency}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FilmReveal>
        </section>

        <FilmReveal>
          <FilmContactSection
            heading={site.homeContact.heading}
            defaultProjectType={page.defaultProjectType}
          />
        </FilmReveal>
      </div>
    </>
  );
}
