// src/components/UI/ContactModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Send, Mail, Phone, MessageCircle, HelpCircle, BookOpen, Settings, Check, AlertCircle } from 'lucide-react';
import { useFormValidation } from '../../hooks/useFormValidation.js';

const ContactModal = ({ isOpen, onClose, initialInquiryType = 'general' }) => {
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // idle, submitting, success, error
  const [submissionMessage, setSubmissionMessage] = useState('');

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: MessageCircle, description: 'General questions or feedback' },
    { value: 'enrollment', label: 'Course Enrollment', icon: BookOpen, description: 'Questions about courses and enrollment' },
    { value: 'technical', label: 'Technical Support', icon: Settings, description: 'Technical issues or bugs' },
    { value: 'partnership', label: 'Partnership', icon: HelpCircle, description: 'Business partnerships and collaborations' }
  ];

  // Form validation rules
  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      requiredMessage: 'Name is required',
      minLengthMessage: 'Name must be at least 2 characters'
    },
    email: {
      required: true,
      email: true,
      requiredMessage: 'Email is required'
    },
    phone: {
      required: false,
      phone: true
    },
    inquiryType: {
      required: true,
      requiredMessage: 'Please select an inquiry type'
    },
    subject: {
      required: true,
      minLength: 5,
      requiredMessage: 'Subject is required',
      minLengthMessage: 'Subject must be at least 5 characters'
    },
    message: {
      required: true,
      minLength: 20,
      maxLength: 1000,
      requiredMessage: 'Message is required',
      minLengthMessage: 'Message must be at least 20 characters',
      maxLengthMessage: 'Message must not exceed 1000 characters'
    },
    urgency: {
      required: true,
      requiredMessage: 'Please select urgency level'
    }
  };

  // Initial form state
  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    inquiryType: initialInquiryType,
    subject: '',
    message: '',
    urgency: 'normal',
    allowMarketing: false
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValue
  } = useFormValidation(initialFormState, validationRules);

  // Load saved draft from localStorage
  useEffect(() => {
    if (isOpen) {
      const savedDraft = localStorage.getItem('contactFormDraft');
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          Object.keys(draft).forEach(key => {
            setValue(key, draft[key]);
          });
        } catch (error) {
          console.error('Error loading contact form draft:', error);
        }
      }
    }
  }, [isOpen, setValue]);

  // Save draft to localStorage
  useEffect(() => {
    if (isOpen && submissionStatus === 'idle') {
      const draftData = {
        ...values,
        timestamp: Date.now()
      };
      localStorage.setItem('contactFormDraft', JSON.stringify(draftData));
    }
  }, [values, isOpen, submissionStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateAll()) {
      setSubmissionStatus('error');
      setSubmissionMessage('Please fix the errors below and try again.');
      return;
    }

    setSubmissionStatus('submitting');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save submission to localStorage (in real app, send to backend)
      const submission = {
        ...values,
        submissionId: `CONTACT-${Date.now()}`,
        submittedAt: new Date().toISOString(),
        status: 'received'
      };

      const contactSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      contactSubmissions.push(submission);
      localStorage.setItem('contactSubmissions', JSON.stringify(contactSubmissions));

      // Clear draft
      localStorage.removeItem('contactFormDraft');

      setSubmissionStatus('success');
      setSubmissionMessage('Thank you for your message! We\'ll get back to you within 24 hours.');

      // Auto-close after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);

    } catch (error) {
      setSubmissionStatus('error');
      setSubmissionMessage('Sorry, there was an error sending your message. Please try again.');
    }
  };

  const handleClose = () => {
    if (submissionStatus === 'success') {
      reset();
      setSubmissionStatus('idle');
      setSubmissionMessage('');
    }
    onClose();
  };

  const selectedInquiryType = inquiryTypes.find(type => type.value === values.inquiryType);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Contact Us</h2>
            <p className="text-slate-300">Get in touch with our team</p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Success State */}
        {submissionStatus === 'success' ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
            <p className="text-slate-300 mb-6">{submissionMessage}</p>
            <div className="bg-slate-700 p-4 rounded-lg text-left">
              <h4 className="font-semibold text-white mb-2">What happens next?</h4>
              <ul className="space-y-1 text-slate-300 text-sm">
                <li>• You'll receive a confirmation email shortly</li>
                <li>• Our team will review your message</li>
                <li>• We'll respond within 24 hours</li>
                <li>• For urgent matters, we'll prioritize your request</li>
              </ul>
            </div>
          </div>
        ) : (
          /* Contact Form */
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Inquiry Type Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  What can we help you with? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {inquiryTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <label
                        key={type.value}
                        className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
                          values.inquiryType === type.value
                            ? 'border-purple-500 bg-purple-900/20'
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <input
                          type="radio"
                          name="inquiryType"
                          value={type.value}
                          checked={values.inquiryType === type.value}
                          onChange={(e) => handleChange('inquiryType', e.target.value)}
                          className="mr-3 mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <Icon size={16} className="mr-2 text-purple-400" />
                            <span className="font-medium text-white">{type.label}</span>
                          </div>
                          <p className="text-xs text-slate-400">{type.description}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {errors.inquiryType && touched.inquiryType && (
                  <p className="text-red-400 text-sm mt-1">{errors.inquiryType}</p>
                )}
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={values.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 ${
                      errors.name && touched.name ? 'border-red-500' : 'border-slate-600'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={values.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 ${
                      errors.email && touched.email ? 'border-red-500' : 'border-slate-600'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={values.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 ${
                    errors.phone && touched.phone ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && touched.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Subject and Urgency */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={values.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    onBlur={() => handleBlur('subject')}
                    className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 ${
                      errors.subject && touched.subject ? 'border-red-500' : 'border-slate-600'
                    }`}
                    placeholder="Brief description of your inquiry"
                  />
                  {errors.subject && touched.subject && (
                    <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Urgency *
                  </label>
                  <select
                    value={values.urgency}
                    onChange={(e) => handleChange('urgency', e.target.value)}
                    onBlur={() => handleBlur('urgency')}
                    className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white ${
                      errors.urgency && touched.urgency ? 'border-red-500' : 'border-slate-600'
                    }`}
                  >
                    <option value="">Select urgency</option>
                    <option value="low">Low - General inquiry</option>
                    <option value="normal">Normal - Standard response</option>
                    <option value="high">High - Need quick response</option>
                    <option value="urgent">Urgent - Critical issue</option>
                  </select>
                  {errors.urgency && touched.urgency && (
                    <p className="text-red-400 text-sm mt-1">{errors.urgency}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message * ({values.message.length}/1000)
                </label>
                <textarea
                  value={values.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  rows={5}
                  className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 resize-none ${
                    errors.message && touched.message ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="Please provide detailed information about your inquiry..."
                />
                {errors.message && touched.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Context-specific fields */}
              {values.inquiryType === 'enrollment' && (
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Course Enrollment Details</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Please include the following information in your message:
                  </p>
                  <ul className="space-y-1 text-slate-300 text-sm">
                    <li>• Which course(s) you're interested in</li>
                    <li>• Your programming experience level</li>
                    <li>• Preferred start date</li>
                    <li>• Any specific questions about the curriculum</li>
                  </ul>
                </div>
              )}

              {values.inquiryType === 'technical' && (
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Technical Support Information</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    To help us assist you better, please include:
                  </p>
                  <ul className="space-y-1 text-slate-300 text-sm">
                    <li>• Device/browser you're using</li>
                    <li>• Steps to reproduce the issue</li>
                    <li>• Error messages (if any)</li>
                    <li>• Screenshots (if applicable)</li>
                  </ul>
                </div>
              )}

              {values.inquiryType === 'partnership' && (
                <div className="bg-slate-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-white mb-2">Partnership Inquiry</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Please provide details about:
                  </p>
                  <ul className="space-y-1 text-slate-300 text-sm">
                    <li>• Your organization/company</li>
                    <li>• Type of partnership you're interested in</li>
                    <li>• Proposed collaboration details</li>
                    <li>• Timeline and expectations</li>
                  </ul>
                </div>
              )}

              {/* Marketing Consent */}
              <div>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={values.allowMarketing}
                    onChange={(e) => handleChange('allowMarketing', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-slate-300">
                    I'd like to receive updates about new courses, resources, and special offers.
                    You can unsubscribe at any time.
                  </span>
                </label>
              </div>

              {/* Error Message */}
              {submissionStatus === 'error' && submissionMessage && (
                <div className="bg-red-900/20 border border-red-500 rounded-lg p-3 flex items-start">
                  <AlertCircle size={20} className="text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{submissionMessage}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-900 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">
                  {selectedInquiryType && (
                    <span className="flex items-center">
                      <selectedInquiryType.icon size={16} className="mr-1" />
                      {selectedInquiryType.label}
                    </span>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submissionStatus === 'submitting'}
                    className="flex items-center bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    {submissionStatus === 'submitting' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-400 mb-2">You can also reach us directly:</p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                  <span className="flex items-center">
                    <Mail size={12} className="mr-1" />
                    support@gamedevacademy.com
                  </span>
                  <span className="flex items-center">
                    <Phone size={12} className="mr-1" />
                    +1 (555) 123-4567
                  </span>
                  <span>Response time: Usually within 24 hours</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;