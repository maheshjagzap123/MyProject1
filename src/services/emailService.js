import emailjs from '@emailjs/browser';

// ─────────────────────────────────────────────────────────
//  EmailJS Config
//  1. Sign up free at https://www.emailjs.com
//  2. Create an Email Service (Gmail / Outlook / etc.)
//  3. Create templates for each form type (see README)
//  4. Replace the values below with your real credentials
// ─────────────────────────────────────────────────────────
const SERVICE_ID  = 'YOUR_SERVICE_ID';
const PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

export const TEMPLATES = {
  modelApply:    'YOUR_TEMPLATE_MODEL_APPLY',
  designerApply: 'YOUR_TEMPLATE_DESIGNER_APPLY',
  workshopApply: 'YOUR_TEMPLATE_WORKSHOP_APPLY',
  hireModel:     'YOUR_TEMPLATE_HIRE_MODEL',
  portfolio:     'YOUR_TEMPLATE_PORTFOLIO',
  contact:       'YOUR_TEMPLATE_CONTACT',
};

export const ORG_EMAIL = 'info@fashionrunway.in';

// Generic sender — wraps emailjs.send
const send = (templateId, params) =>
  emailjs.send(SERVICE_ID, templateId, { ...params, org_email: ORG_EMAIL }, PUBLIC_KEY);

/* ── Model screening / become-a-model apply ── */
export const sendModelApplication = (data) =>
  send(TEMPLATES.modelApply, {
    applicant_name:     data.name,
    applicant_email:    data.email,
    applicant_phone:    data.phone,
    applicant_city:     data.city,
    applicant_age:      data.age,
    applicant_height:   data.height,
    model_type:         data.modelType,
    experience:         data.experience,
    applied_for:        data.appliedFor || 'Model Screening',
  });

/* ── Designer's Meet apply ── */
export const sendDesignerApplication = (data) =>
  send(TEMPLATES.designerApply, {
    applicant_name:     data.name,
    applicant_email:    data.email,
    applicant_phone:    data.phone,
    applicant_city:     data.city,
    brand_name:         data.brandName,
    specialization:     data.specialization,
    experience_years:   data.experienceYears,
    portfolio_link:     data.portfolioLink || 'Not provided',
  });

/* ── Workshop registration ── */
export const sendWorkshopRegistration = (data) =>
  send(TEMPLATES.workshopApply, {
    applicant_name:     data.name,
    applicant_email:    data.email,
    applicant_phone:    data.phone,
    applicant_city:     data.city,
    applicant_age:      data.age,
    workshop_type:      data.workshopType,
    experience_level:   data.experienceLevel,
  });

/* ── Hire a model enquiry ── */
export const sendHireModelEnquiry = (data) =>
  send(TEMPLATES.hireModel, {
    client_name:        data.name,
    client_email:       data.email,
    client_phone:       data.phone,
    company:            data.company,
    event_type:         data.eventType,
    event_date:         data.eventDate,
    event_location:     data.eventLocation,
    models_required:    data.modelsRequired,
    budget:             data.budget,
    message:            data.message,
  });

/* ── Portfolio / photoshoot enquiry ── */
export const sendPortfolioEnquiry = (data) =>
  send(TEMPLATES.portfolio, {
    client_name:        data.name,
    client_email:       data.email,
    client_phone:       data.phone,
    service_type:       data.serviceType,
    message:            data.message,
  });

/* ── Contact form ── */
export const sendContactMessage = (data) =>
  send(TEMPLATES.contact, {
    from_name:          data.name,
    from_email:         data.email,
    from_phone:         data.phone,
    subject:            data.subject,
    message:            data.message,
  });
