export const isValidWebsite = (url) => {
  if (!url) return false;

  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return (
      parsed.protocol === 'http:' ||
      parsed.protocol === 'https:'
    ) && parsed.hostname.includes('.');
  } catch {
    return false;
  }
};

export const isValidLinkedInCompany = (url) => {
  if (!url) return false;

  return /^https?:\/\/(www\.)?linkedin\.com\/company\/[a-zA-Z0-9\-]+\/?$/.test(
    url.trim()
  );
};

export const isValidEmailDomain = (email, website) => {
  if (!email || !website) return false;

  try {
    const emailDomain = email.split('@')[1].toLowerCase();

    const siteHost = new URL(
      website.startsWith('http') ? website : `https://${website}`
    ).hostname.toLowerCase();

    // helper to extract root domain (company.com from hr.company.com)
    const getRootDomain = (domain) =>
      domain.replace('www.', '').split('.').slice(-2).join('.');

    const emailRoot = getRootDomain(emailDomain);
    const siteRoot = getRootDomain(siteHost);

    // allow common business email providers
    const allowedProviders = [
      'gmail.com',
      'googlemail.com',
      'outlook.com',
      'hotmail.com',
      'yahoo.com',
      'zoho.com'
    ];

    // ✅ same company root domain
    if (emailRoot === siteRoot) return true;

    // ✅ trusted business providers
    if (allowedProviders.includes(emailDomain)) return true;

    return false;
  } catch {
    return false;
  }
};

