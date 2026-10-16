import test from 'node:test';
import assert from 'node:assert/strict';
import { getRouteMetadata, PRODUCTION_ORIGIN, getCanonicalUrl } from './seo.ts';
import { ICSE_SUBJECTS } from '../data/subjects.ts';

test('PRODUCTION_ORIGIN is configured to https://icse-edge-official.ai.studio', () => {
  assert.equal(PRODUCTION_ORIGIN, 'https://icse-edge-official.ai.studio');
});

test('getCanonicalUrl formats URLs with production origin', () => {
  assert.equal(getCanonicalUrl('/'), 'https://icse-edge-official.ai.studio/');
  assert.equal(getCanonicalUrl(''), 'https://icse-edge-official.ai.studio/');
  assert.equal(getCanonicalUrl('/strategies'), 'https://icse-edge-official.ai.studio/strategies');
  assert.equal(getCanonicalUrl('/strategies/'), 'https://icse-edge-official.ai.studio/strategies');
  assert.equal(getCanonicalUrl('/papers?year=2024'), 'https://icse-edge-official.ai.studio/papers');
  assert.equal(getCanonicalUrl('/strategies/physics'), 'https://icse-edge-official.ai.studio/strategies/physics');
});

test('getRouteMetadata returns valid metadata for core public routes', () => {
  const routes = ['/', '/strategies', '/papers', '/how-to-write', '/tips', '/progress'];
  for (const route of routes) {
    const meta = getRouteMetadata(route);
    assert.ok(meta.title, `Missing title for ${route}`);
    assert.ok(meta.description, `Missing description for ${route}`);
    assert.ok(meta.title.includes('ICSE'), `Title should mention ICSE for ${route}`);
    assert.ok(meta.description.length >= 50, `Description should be descriptive for ${route}`);
  }
});

test('getRouteMetadata returns valid metadata for all 10 subject strategy routes', () => {
  for (const subject of ICSE_SUBJECTS) {
    const route = `/strategies/${subject.id}`;
    const meta = getRouteMetadata(route);
    assert.ok(meta.title, `Missing title for ${route}`);
    assert.ok(meta.description, `Missing description for ${route}`);
    assert.ok(meta.title.includes(subject.name), `Title should include subject name for ${route}`);
  }
});

test('getRouteMetadata fallback to home metadata for unknown routes', () => {
  const meta = getRouteMetadata('/unknown-path');
  assert.ok(meta.title.includes('ICSE Edge'));
});
