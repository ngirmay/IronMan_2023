# IronMan Lake Placid 2023 - Training Analysis & Performance Retrospective

## Project Overview
Comprehensive data analysis of training and performance metrics for the Lake Placid Ironman completed on July 23, 2023. This project extracts actionable insights from multi-source training data to optimize future endurance racing performance.

**Race Result:** 15:08:56 (Swim: 1:38:16 | Bike: 8:05:38 | Run: 5:02:01)

**Live Dashboard:** [https://ngirmay.github.io/IronMan_2023/](https://ngirmay.github.io/IronMan_2023/)

## Data Sources
- Apple Health (heart rate, activity metrics, sleep tracking)
- MyFitnessPal (nutrition and caloric intake)
- Wahoo (cycling power data and training metrics)
- FORM Goggles (swimming metrics and technique analysis)
- Genetic testing data (performance and recovery markers)

## Key Performance Metrics

### Training Volume
- **Duration:** 6 months structured training
- **Total Hours:** 720 hours (~4 hours/day average)
- **Training Days:** 180 days
- **Calories Burned:** 540,000 during training period

### Swim Analysis
- **Training Volume:** 120,000 yards
- **Stroke Rate:** 94 strokes/min (vs. professional average: 74.6)
- **Body Angle:** 130° (vs. optimal: 163°)
- **SWOLF Score:** Improved from 85 to 72
- **Key Finding:** Significant technique gap in body positioning affecting hydrodynamics

### Bike Performance
- **Weekly TSS Progression:** 200 to 600+ before taper
- **FTP Development:** 220W to 265W (20% improvement)
- **Race Execution:** 180W average (IF: 0.68)
- **Critical Observation:** Power decline after hour 4 due to nutrition timing

### Run Metrics
- **Peak Weekly Volume:** 45 miles/week
- **Pace Improvement:** 9:30/mile to 8:15/mile (easy pace)
- **Race Strategy:** Positive split (10:30 first half, 13:00 second half)
- **Cadence:** Maintained 170-175 spm throughout race

### Body Composition
- **Weight:** 185 lbs to 175 lbs (5.4% reduction)
- **Body Fat:** 18% to 14%
- **Lean Mass:** Maintained at ~150 lbs
- **VO2 Max:** Improved from 52 to 58 ml/kg/min

### Nutrition & Recovery
- **Daily Intake:** 3,200 calories during peak training
- **Macronutrient Distribution:** 55% carbohydrates, 25% protein, 20% fat
- **Race Nutrition:** 300 cal/hour (bike), 200 cal/hour (run)
- **Sleep Average:** 7.2 hours/night

## Technical Implementation

### Performance Optimizations
- Initial page load reduced from 30+ seconds to <3 seconds
- Bundle size optimization: 500MB to 5MB initial load
- Implemented lazy loading for on-demand content
- Service Worker caching for offline capability
- Mobile-responsive design with touch gesture support

### Technologies
- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Visualizations: Plotly.js
- Data Processing: Python, Pandas
- Performance: Service Worker, lazy loading

## Project Structure
```
IronMan_2023/
├── index.html                 # Optimized dashboard
├── index_original.html        # Original version
├── swim_viz_handler.html      # Large visualization handler
├── css/
│   └── optimized-styles.css
├── js/
│   └── lazy-loader.js
├── sw.js                      # Service Worker
└── assets/
    └── visualizations/        # 30+ interactive charts
        ├── genetic_analysis/
        ├── body_composition/
        ├── swim/
        ├── bike/
        ├── run/
        └── diet_sleep/
```

## Critical Insights
1. Swimming technique represents the largest performance gap, requiring professional coaching focus on body position
2. Nutrition timing on the bike segment critical for maintaining power output beyond 4 hours
3. Recovery metrics indicate under-recovery as primary training limiter
4. Genetic markers confirm endurance predisposition (60/40 endurance/power split)
5. Positive split run strategy was appropriate given fitness level but indicates room for improvement

## Future Optimization Areas
- Swim technique refinement (priority: body position)
- Increased sleep duration to 8+ hours for optimal recovery
- Refined bike nutrition protocol for sustained power
- Progressive long run pacing strategy development
- Integration with real-time training load monitoring

---
*Last Updated: January 2025*