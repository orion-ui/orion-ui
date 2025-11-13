import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockLangData = {
  en: { greeting: 'Hello' },
  fr: { greeting: 'Bonjour' },
};

vi.mock('lib', () => ({
  Log: {
    warn: vi.fn(),
  },
}));

vi.mock('lang', () => ({
  default: mockLangData,
  LangAvailable: ['en', 'fr'],
}));

describe('useLang service', async () => {
  const { default: useLang, getAppLang, setAppLang } = await import('../../../../services/LangService');
  const { Log } = await import('lib');

  beforeEach(() => {
    vi.clearAllMocks();
    setAppLang('en');
  });

  it('getAppLang doit retourner la langue par défaut "en" initialement', () => {
    expect(getAppLang()).toBe('en');
  });

  it('useLang doit retourner l\'objet de traduction anglais par défaut', () => {
    expect(useLang()).toEqual(mockLangData.en);
  });

  it('setAppLang doit mettre à jour correctement la langue de l\'application', () => {
    setAppLang('fr');
    expect(getAppLang()).toBe('fr');
    expect(useLang()).toEqual(mockLangData.fr);
  });

  it('setAppLang doit revenir à "en" par défaut lorsqu\'une langue inconnue est fournie', () => {
    setAppLang('fr');
    expect(getAppLang()).toBe('fr');

    setAppLang('es' as any);
    expect(getAppLang()).toBe('en');
    expect(useLang()).toEqual(mockLangData.en);
  });

  it('setAppLang doit appeler Log.warn lorsqu\'une langue inconnue est fournie', () => {
    setAppLang('de' as any);
    expect(Log.warn).toHaveBeenCalledOnce();
    expect(Log.warn).toHaveBeenCalledWith(
      'Unknown language, using `en` by default',
      'Orion Config',
    );
  });

  it('setAppLang ne doit pas appeler Log.warn pour une langue connue', () => {
    setAppLang('fr');
    expect(Log.warn).not.toHaveBeenCalled();
  });
});