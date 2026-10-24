/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_HANDLER?: string;
  readonly VITE_FORMSPREE_FORM_ID?: string;
  readonly VITE_CONTACT_ENDPOINT?: string;
  /** Set on Netlify deploy-preview / branch-deploy — injects robots noindex. */
  readonly VITE_SITE_NOINDEX?: string;
  /** Legacy preview flag (also triggers noindex + legal preview behaviour). */
  readonly VITE_LEGAL_PREVIEW?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
