// src/components/UI/ResourceDownload.jsx
import React, { useState, useEffect } from 'react';
import { X, Download, Search, Filter, FileText, Archive, Image, Music, Crown, Mail, Check, Eye, Calendar } from 'lucide-react';
import { downloadableResources, resourceCategories, resourceTypes } from '../../data/resources.js';
import { useFormValidation } from '../../hooks/useFormValidation.js';

const ResourceDownload = ({ isOpen, onClose }) => {
  const [selectedResource, setSelectedResource] = useState(null);
  const [filteredResources, setFilteredResources] = useState(downloadableResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'All Categories',
    type: 'All Types',
    showPremiumOnly: false
  });
  const [downloadCounts, setDownloadCounts] = useState({});
  const [userDownloads, setUserDownloads] = useState(new Set());
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [downloadingResource, setDownloadingResource] = useState(null);

  // Email form validation
  const emailValidation = {
    email: {
      required: true,
      email: true,
      requiredMessage: 'Email is required for download'
    },
    allowMarketing: {
      required: false
    }
  };

  const {
    values: emailValues,
    errors: emailErrors,
    touched: emailTouched,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
    validateAll: validateEmail,
    reset: resetEmailForm
  } = useFormValidation({ email: '', allowMarketing: false }, emailValidation);

  // Load data from localStorage
  useEffect(() => {
    const savedDownloadCounts = localStorage.getItem('resourceDownloadCounts');
    if (savedDownloadCounts) {
      try {
        setDownloadCounts(JSON.parse(savedDownloadCounts));
      } catch (error) {
        console.error('Error loading download counts:', error);
      }
    }

    const savedUserDownloads = localStorage.getItem('userResourceDownloads');
    if (savedUserDownloads) {
      try {
        setUserDownloads(new Set(JSON.parse(savedUserDownloads)));
      } catch (error) {
        console.error('Error loading user downloads:', error);
      }
    }
  }, []);

  // Filter resources
  useEffect(() => {
    let filtered = downloadableResources;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(resource => resource.category === filters.category);
    }

    // Type filter
    if (filters.type !== 'All Types') {
      filtered = filtered.filter(resource => resource.type === filters.type);
    }

    // Premium filter
    if (filters.showPremiumOnly) {
      filtered = filtered.filter(resource => resource.isPremium);
    }

    setFilteredResources(filtered);
  }, [searchTerm, filters]);

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return FileText;
      case 'zip':
        return Archive;
      case 'psd':
        return Image;
      case 'docx':
        return FileText;
      default:
        return FileText;
    }
  };

  const handleDownloadClick = (resource) => {
    setDownloadingResource(resource);

    // Check if premium resource and user needs email gate
    if (resource.isPremium && !userDownloads.has(resource.id)) {
      setSelectedResource(resource);
      setShowEmailGate(true);
    } else {
      initiateDownload(resource);
    }
  };

  const handleEmailSubmit = async () => {
    if (!validateEmail()) return;

    try {
      // Simulate API call to save email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save email to localStorage (in real app, send to backend)
      const emailSubmissions = JSON.parse(localStorage.getItem('emailSubmissions') || '[]');
      emailSubmissions.push({
        email: emailValues.email,
        allowMarketing: emailValues.allowMarketing,
        resourceId: selectedResource.id,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('emailSubmissions', JSON.stringify(emailSubmissions));

      setShowEmailGate(false);
      initiateDownload(selectedResource);
      resetEmailForm();
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  const initiateDownload = (resource) => {
    // Update download count
    const newCounts = {
      ...downloadCounts,
      [resource.id]: (downloadCounts[resource.id] || 0) + 1
    };
    setDownloadCounts(newCounts);
    localStorage.setItem('resourceDownloadCounts', JSON.stringify(newCounts));

    // Add to user downloads
    const newUserDownloads = new Set([...userDownloads, resource.id]);
    setUserDownloads(newUserDownloads);
    localStorage.setItem('userResourceDownloads', JSON.stringify([...newUserDownloads]));

    // Save download history
    const downloadHistory = JSON.parse(localStorage.getItem('userDownloadHistory') || '[]');
    downloadHistory.push({
      resourceId: resource.id,
      title: resource.title,
      downloadedAt: new Date().toISOString()
    });
    localStorage.setItem('userDownloadHistory', JSON.stringify(downloadHistory));

    // Simulate download (in real app, this would trigger actual file download)
    const link = document.createElement('a');
    link.href = resource.downloadUrl;
    link.download = `${resource.title}.${resource.type.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadingResource(null);
    setSelectedResource(null);
  };

  const clearFilters = () => {
    setFilters({
      category: 'All Categories',
      type: 'All Types',
      showPremiumOnly: false
    });
    setSearchTerm('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Email Gate Modal */}
        {showEmailGate && selectedResource && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-slate-700 rounded-lg p-6 max-w-md w-full mx-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Premium Resource</h3>
                <p className="text-slate-300">
                  Enter your email to download: <strong>{selectedResource.title}</strong>
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={emailValues.email}
                    onChange={(e) => handleEmailChange('email', e.target.value)}
                    onBlur={() => handleEmailBlur('email')}
                    className={`w-full px-3 py-2 bg-slate-600 border rounded-lg text-white placeholder-slate-400 ${
                      emailErrors.email && emailTouched.email ? 'border-red-500' : 'border-slate-500'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {emailErrors.email && emailTouched.email && (
                    <p className="text-red-400 text-sm mt-1">{emailErrors.email}</p>
                  )}
                </div>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailValues.allowMarketing}
                    onChange={(e) => handleEmailChange('allowMarketing', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-slate-300">
                    I'd like to receive updates about new resources and courses
                  </span>
                </label>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => {
                      setShowEmailGate(false);
                      setSelectedResource(null);
                      resetEmailForm();
                    }}
                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEmailSubmit}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Download Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">Resource Library</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Filters and Search */}
          <div className="p-6 border-b border-slate-700 bg-slate-900">
            <div className="flex flex-wrap gap-4 items-center mb-4">
              {/* Search */}
              <div className="relative flex-1 min-w-64">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
                />
              </div>

              {/* Category Filter */}
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
              >
                {resourceCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
              >
                {resourceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              {/* Premium Filter */}
              <label className="flex items-center space-x-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={filters.showPremiumOnly}
                  onChange={(e) => setFilters(prev => ({ ...prev, showPremiumOnly: e.target.checked }))}
                />
                <span className="text-sm">Premium Only</span>
              </label>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="text-slate-400 hover:text-white transition-colors"
              >
                Clear Filters
              </button>
            </div>

            <div className="text-slate-400 text-sm">
              Showing {filteredResources.length} of {downloadableResources.length} resources
            </div>
          </div>

          {/* Resources Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <Filter size={48} className="mx-auto text-slate-600 mb-4" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">No resources found</h3>
                <p className="text-slate-400">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => {
                  const FileIcon = getFileIcon(resource.type);
                  const hasDownloaded = userDownloads.has(resource.id);
                  const localDownloadCount = downloadCounts[resource.id] || 0;
                  const totalDownloads = resource.downloadCount + localDownloadCount;

                  return (
                    <div
                      key={resource.id}
                      className="bg-slate-700 rounded-lg overflow-hidden hover:bg-slate-600 transition-colors"
                    >
                      {/* Resource Preview */}
                      <div className="relative aspect-[4/3] bg-slate-800 flex items-center justify-center">
                        {resource.previewUrl ? (
                          <img
                            src={resource.previewUrl}
                            alt={resource.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FileIcon size={48} className="text-slate-500" />
                        )}
                        
                        {resource.isPremium && (
                          <div className="absolute top-2 left-2">
                            <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                              <Crown size={12} className="mr-1" />
                              Premium
                            </span>
                          </div>
                        )}

                        {hasDownloaded && (
                          <div className="absolute top-2 right-2">
                            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                              <Check size={12} className="mr-1" />
                              Downloaded
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Resource Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                          {resource.title}
                        </h3>
                        <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                          {resource.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {resource.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="bg-slate-600 text-slate-300 px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {resource.tags.length > 3 && (
                            <span className="bg-slate-600 text-slate-300 px-2 py-1 rounded text-xs">
                              +{resource.tags.length - 3}
                            </span>
                          )}
                        </div>

                        {/* File Info */}
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                          <span className="flex items-center">
                            <FileIcon size={14} className="mr-1" />
                            {resource.type} • {resource.size}
                          </span>
                          {resource.pages && (
                            <span>{resource.pages} pages</span>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                          <span className="flex items-center">
                            <Download size={14} className="mr-1" />
                            {totalDownloads.toLocaleString()} downloads
                          </span>
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            Updated {new Date(resource.lastUpdated).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          {resource.previewUrl && (
                            <button className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-3 py-2 rounded text-sm transition-colors flex items-center justify-center">
                              <Eye size={16} className="mr-1" />
                              Preview
                            </button>
                          )}
                          <button
                            onClick={() => handleDownloadClick(resource)}
                            disabled={downloadingResource?.id === resource.id}
                            className={`flex-1 px-3 py-2 rounded text-sm transition-colors flex items-center justify-center ${
                              hasDownloaded
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : resource.isPremium
                                ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                : 'bg-purple-600 hover:bg-purple-700 text-white'
                            }`}
                          >
                            <Download size={16} className="mr-1" />
                            {downloadingResource?.id === resource.id ? 'Downloading...' : 
                             hasDownloaded ? 'Re-download' : 'Download'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDownload;