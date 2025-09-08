// Lazy Loading Manager for Ironman 2023 Project
class LazyLoader {
    constructor() {
        this.loadedSections = new Set();
        this.sectionLoaders = {
            'intro': () => this.loadIntroSection(),
            'genetic_analysis': () => this.loadGeneticSection(),
            'body_composition': () => this.loadBodySection(),
            'swim': () => this.loadSwimSection(),
            'bike': () => this.loadBikeSection(),
            'run': () => this.loadRunSection(),
            'diet_sleep': () => this.loadDietSection(),
            'final_thoughts': () => this.loadFinalSection()
        };
        this.visualizationQueue = [];
        this.isLoadingVisualization = false;
    }

    async loadSection(sectionId) {
        if (this.loadedSections.has(sectionId)) {
            return Promise.resolve();
        }

        const loader = this.sectionLoaders[sectionId];
        if (loader) {
            this.showLoadingIndicator(sectionId);
            try {
                await loader.call(this);
                this.loadedSections.add(sectionId);
            } catch (error) {
                console.error(`Failed to load section ${sectionId}:`, error);
                this.showErrorMessage(sectionId);
            } finally {
                this.hideLoadingIndicator(sectionId);
            }
        }
    }

    showLoadingIndicator(sectionId) {
        const section = document.getElementById(sectionId);
        if (section && !section.querySelector('.loading-indicator')) {
            const loader = document.createElement('div');
            loader.className = 'loading-indicator';
            loader.innerHTML = `
                <div class="spinner"></div>
                <p>Loading ${sectionId.replace('_', ' ')}...</p>
            `;
            section.appendChild(loader);
        }
    }

    hideLoadingIndicator(sectionId) {
        const section = document.getElementById(sectionId);
        const loader = section?.querySelector('.loading-indicator');
        if (loader) {
            loader.remove();
        }
    }

    showErrorMessage(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.innerHTML += `
                <div class="error-message">
                    <p>Failed to load content. Please refresh the page.</p>
                </div>
            `;
        }
    }

    createVisualizationContainer(title, src, description, isLarge = false) {
        const container = document.createElement('div');
        container.className = 'visualization-container expandable-viz' + (isLarge ? ' large-viz' : '');
        
        container.innerHTML = `
            <h3 class="visualization-title">${title}</h3>
            <div class="visualization-content">
                <div class="viz-placeholder">
                    <div class="spinner"></div>
                    <p>Click to load visualization</p>
                </div>
            </div>
            <div class="expanded-content">
                <p>${description}</p>
            </div>
        `;

        // Load visualization on click
        container.addEventListener('click', () => {
            this.loadVisualization(container, src, title, description);
        }, { once: true });

        return container;
    }

    async loadVisualization(container, src, title, description) {
        const content = container.querySelector('.visualization-content');
        
        // Check if it's a large visualization
        const isLargeViz = src.includes('key_frame_comparison');
        
        if (isLargeViz) {
            // For large visualizations, open in new tab
            window.open(src, '_blank');
            return;
        }

        // For regular visualizations, load inline
        content.innerHTML = `
            <iframe 
                class="visualization-iframe preview-mode" 
                src="${src}"
                loading="lazy"
                scrolling="no">
            </iframe>
        `;

        // Setup modal functionality
        this.setupModal(container, title, description);
    }

    setupModal(container, title, description) {
        container.addEventListener('click', (e) => {
            if (e.target.closest('.visualization-title')) return;
            
            const modal = document.createElement('div');
            modal.className = 'visualization-modal fade-in';
            
            const content = container.querySelector('.visualization-content').cloneNode(true);
            const iframe = content.querySelector('iframe');
            if (iframe) {
                iframe.classList.remove('preview-mode');
                iframe.scrolling = 'auto';
                iframe.style.height = '800px';
            }
            
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3 class="visualization-title">${title}</h3>
                    ${content.outerHTML}
                    <div class="expanded-content" style="display: block;">
                        <p>${description}</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.onclick = () => {
                modal.remove();
                document.body.style.overflow = 'auto';
            };
            
            modal.onclick = (e) => {
                if (e.target === modal) {
                    closeBtn.click();
                }
            };
        });
    }

    async loadIntroSection() {
        // Intro content is already in HTML, just ensure images are optimized
        const section = document.getElementById('intro');
        const images = section.querySelectorAll('img');
        images.forEach(img => {
            if (!img.loading) {
                img.loading = 'lazy';
            }
        });
    }

    async loadGeneticSection() {
        const section = document.getElementById('genetic_analysis');
        const grid = section.querySelector('.visualization-grid');
        
        if (!grid || grid.children.length > 0) return;

        const visualizations = [
            {
                title: 'Genetic Performance Report',
                src: 'assets/visualizations/genetic_analysis/genetic_performance_report.html',
                description: 'Comprehensive genetic performance analysis based on SNP data'
            },
            {
                title: 'Athletic Genetics Overview',
                src: 'assets/visualizations/genetic_analysis/athletic_genetics_overview_20241024_132540.html',
                description: 'Overview of genetic markers influencing athletic performance'
            }
        ];

        visualizations.forEach(viz => {
            grid.appendChild(this.createVisualizationContainer(viz.title, viz.src, viz.description));
        });
    }

    async loadBodySection() {
        const section = document.getElementById('body_composition');
        const grids = section.querySelectorAll('.visualization-grid');
        
        if (grids[0]?.children.length > 0) return;

        const bodyVizs = [
            {
                title: 'Body Fat Percentage Trends',
                src: 'assets/visualizations/body_composition/body_fat_percentage_over_time_20241024_134949.html',
                description: 'Trend analysis of body fat percentage throughout training'
            },
            {
                title: 'Body Mass Evolution',
                src: 'assets/visualizations/body_composition/body_mass_over_time_20241024_134949.html',
                description: 'Body mass changes during training period'
            },
            {
                title: 'Heart Rate by Activity',
                src: 'assets/visualizations/body_composition/heart_rate_vs_activity_type_20241024_135605.html',
                description: 'Heart rate patterns across different activities'
            },
            {
                title: 'VO2 Max Trends',
                src: 'assets/visualizations/body_composition/vo2_max_trend_20241024_141609.html',
                description: 'VO2 Max progression during training'
            }
        ];

        grids.forEach((grid, index) => {
            const vizsToAdd = index === 0 ? bodyVizs.slice(0, 2) : bodyVizs.slice(2);
            vizsToAdd.forEach(viz => {
                grid.appendChild(this.createVisualizationContainer(viz.title, viz.src, viz.description));
            });
        });
    }

    async loadSwimSection() {
        const section = document.getElementById('swim');
        const grid = section.querySelector('.visualization-grid');
        
        if (!grid || grid.children.length > 0) return;

        const swimVizs = [
            {
                title: 'Performance Metrics',
                src: 'assets/visualizations/swim/metrics_comparison.html',
                description: 'Comparative swim performance metrics'
            },
            {
                title: 'Body Angle Analysis',
                src: 'assets/visualizations/swim/body_angle_analysis.html',
                description: 'Body positioning analysis during swim'
            },
            {
                title: 'DPS and SWOLF Trends',
                src: 'assets/visualizations/swim/avg_dps_swolf_over_time.html',
                description: 'Distance per stroke and SWOLF efficiency metrics'
            },
            {
                title: 'Form Analysis (View Externally)',
                src: 'assets/visualizations/swim/key_frame_comparison_1.html',
                description: 'Detailed form analysis - opens in new tab due to file size',
                isLarge: true
            }
        ];

        swimVizs.forEach(viz => {
            grid.appendChild(this.createVisualizationContainer(viz.title, viz.src, viz.description, viz.isLarge));
        });
    }

    async loadBikeSection() {
        const section = document.getElementById('bike');
        const grid = section.querySelector('.visualization-grid');
        
        if (!grid || grid.children.length > 0) return;

        const bikeVizs = [
            {
                title: 'Power Analysis',
                src: 'assets/visualizations/bike/avg_power.html',
                description: 'Average power output analysis'
            },
            {
                title: 'Training Stress Score',
                src: 'assets/visualizations/bike/cumulative_tss.html',
                description: 'Cumulative TSS progression'
            },
            {
                title: 'Weekly Training Load',
                src: 'assets/visualizations/bike/weekly_training_load.html',
                description: 'Weekly training volume and intensity'
            },
            {
                title: 'Intensity Factor Progress',
                src: 'assets/visualizations/bike/if_progression.html',
                description: 'Training intensity progression over time'
            }
        ];

        bikeVizs.forEach(viz => {
            grid.appendChild(this.createVisualizationContainer(viz.title, viz.src, viz.description));
        });
    }

    async loadRunSection() {
        const section = document.getElementById('run');
        const grid = section.querySelector('.visualization-grid');
        
        if (!grid || grid.children.length > 0) return;

        const runVizs = [
            {
                title: 'Running Analysis',
                src: 'assets/visualizations/run/enhanced_running_data_analysis.html',
                description: 'Comprehensive running metrics analysis'
            },
            {
                title: 'Heart Rate and Cadence',
                src: 'assets/visualizations/run/heart_rate_cadence_over_time.html',
                description: 'Heart rate and cadence patterns'
            },
            {
                title: 'Pace Analysis',
                src: 'assets/visualizations/run/pace_distance_over_time.html',
                description: 'Pace trends over training period'
            },
            {
                title: 'Weekly Mileage',
                src: 'assets/visualizations/run/weekly_mileage_before_feb_25_2023.html',
                description: 'Weekly running volume progression'
            }
        ];

        runVizs.forEach(viz => {
            grid.appendChild(this.createVisualizationContainer(viz.title, viz.src, viz.description));
        });
    }

    async loadDietSection() {
        const section = document.getElementById('diet_sleep');
        const grid = section.querySelector('.visualization-grid');
        
        if (!grid || grid.children.length > 0) return;

        const dietVizs = [
            {
                title: 'Macronutrient Distribution',
                src: 'assets/visualizations/diet_sleep/ironman_macronutrient_distribution_20241024_130557.html',
                description: 'Macronutrient intake analysis'
            },
            {
                title: 'Weight and Calories',
                src: 'assets/visualizations/diet_sleep/ironman_weight_and_calories_over_time_20241024_130557.html',
                description: 'Weight and calorie correlation'
            },
            {
                title: 'Sleep Analysis',
                src: 'assets/visualizations/diet_sleep/sleep_data_analysis_20241024_130520.html',
                description: 'Comprehensive sleep pattern analysis'
            }
        ];

        dietVizs.forEach(viz => {
            grid.appendChild(this.createVisualizationContainer(viz.title, viz.src, viz.description));
        });
    }

    async loadFinalSection() {
        // Final thoughts are mostly static, just ensure animations work
        const section = document.getElementById('final_thoughts');
        this.animateNumbers(section);
    }

    animateNumbers(section) {
        const numbers = section.querySelectorAll('.animate-number:not(.animated)');
        numbers.forEach(num => {
            num.classList.add('animated');
            const finalValue = num.dataset.value;
            const duration = 1500;
            const startTime = performance.now();
            
            const updateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                if (finalValue.includes(':')) {
                    // Handle time format
                    const parts = finalValue.split(':');
                    const totalSeconds = parts.reduce((acc, val, idx) => {
                        return acc + parseInt(val) * Math.pow(60, parts.length - idx - 1);
                    }, 0);
                    
                    const currentSeconds = Math.floor(totalSeconds * progress);
                    const hours = Math.floor(currentSeconds / 3600);
                    const minutes = Math.floor((currentSeconds % 3600) / 60);
                    const seconds = currentSeconds % 60;
                    
                    if (parts.length === 3) {
                        num.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                    } else {
                        num.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;
                    }
                } else {
                    const numValue = parseInt(finalValue.replace(/,/g, ''));
                    num.textContent = Math.floor(numValue * progress).toLocaleString();
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            };
            
            requestAnimationFrame(updateNumber);
        });
    }
}

// Initialize lazy loader
const lazyLoader = new LazyLoader();

// Export for use in main HTML
window.LazyLoader = lazyLoader;