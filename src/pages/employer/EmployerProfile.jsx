import { useEffect, useState } from 'react';
import {
  getEmployerProfile,
  updateEmployerProfile
} from '../../services/employerService';
import '../../assets/css/employerprofile.css';

export default function EmployerProfile() {
  const [company, setCompany] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const res = await getEmployerProfile();
    setCompany(res.data);
    setForm(res.data);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const uploadLogo = async () => {
    if (!logoFile) return form.logo_url;

    const data = new FormData();
    data.append('file', logoFile);

    const res = await fetch('/api/upload/logo', {
      method: 'POST',
      body: data
    });

    const json = await res.json();
    return json.url;
  };

  const handleSave = async () => {
    let logoUrl = form.logo_url;

    if (logoFile) {
      logoUrl = await uploadLogo();
    }

    await updateEmployerProfile({
      ...form,
      logo_url: logoUrl
    });

    setEditing(false);
    setLogoFile(null);
    loadProfile();
  };

  if (loading) return <div className="profile-shell">Loading…</div>;
  if (!company) return <div className="profile-shell">No profile found</div>;

  return (
    <div className="profile-shell">
      <div className="profile-card">

        {/* HEADER */}
        <div className="profile-header-card">
          <div className="profile-header-left">

            <div className="profile-logo">
              {company.logo_url ? (
                <img src={company.logo_url} alt={company.name} />
              ) : (
                <span>{company.name?.[0]?.toUpperCase()}</span>
              )}
            </div>

            <div>
              {editing ? (
                <>
                  <input
                    className="profile-title-input"
                    name="name"
                    value={form.name || ''}
                    onChange={handleChange}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="logo-input"
                  />
                </>
              ) : (
                <h2>{company.name || 'Unnamed Company'}</h2>
              )}
            </div>
          </div>

          <button className="edit-btn" onClick={() => setEditing(!editing)}>
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* DETAILS */}
        <div className="profile-section">
          <div className="profile-grid">
            <Field label="Company Website" hint="Public website" editing={editing}
              name="website" value={editing ? form.website : company.website}
              onChange={handleChange} />

            <Field label="Industry" hint="E.g. SaaS, Fintech" editing={editing}
              name="industry" value={editing ? form.industry : company.industry}
              onChange={handleChange} />

            <Field label="Company Size" hint="Team size" editing={editing}
              name="company_size" value={editing ? form.company_size : company.company_size}
              onChange={handleChange} />

            <Field label="Location" hint="HQ / Office" editing={editing}
              name="location" value={editing ? form.location : company.location}
              onChange={handleChange} />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="profile-section">
          <label>Description</label>
          <p className="hint">Visible to candidates</p>

          {editing ? (
            <textarea
              rows={5}
              name="description"
              value={form.description || ''}
              onChange={handleChange}
              placeholder="Tell candidates what your company does…"
            />
          ) : (
            <p className="description-text multiline">
              {company.description || 'No description provided'}
            </p>
          )}
        </div>

        {editing && (
          <div className="profile-actions">
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, hint, editing, value, name, placeholder, onChange }) {
  const isWebsite = name === 'website';

  return (
    <div className="field">
      <label>{label}</label>
      <span className="hint">{hint}</span>

      {editing ? (
        <input
          name={name}
          placeholder={placeholder}
          value={value || ''}
          onChange={onChange}
        />
      ) : isWebsite && value ? (
        <a
          href={value.startsWith('http') ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="company-link"
        >
          {value}
        </a>
      ) : (
        <p>{value || '—'}</p>
      )}
    </div>
  );
}

