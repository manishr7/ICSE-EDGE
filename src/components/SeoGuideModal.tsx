import React from 'react';
import { X, Globe, Search, CheckCircle2, ShieldAlert, ArrowRight, ExternalLink } from 'lucide-react';

interface SeoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeoGuideModal: React.FC<SeoGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="seo-guide-title"
    >
      <div className="bg-[#faf8f5] border border-[#14213d]/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-5 sm:p-6 border-b border-[#14213d]/10 flex items-start justify-between gap-4 sticky top-0 bg-[#faf8f5] z-10">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-900 font-semibold inline-block mb-1">
              Google Discoverability & Custom Domain
            </span>
            <h2 id="seo-guide-title" className="font-serif font-bold text-xl text-[#14213d]">
              Deploying on Custom Domain & Google Search Console
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#14213d]/60 hover:text-[#14213d] hover:bg-black/5"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6 text-xs text-[#14213d]/85 leading-relaxed">
          {/* Important Notice */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl text-amber-950 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Important:</strong> Google Search indexation and ranking depend on Google’s organic crawling algorithms and content utility. No tool or engineer can guarantee specific rank placement. Follow these steps to ensure clean indexing and crawlability.
            </p>
          </div>

          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#14213d]">
              <span className="w-5 h-5 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-mono">
                1
              </span>
              <h3>Connecting a Custom Domain (e.g. icseedge.in)</h3>
            </div>
            <p>
              Purchase a domain through any ICANN registrar (Namecheap, Cloudflare Registrar, Google Domains/Squarespace, GoDaddy).
            </p>
            <div className="bg-white p-3 rounded-lg border border-[#14213d]/10 font-mono text-[11px] space-y-1">
              <p>Type: <strong>CNAME</strong> | Host: <strong>www</strong> | Value: <strong>your-hosting-cname.target</strong></p>
              <p>Type: <strong>A</strong> | Host: <strong>@</strong> | Value: <strong>Your Host IP address (or ALIAS/ANAME)</strong></p>
            </div>
            <p className="text-[11px] text-[#14213d]/70">
              Ensure SSL certificates (HTTPS) are provisioned automatically via Let's Encrypt / hosting provider.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#14213d]">
              <span className="w-5 h-5 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-mono">
                2
              </span>
              <h3>Verifying Ownership in Google Search Console</h3>
            </div>
            <p>
              Navigate to <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-teal-800 underline inline-flex items-center gap-0.5">Google Search Console <ExternalLink className="w-3 h-3" /></a> and choose <strong>Domain Property</strong>.
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Add a TXT record to your domain DNS settings (e.g., <code>google-site-verification=...</code>).</li>
              <li>Wait 2–5 minutes for DNS propagation, then click <strong>Verify</strong> in Search Console.</li>
            </ol>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#14213d]">
              <span className="w-5 h-5 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-mono">
                3
              </span>
              <h3>Submitting the XML Sitemap</h3>
            </div>
            <p>
              This website already includes a fully compliant, crawlable sitemap generated at:
            </p>
            <div className="bg-white p-2.5 rounded-lg border border-[#14213d]/10 font-mono text-[11px] text-teal-900 font-semibold">
              https://your-custom-domain.com/sitemap.xml
            </div>
            <p>
              In Google Search Console, click on <strong>Sitemaps</strong> in the left sidebar, paste <code>sitemap.xml</code> in the "Add a new sitemap" input, and click <strong>Submit</strong>. Google will queue all 10 subject routes for indexation.
            </p>
          </div>

          {/* Step 4 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#14213d]">
              <span className="w-5 h-5 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-mono">
                4
              </span>
              <h3>Built-in SEO Standards Included in this Build</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="p-2.5 bg-white rounded-lg border border-[#14213d]/10 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Structured EducationalWebSite JSON-LD data in HTML</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-[#14213d]/10 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Crawlable internal links with semantic HTML navigation</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-[#14213d]/10 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Responsive, touch-friendly mobile layout (390px to 1440px+)</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-[#14213d]/10 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>Standard robots.txt with sitemap reference link</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-[#14213d]/10 bg-[#f4f1ea] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#14213d] hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
