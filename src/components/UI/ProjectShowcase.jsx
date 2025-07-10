// src/components/UI/ProjectShowcase.jsx
import React, { useState, useEffect } from 'react';
import { X, Github, ExternalLink, Clock, Users, ChevronLeft, ChevronRight, Filter, Search, Star } from 'lucide-react';
import { showcaseProjects, projectCategories, difficultyLevels, gameEngines } from '../../data/projects.js';

const ProjectShowcase = ({ isOpen, onClose }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filteredProjects, setFilteredProjects] = useState(showcaseProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'All Projects',
    difficulty: 'All Levels',
    engine: 'All Engines'
  });
  const [favorites, setFavorites] = useState(new Set());

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('projectFavorites');
    if (savedFavorites) {
      try {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('projectFavorites', JSON.stringify([...favorites]));
  }, [favorites]);

  // Filter projects based on search and filters
  useEffect(() => {
    let filtered = showcaseProjects;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters.category !== 'All Projects') {
      filtered = filtered.filter(project => project.category === filters.category);
    }

    // Apply difficulty filter
    if (filters.difficulty !== 'All Levels') {
      filtered = filtered.filter(project => project.difficulty === filters.difficulty);
    }

    // Apply engine filter
    if (filters.engine !== 'All Engines') {
      filtered = filtered.filter(project => project.engine === filters.engine);
    }

    setFilteredProjects(filtered);
  }, [searchTerm, filters]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    
    // Track project views
    const projectViews = JSON.parse(localStorage.getItem('projectViews') || '{}');
    projectViews[project.id] = (projectViews[project.id] || 0) + 1;
    localStorage.setItem('projectViews', JSON.stringify(projectViews));
  };

  const toggleFavorite = (projectId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(projectId)) {
        newFavorites.delete(projectId);
      } else {
        newFavorites.add(projectId);
      }
      return newFavorites;
    });
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const clearFilters = () => {
    setFilters({
      category: 'All Projects',
      difficulty: 'All Levels',
      engine: 'All Engines'
    });
    setSearchTerm('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {selectedProject ? (
          /* Project Detail View */
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                  <p className="text-slate-300">{selectedProject.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div>
                  <div className="relative bg-slate-700 rounded-lg overflow-hidden aspect-video mb-4">
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                        >
                          <ChevronRight size={20} />
                        </button>
                        
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {selectedProject.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Strip */}
                  {selectedProject.images.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto">
                      {selectedProject.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-14 rounded border-2 overflow-hidden transition-colors ${
                            index === currentImageIndex ? 'border-purple-500' : 'border-transparent'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  {/* Quick Info */}
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Category:</span>
                        <span className="ml-2 text-white">{selectedProject.category}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Difficulty:</span>
                        <span className={`ml-2 ${
                          selectedProject.difficulty === 'Beginner' ? 'text-green-400' :
                          selectedProject.difficulty === 'Intermediate' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {selectedProject.difficulty}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Engine:</span>
                        <span className="ml-2 text-white">{selectedProject.engine}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Duration:</span>
                        <span className="ml-2 text-white">{selectedProject.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="text-slate-300 flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Technical Highlights</h3>
                    <ul className="space-y-2">
                      {selectedProject.highlights.map((highlight, index) => (
                        <li key={index} className="text-slate-300 flex items-start">
                          <span className="text-green-400 mr-2">✓</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4">
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <ExternalLink size={20} className="mr-2" />
                        Live Demo
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Github size={20} className="mr-2" />
                        View Code
                      </a>
                    )}
                    <button
                      onClick={() => toggleFavorite(selectedProject.id)}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                        favorites.has(selectedProject.id)
                          ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                          : 'bg-slate-600 hover:bg-slate-700 text-white'
                      }`}
                    >
                      <Star 
                        size={20} 
                        className={`mr-2 ${favorites.has(selectedProject.id) ? 'fill-current' : ''}`} 
                      />
                      {favorites.has(selectedProject.id) ? 'Favorited' : 'Add to Favorites'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Project Grid View */
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">Project Showcase</h2>
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
                    placeholder="Search projects, technologies..."
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
                  {projectCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                {/* Difficulty Filter */}
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  {difficultyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>

                {/* Engine Filter */}
                <select
                  value={filters.engine}
                  onChange={(e) => setFilters(prev => ({ ...prev, engine: e.target.value }))}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  {gameEngines.map(engine => (
                    <option key={engine} value={engine}>{engine}</option>
                  ))}
                </select>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Clear Filters
                </button>
              </div>

              <div className="text-slate-400 text-sm">
                Showing {filteredProjects.length} of {showcaseProjects.length} projects
              </div>
            </div>

            {/* Project Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <Filter size={48} className="mx-auto text-slate-600 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-300 mb-2">No projects found</h3>
                  <p className="text-slate-400">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className="bg-slate-700 rounded-lg overflow-hidden hover:bg-slate-600 transition-colors cursor-pointer group"
                    >
                      {/* Project Image */}
                      <div className="relative aspect-video bg-slate-800">
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(project.id);
                            }}
                            className={`p-1 rounded-full transition-colors ${
                              favorites.has(project.id)
                                ? 'bg-yellow-600 text-white'
                                : 'bg-black bg-opacity-50 text-white hover:bg-opacity-75'
                            }`}
                          >
                            <Star 
                              size={16} 
                              className={favorites.has(project.id) ? 'fill-current' : ''} 
                            />
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            project.difficulty === 'Beginner' ? 'bg-green-600' :
                            project.difficulty === 'Intermediate' ? 'bg-yellow-600' :
                            'bg-red-600'
                          } text-white`}>
                            {project.difficulty}
                          </span>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {project.duration}
                          </span>
                          <span className="flex items-center">
                            <Users size={14} className="mr-1" />
                            {project.teamSize}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <span
                              key={index}
                              className="bg-slate-600 text-slate-300 px-2 py-1 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="bg-slate-600 text-slate-300 px-2 py-1 rounded text-xs">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-sm">{project.engine}</span>
                          <div className="flex space-x-2">
                            {project.demoUrl && (
                              <ExternalLink size={16} className="text-slate-400 group-hover:text-purple-400 transition-colors" />
                            )}
                            {project.githubUrl && (
                              <Github size={16} className="text-slate-400 group-hover:text-purple-400 transition-colors" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectShowcase;