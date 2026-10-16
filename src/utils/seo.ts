import { ICSE_SUBJECTS } from '../data/subjects.ts';

export interface RouteMetadata {
  title: string;
  description: string;
}

const ROUTE_SEO_MAP: Record<string, RouteMetadata> = {
  '/': {
    title: 'ICSE Edge — Class 10 Study Strategy, Question Papers & Answer Writing',
    description:
      'Master ICSE Class 10 board exams with subject-wise preparation strategies, verified previous-year papers (2022-2025), answer-writing presentation rules, and revision checklists.',
  },
  '/strategies': {
    title: 'ICSE Class 10 Subject Strategies & Blueprints | ICSE Edge',
    description:
      'Detailed subject blueprints and study strategies for all 10 ICSE Class 10 subjects. Master time division, syllabus prioritization, and high-yield recurring topics.',
  },
  '/papers': {
    title: 'ICSE Class 10 Previous Year Question Papers Bank | ICSE Edge',
    description:
      'Download and practice authentic ICSE Class 10 past question papers from 2022 to 2025. Verified CISCE board papers, specimen solutions, and timed mock tests.',
  },
  '/how-to-write': {
    title: 'How to Write ICSE Board Exam Papers — 7 Presentation Rules | ICSE Edge',
    description:
      'Discover the 7 golden rules of ICSE board exam answer sheet presentation. Learn margin layouts, what to underline, pencil diagrams, and examiner psychology.',
  },
  '/tips': {
    title: 'ICSE Class 10 Study Tips, Hall Clock Strategy & Revision | ICSE Edge',
    description:
      'Actionable ICSE Class 10 study tips: reading time utilization, time-division per mark, avoiding common examiner red flags, and daily high-yield tips.',
  },
  '/progress': {
    title: 'ICSE Study Tracker — Mock Test Scores & Revision Checklist | ICSE Edge',
    description:
      'Track your ICSE Class 10 board preparation locally without login. Monitor completed past papers, record mock test percentages, and complete chapter checklists.',
  },
};

// Build subject-specific SEO metadata dynamically from ICSE_SUBJECTS
ICSE_SUBJECTS.forEach((sub) => {
  ROUTE_SEO_MAP[`/strategies/${sub.id}`] = {
    title: `${sub.name} (${sub.paperCode}) Strategy & Blueprint — ICSE Class 10 | ICSE Edge`,
    description: `Complete ICSE Class 10 ${sub.name} preparation guide: ${sub.tagline} Exam duration ${sub.duration}, ${sub.marks} marks blueprint, topic checklists, and past papers.`,
  };
});

/**
 * Returns SEO metadata for a given path
 */
export function getRouteMetadata(path: string): RouteMetadata {
  if (ROUTE_SEO_MAP[path]) {
    return ROUTE_SEO_MAP[path];
  }

  // Handle trailing slash or query params
  const cleanPath = path.split('?')[0].replace(/\/$/, '') || '/';
  if (ROUTE_SEO_MAP[cleanPath]) {
    return ROUTE_SEO_MAP[cleanPath];
  }

  // Check if it's a sub-route of strategies
  if (cleanPath.startsWith('/strategies/')) {
    const subId = cleanPath.replace('/strategies/', '');
    const subject = ICSE_SUBJECTS.find((s) => s.id === subId);
    if (subject) {
      return {
        title: `${subject.name} (${subject.paperCode}) Strategy — ICSE Class 10 | ICSE Edge`,
        description: `Preparation blueprint and answer writing rules for ICSE Class 10 ${subject.name}. ${subject.overview.slice(0, 140)}...`,
      };
    }
  }

  // Fallback to homepage SEO
  return ROUTE_SEO_MAP['/'];
}

/**
 * Updates document head metadata dynamically for the given route
 */
export function applyRouteSeo(path: string): void {
  if (typeof document === 'undefined') return;

  const metadata = getRouteMetadata(path);
  const cleanPath = path === '' ? '/' : path;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const canonicalUrl = `${origin}${cleanPath === '/' ? '' : cleanPath}`;

  // 1. Title
  document.title = metadata.title;

  // 2. Helper to set or create meta tag
  const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
    let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attributeName, attributeValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // Standard Meta Description
  setMetaTag('name', 'description', metadata.description);

  // Open Graph
  setMetaTag('property', 'og:title', metadata.title);
  setMetaTag('property', 'og:description', metadata.description);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:site_name', 'ICSE Edge');

  // Twitter Cards
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', metadata.title);
  setMetaTag('name', 'twitter:description', metadata.description);
  setMetaTag('name', 'twitter:url', canonicalUrl);

  // Canonical Link Tag
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);
}
