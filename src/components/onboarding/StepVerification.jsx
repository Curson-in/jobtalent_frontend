import '../../assets/css/employer-boarding.css';
import { isValidLinkedInCompany } from '../../utils/validators';

export default function StepVerification({ data, update, next, back }) {
  const linkedinValid = isValidLinkedInCompany(data.linkedin);

  return (
    <div className="employer-onboarding-wrapper">
      <div className="employer-onboarding-card">
        <span className="onboarding-step">Step 3 of 4</span>
        <h2>Verification</h2>

        <div className="onboarding-field">
          <label>Official Company Email</label>
          <input
            value={data.officialEmail || ''}
            onChange={(e) => update({ officialEmail: e.target.value })}
            placeholder="hr@company.com"
          />
        </div>

        <div className="onboarding-field">
          <label>LinkedIn Company Page *</label>
          <input
            value={data.linkedin || ''}
            onChange={(e) => update({ linkedin: e.target.value })}
            placeholder="https://linkedin.com/company/acme"
          />

          {!linkedinValid && data.linkedin && (
            <span className="field-error">
              Enter a valid LinkedIn company URL
            </span>
          )}
        </div>

        <div className="onboarding-field">
          <label>Company Logo (optional)</label>
          <input type="file" accept="image/*" />
        </div>

        <div className="onboarding-actions">
          <button className="onboarding-secondary-btn" onClick={back}>
            Back
          </button>
          <button
            className="onboarding-primary-btn"
            disabled={!linkedinValid}
            onClick={next}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
