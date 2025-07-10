// src/components/UI/EnrollmentModal.jsx
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check, CreditCard, Calendar, User, Mail, Phone, BookOpen } from 'lucide-react';
import { courses } from '../../data/courses.js';
import { useFormValidation } from '../../hooks/useFormValidation.js';

const EnrollmentModal = ({ isOpen, onClose, preSelectedCourse = null }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Form validation rules
  const validationRules = {
    fullName: {
      required: true,
      minLength: 2,
      requiredMessage: 'Full name is required'
    },
    email: {
      required: true,
      email: true,
      requiredMessage: 'Email is required'
    },
    phone: {
      required: true,
      phone: true,
      requiredMessage: 'Phone number is required'
    },
    experience: {
      required: true,
      requiredMessage: 'Please select your experience level'
    },
    selectedCourse: {
      required: true,
      requiredMessage: 'Please select a course'
    },
    startDate: {
      required: true,
      requiredMessage: 'Please select a start date'
    },
    learningGoals: {
      required: true,
      minLength: 10,
      requiredMessage: 'Please describe your learning goals',
      minLengthMessage: 'Please provide more detail about your goals'
    },
    paymentMethod: {
      required: true,
      requiredMessage: 'Please select a payment method'
    },
    agreement: {
      required: true,
      requiredMessage: 'You must agree to the terms and conditions'
    }
  };

  // Initial form state
  const initialFormState = {
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    selectedCourse: preSelectedCourse || '',
    startDate: '',
    learningGoals: '',
    paymentMethod: '',
    agreement: false
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

  // Load saved progress from localStorage
  useEffect(() => {
    if (isOpen) {
      const savedProgress = localStorage.getItem('enrollmentProgress');
      if (savedProgress) {
        try {
          const parsed = JSON.parse(savedProgress);
          Object.keys(parsed.formData || {}).forEach(key => {
            setValue(key, parsed.formData[key]);
          });
          setCurrentStep(parsed.currentStep || 1);
        } catch (error) {
          console.error('Error loading enrollment progress:', error);
        }
      }
    }
  }, [isOpen, setValue]);

  // Save progress to localStorage
  useEffect(() => {
    if (isOpen && !submissionSuccess) {
      const progressData = {
        formData: values,
        currentStep,
        timestamp: Date.now()
      };
      localStorage.setItem('enrollmentProgress', JSON.stringify(progressData));
    }
  }, [values, currentStep, isOpen, submissionSuccess]);

  const steps = [
    {
      number: 1,
      title: 'Personal Information',
      icon: User
    },
    {
      number: 2,
      title: 'Course Selection',
      icon: BookOpen
    },
    {
      number: 3,
      title: 'Payment & Confirmation',
      icon: CreditCard
    }
  ];

  const experienceLevels = [
    { value: 'beginner', label: 'Complete Beginner' },
    { value: 'some-experience', label: 'Some Programming Experience' },
    { value: 'intermediate', label: 'Intermediate Developer' },
    { value: 'advanced', label: 'Advanced Developer' }
  ];

  const paymentMethods = [
    { value: 'credit-card', label: 'Credit Card', icon: CreditCard },
    { value: 'paypal', label: 'PayPal', icon: CreditCard },
    { value: 'bank-transfer', label: 'Bank Transfer', icon: CreditCard }
  ];

  const handleNext = () => {
    const stepFields = getStepFields(currentStep);
    const stepValid = stepFields.every(field => {
      const error = errors[field];
      return !error && values[field] && values[field] !== '';
    });

    if (stepValid || validateStepFields(stepFields)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const validateStepFields = (fields) => {
    let isValid = true;
    fields.forEach(field => {
      handleBlur(field);
      if (errors[field] || !values[field]) {
        isValid = false;
      }
    });
    return isValid;
  };

  const getStepFields = (step) => {
    switch (step) {
      case 1:
        return ['fullName', 'email', 'phone', 'experience'];
      case 2:
        return ['selectedCourse', 'startDate', 'learningGoals'];
      case 3:
        return ['paymentMethod', 'agreement'];
      default:
        return [];
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateAll()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save enrollment to localStorage
      const enrollmentData = {
        ...values,
        enrollmentId: `ENR-${Date.now()}`,
        enrollmentDate: new Date().toISOString(),
        status: 'pending'
      };
      
      const existingEnrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]');
      existingEnrollments.push(enrollmentData);
      localStorage.setItem('userEnrollments', JSON.stringify(existingEnrollments));
      
      // Clear progress
      localStorage.removeItem('enrollmentProgress');
      
      setSubmissionSuccess(true);
    } catch (error) {
      console.error('Enrollment submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submissionSuccess) {
      reset();
      setCurrentStep(1);
      setSubmissionSuccess(false);
    }
    onClose();
  };

  const selectedCourseData = courses.find(course => course.id === values.selectedCourse);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">
            {submissionSuccess ? 'Enrollment Successful!' : 'Course Enrollment'}
          </h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Success State */}
        {submissionSuccess ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Welcome to Game Dev Academy!
            </h3>
            <p className="text-slate-300 mb-6">
              Your enrollment has been submitted successfully. You'll receive a confirmation email shortly with next steps.
            </p>
            <button
              onClick={handleClose}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Get Started
            </button>
          </div>
        ) : (
          <>
            {/* Progress Steps */}
            <div className="flex items-center justify-center p-6 bg-slate-900">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number
                      ? 'bg-purple-600 border-purple-600 text-white'
                      : 'border-slate-600 text-slate-400'
                  }`}>
                    {currentStep > step.number ? (
                      <Check size={16} />
                    ) : (
                      <step.icon size={16} />
                    )}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep >= step.number ? 'text-white' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-px mx-4 ${
                      currentStep > step.number ? 'bg-purple-600' : 'bg-slate-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Form Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={values.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 ${
                        errors.fullName && touched.fullName ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && touched.fullName && (
                      <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
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
                      placeholder="Enter your email address"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Phone Number *
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

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Programming Experience *
                    </label>
                    <select
                      value={values.experience}
                      onChange={(e) => handleChange('experience', e.target.value)}
                      onBlur={() => handleBlur('experience')}
                      className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white ${
                        errors.experience && touched.experience ? 'border-red-500' : 'border-slate-600'
                      }`}
                    >
                      <option value="">Select your experience level</option>
                      {experienceLevels.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                    {errors.experience && touched.experience && (
                      <p className="text-red-400 text-sm mt-1">{errors.experience}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Course Selection */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Select Course *
                    </label>
                    <select
                      value={values.selectedCourse}
                      onChange={(e) => handleChange('selectedCourse', e.target.value)}
                      onBlur={() => handleBlur('selectedCourse')}
                      className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white ${
                        errors.selectedCourse && touched.selectedCourse ? 'border-red-500' : 'border-slate-600'
                      }`}
                    >
                      <option value="">Choose a course</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.title} - ${course.price} ({course.duration})
                        </option>
                      ))}
                    </select>
                    {errors.selectedCourse && touched.selectedCourse && (
                      <p className="text-red-400 text-sm mt-1">{errors.selectedCourse}</p>
                    )}
                  </div>

                  {selectedCourseData && (
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">{selectedCourseData.title}</h4>
                      <p className="text-slate-300 text-sm mb-2">{selectedCourseData.description}</p>
                      <div className="flex gap-4 text-sm text-slate-400">
                        <span>Duration: {selectedCourseData.duration}</span>
                        <span>Level: {selectedCourseData.level}</span>
                        <span>Price: ${selectedCourseData.price}</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Preferred Start Date *
                    </label>
                    <input
                      type="date"
                      value={values.startDate}
                      onChange={(e) => handleChange('startDate', e.target.value)}
                      onBlur={() => handleBlur('startDate')}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white ${
                        errors.startDate && touched.startDate ? 'border-red-500' : 'border-slate-600'
                      }`}
                    />
                    {errors.startDate && touched.startDate && (
                      <p className="text-red-400 text-sm mt-1">{errors.startDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Learning Goals *
                    </label>
                    <textarea
                      value={values.learningGoals}
                      onChange={(e) => handleChange('learningGoals', e.target.value)}
                      onBlur={() => handleBlur('learningGoals')}
                      rows={4}
                      className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 ${
                        errors.learningGoals && touched.learningGoals ? 'border-red-500' : 'border-slate-600'
                      }`}
                      placeholder="What do you hope to achieve with this course?"
                    />
                    {errors.learningGoals && touched.learningGoals && (
                      <p className="text-red-400 text-sm mt-1">{errors.learningGoals}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Payment & Confirmation */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Payment Method *
                    </label>
                    <div className="space-y-2">
                      {paymentMethods.map(method => (
                        <label
                          key={method.value}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                            values.paymentMethod === method.value
                              ? 'border-purple-500 bg-purple-900/20'
                              : 'border-slate-600 hover:border-slate-500'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.value}
                            checked={values.paymentMethod === method.value}
                            onChange={(e) => handleChange('paymentMethod', e.target.value)}
                            className="mr-3"
                          />
                          <method.icon size={20} className="mr-2 text-slate-400" />
                          <span className="text-white">{method.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.paymentMethod && touched.paymentMethod && (
                      <p className="text-red-400 text-sm mt-1">{errors.paymentMethod}</p>
                    )}
                  </div>

                  {selectedCourseData && (
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Order Summary</h4>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>{selectedCourseData.title}</span>
                        <span>${selectedCourseData.price}</span>
                      </div>
                      <div className="border-t border-slate-600 mt-2 pt-2 flex justify-between items-center font-semibold text-white">
                        <span>Total</span>
                        <span>${selectedCourseData.price}</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={values.agreement}
                        onChange={(e) => handleChange('agreement', e.target.checked)}
                        onBlur={() => handleBlur('agreement')}
                        className="mt-1"
                      />
                      <span className="text-sm text-slate-300">
                        I agree to the{' '}
                        <a href="#" className="text-purple-400 hover:underline">
                          Terms and Conditions
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-purple-400 hover:underline">
                          Privacy Policy
                        </a>
                        *
                      </span>
                    </label>
                    {errors.agreement && touched.agreement && (
                      <p className="text-red-400 text-sm mt-1">{errors.agreement}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 bg-slate-900 border-t border-slate-700">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  currentStep === 1
                    ? 'text-slate-500 cursor-not-allowed'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <ChevronLeft size={20} className="mr-1" />
                Previous
              </button>

              <span className="text-slate-400 text-sm">
                Step {currentStep} of {steps.length}
              </span>

              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Next
                  <ChevronRight size={20} className="ml-1" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {isSubmitting ? 'Processing...' : 'Complete Enrollment'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EnrollmentModal;