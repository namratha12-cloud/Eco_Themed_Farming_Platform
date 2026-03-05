export type Language = 'en' | 'kn' | 'hi';

export const translations: Record<Language, any> = {
    en: {
        nav: {
            home: 'Home',
            scan: 'Scan',
            soil: 'Soil',
            water: 'Water',
            weather: 'Weather',
            wildlife: 'Wildlife',
            market: 'Market',
            advisory: 'Advisory',
            profile: 'Profile',
        },
        dashboard: {
            welcome: 'Welcome to KrishiSarthi AI',
            subtitle: 'Your comprehensive farming companion powered by AI',
            tools: 'Smart Farming Tools',
            seasonalGuide: 'Seasonal Crop Guide',
            rabi: 'Rabi Season (Winter)',
            kharif: 'Kharif Season (Monsoon)',
            rabiSeason: 'Rabi Season Crops',
            rabiMonths: 'October - March (Winter Season)',
            kharifSeason: 'Kharif Season Crops',
            kharifMonths: 'June - October (Monsoon Season)',
            recommended: 'Recommended Crops:',
            rabiNote: 'Best for cooler temperatures • Requires less water',
            kharifNote: 'Thrives in warm & humid conditions • Monsoon dependent',
            scanning: 'Crop Disease Scanner',
            scanningDesc: 'AI-powered plant disease detection and treatment recommendations',
            soil: 'Soil & Fertility Analysis',
            soilDesc: 'Comprehensive soil health check and nutrient recommendations',
            water: 'Water & Irrigation Advisor',
            waterDesc: 'Smart water management and irrigation scheduling',
            weather: 'Weather & Climate Alerts',
            weatherDesc: '7-day forecasts and extreme weather notifications',
            wildlife: 'Wildlife Detection & Prevention',
            wildlifeDesc: 'AI wildlife monitoring and forest department alerts',
            market: 'Market Price Prediction',
            marketDesc: 'Real-time mandi prices and best selling predictions',
            advisory: 'Daily Smart Advisory',
            advisoryDesc: 'Personalized farming insights and AI recommendations',
        },
        profile: {
            header: 'Farmer Profile',
            subtitle: 'Manage your farming profile and preferences',
            name: 'FULL NAME',
            email: 'EMAIL ADDRESS',
            phone: 'PHONE NUMBER',
            location: 'LOCATION (VILLAGE/TOWN)',
            save: 'Save My Profile',
            saving: 'Saving Changes...',
            success: 'Changes Saved Successfully!',
            statsHeader: 'Crop & Land Statistics',
            healthStatus: 'Healthy',
            verified: 'Verified Farmer',
            standard: 'Standard Account',
        },
        market: {
            header: 'Market Analysis',
            subtitle: 'Predictive pricing and real-time mandi tracking',
            selectCrop: 'SELECT CROP:',
            price: 'Market Price',
            change: 'Weekly Change',
            peak: 'Forecast Peak',
            hotMandi: 'Hot Mandi',
            chartTitle: 'Price Index (7-Day History)',
            mandiTitle: 'Regional Live Mandi Data',
        },
        advisory: {
            header: 'Daily Smart Advisory',
            subtitle: 'Real-world insights for your farm',
            selectCrop: 'MY CROP:',
            summary: 'Health Report',
            askAI: 'Consult KrishiSarthi AI for',
            askBtn: 'Ask AI',
            analyzing: 'AI analysis...',
            askPlaceholder: 'Ask about',
            health: 'Crop Health',
            soil: 'Soil Nutrient',
            water: 'Water Level',
            statusGood: 'Good',
            statusExcellent: 'Excellent',
            statusStable: 'Stable',
            statusVigorous: 'Vigorous',
            statusFair: 'Fair',
            asOfToday: 'Analysis as of Today'
        },
        scanner: {
            header: 'KrishiSarthi Crop Doctor',
            subtitle: 'Instant Diagnosis • Fertilizer Ratios • Chemical Treatments',
            dropzone: 'Take a photo of the affected leaf',
            uploadBtn: 'Upload Photo',
            diagnoseBtn: 'DIAGNOSE NOW',
            analyzing: 'Analyzing...',
            cancel: 'Cancel',
            treatmentPlan: 'RECOMMENDED TREATMENT PLAN',
            confidence: 'Confidence',
            scanNext: 'Scan Next Plant',
            recentScans: 'Recent Scans',
            severity: 'Severity Level',
            none: 'None',
            low: 'Low',
            medium: 'Medium',
            high: 'High',
            critical: 'Critical',
            treatments: {
                healthy: [
                    'Routine: Apply balanced NPK 10-10-10 every 4 weeks.',
                    'Water: Consistent watering (1-2 inches per week).',
                    'Monitor: Check for pests weekly.'
                ],
                fungal: [
                    'Fungicide: Spray Chlorothalonil or Mancozeb every 7-10 days.',
                    'Fertilizer: Pause high-Nitrogen. Use NPK 5-10-10 (high Potassium).',
                    'Sanitation: Prune bottom yellow leaves for airflow.',
                    'Irrigation: Use drip only. Keep foliage dry.'
                ],
                viral: [
                    'Control: Spray Imidacloprid or Neem Oil (0.5%) to kill aphids/thrips.',
                    'Immunity: Provide micronutrients (Zinc, Magnesium, Iron).',
                    'Prevention: Use disease-resistant seed varieties next season.'
                ],
                bacterial: [
                    'Chemical: Spray copper hydroxide immediately.',
                    'Fertilizer: Apply balanced NPK 10-10-10. Avoid excessive N.',
                    'Weather: Do not touch plants when wet to prevent spread.',
                    'Tools: Sanitize pruning shears in bleach solution.'
                ],
                pests: [
                    'Pesticide: Use Spinosad or Cypermethrin for caterpillars.',
                    'Mites: Use Abamectin or specialized miticides.',
                    'Organic: Apply Neem oil every 5 days.'
                ],
                general: [
                    'General Treatment: Use Copper-based fungicide.',
                    'Fertilizer: Apply balanced NPK 10-10-10 fertilizer.',
                    'Water: Improve field drainage. Stagnant water causes root rot.'
                ]
            }
        },
        advisoryProfiles: {
            Wheat: {
                health: { status: 'statusGood', tip: 'Strong growth in northern sectors' },
                soil: { status: 'Nitrogen Low', tip: 'Needs Urea top-dressing' },
                water: { status: 'Moderate', tip: 'Next irrigation due in 3 days' },
                risk: { status: 'Rust Risk', tip: 'Check for yellow spots on lower leaves' },
                summary: 'Wheat is in the active tillering stage. Climate is optimal for grain development.'
            },
            Rice: {
                health: { status: 'statusExcellent', tip: 'Panicle initiation starting' },
                soil: { status: 'Potash Need', tip: 'Apply MOP for strong stalks' },
                water: { status: 'Critical', tip: 'Maintain 5cm standing water' },
                risk: { status: 'Blast Warning', tip: 'Humidity high, watch for leaf blast' },
                summary: 'Standing water levels are good. Maintain saturation for heat stress prevention.'
            },
            Coconut: {
                health: { status: 'statusStable', tip: 'New frond emergence detected' },
                soil: { status: 'Boron Deficit', tip: 'Apply borax for nut retention' },
                water: { status: 'Drought Risk', tip: 'Deep irrigation required immediately' },
                risk: { status: 'Mite Alert', tip: 'Check young nuts for scarring' },
                summary: 'Plantation shows signs of moisture stress. Drip irrigation must be increased.'
            },
            Maize: {
                health: { status: 'statusVigorous', tip: 'Silking stage approaching' },
                soil: { status: 'Rich', tip: 'Nutrient levels ideal for silking' },
                water: { status: 'High Demand', tip: 'Watering needed during pollination' },
                risk: { status: 'Stem Borer', tip: 'Pheromone traps showing activity' },
                summary: 'Growth is rapid. Ensure high nitrogen availability for stalk strength.'
            },
            Onion: {
                health: { status: 'statusFair', tip: 'Bulb formation in progress' },
                soil: { status: 'Sulfur Need', tip: 'Apply sulfur for better pungency' },
                water: { status: 'Precise', tip: 'Alternate day light irrigation' },
                risk: { status: 'Thrips Alert', tip: 'Silver streaks visible on leaves' },
                summary: 'Thrips population is high. Recommend organic spray before evening.'
            }
        },
        wildlife: {
            header: 'Wildlife Detection & Prevention',
            subtitle: 'AI wildlife monitoring and forest department alerts',
            uploadTitle: 'Upload Sensor/Camera Image',
            uploadDesc: 'Upload a clear field image for wildlife analysis',
            selectBtn: 'Select Image',
            detecting: 'Analyzing for Wildlife...',
            detectBtn: 'Detect Wildlife',
            uploadNew: 'Upload Different Image',
            resultHeader: 'Detection Result',
            count: 'Count',
            threat: 'Threat Level',
            location: 'Last Seen Location',
            time: 'Detection Time',
            notifyBtn: 'Alert Forest Department',
            immediateActions: 'Immediate Response Actions',
            longTerm: 'Long-term Prevention Methods',
            notified: 'Forest Department notified successfully! They will respond within 24 hours.',
            animals: {
                'Wild Boar': 'Wild Boar',
                'Elephant': 'Elephant',
                'Monkey': 'Monkey',
                'Deer': 'Deer',
                'Tiger': 'Tiger',
                'Lion': 'Lion',
                'Leopard': 'Leopard',
                'Bear': 'Bear',
                'Wolf': 'Wolf',
                'Fox': 'Fox',
                'Bird': 'Bird',
                'Unknown': 'Unknown Animal'
            },
            actions: [
                'Install electric fencing around vulnerable crops',
                'Set up motion-activated lights and alarms',
                'Create physical barriers using thorny bushes',
                'Coordinate with neighbors for group monitoring'
            ],
            prevention: [
                'Remove food sources like fallen fruits',
                'Maintain clear boundaries around fields',
                'Use scent-based repellents',
                'Regular patrol during dusk and dawn'
            ],
            mock_locations: ['Northern Field - Sector B', 'South Shore - Zone 4', 'West Forest Edge', 'Near Water Stream'],
            mock_times: ['Detected Just Now', 'Detected 15 mins ago', 'Detected 1 hour ago', 'Detected 2 hours ago']
        },
        soil: {
            header: 'Soil Health Analysis',
            subtitle: 'Comprehensive soil fertility and nutrient assessment',
            uploadBtn: 'Upload Soil Image',
            uploadDesc: 'Supported: JPG, PNG',
            phHeader: 'Select Soil pH',
            phAcidic: 'Acidic',
            phAlkaline: 'Alkaline',
            colorHeader: 'Select Soil Color',
            analyzeBtn: 'Analyze Soil',
            analyzing: 'Analyzing...',
            resultHeader: 'Soil Analysis Results',
            type: 'Soil Type',
            moisture: 'Moisture',
            organic: 'Organic Matter',
            nutrients: 'NPK Nutrient Levels',
            recommendations: 'Fertilizer Recommendations',
            cropHeader: 'Recommended Crops (Current Season)',
            alsoSuitable: 'Also suitable for your soil:',
            colors: {
                'Dark Brown': 'Dark Brown',
                'Light Brown': 'Light Brown',
                'Red': 'Red',
                'Yellow': 'Yellow',
                'Black': 'Black',
                'Gray': 'Gray'
            },
            types: {
                Loamy: 'Loamy Soil',
                Sandy: 'Sandy Soil',
                Clay: 'Clay Soil',
                Silt: 'Silt Soil'
            },
            periods: {
                'Split application': 'Split application (Early & Mid)',
                'Basal dose': 'Basal dose (At sowing)',
                'With DAP': 'With DAP'
            }
        },
        weather: {
            header: 'Weather & Climate Assistant',
            subtitle: 'Precision agriculture weather forecasting and climate-smart alerts',
            fetching: 'Fetching local weather data...',
            alertsHeader: 'Climate Smart Alerts',
            alertsSubtitle: 'Critical alerts for your region to protect your crops',
            recommendations: 'Farming Recommendations',
            alert: 'Alert',
            days: {
                Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri', Sat: 'Sat', Sun: 'Sun'
            },
            conditions: {
                sunny: 'Sunny',
                'partly-cloudy': 'Partly Cloudy',
                rainy: 'Rainy',
                cloudy: 'Cloudy'
            }
        },
        water: {
            header: 'Water & Irrigation Advisor',
            subtitle: 'Smart water management and irrigation scheduling',
            moistureHeader: 'Current Soil Moisture',
            tempHeader: 'Temperature',
            stageHeader: 'Crop Growth Stage',
            cropHeader: 'Select Crop',
            selectCrop: 'Choose a crop...',
            crops: {
                rice: 'Rice',
                wheat: 'Wheat',
                cotton: 'Cotton',
                sugarcane: 'Sugarcane',
                tomato: 'Tomato',
                potato: 'Potato'
            },
            calcBtn: 'Calculate Irrigation Need',
            requirement: 'Irrigation Requirement',
            status: {
                high: 'High Priority',
                medium: 'Moderate Need',
                low: 'Low Priority'
            },
            schedule: 'Recommended Irrigation Schedule',
            amount: 'Amount',
            frequency: 'Frequency',
            time: 'Best Time',
            freq: {
                daily: 'Daily',
                every2: 'Every 2 days',
                every3: 'Every 3 days'
            },
            params: {
                dry: 'Dry',
                wet: 'Wet',
                cool: 'Cool',
                hot: 'Hot'
            },
            bestTime: 'Early Morning',
            tipsHeader: 'Water Conservation Tips',
            tips: [
                'Use drip irrigation for water efficiency',
                'Mulch around plants to retain moisture',
                'Water during cooler parts of the day',
                'Monitor soil moisture regularly'
            ],
            stages: {
                germination: 'Germination',
                vegetative: 'Vegetative',
                flowering: 'Flowering',
                fruiting: 'Fruiting'
            }
        },
        auth: {
            loginHeader: 'Welcome Back Farmer',
            loginSubtitle: 'Continue your digital farming journey',
            phone: 'Phone Number',
            password: 'Password',
            loginBtn: 'Sign In to Farm',
            noAccount: "Don't have an account?",
            registerLink: 'Register Here',
            regHeader: 'Join KrishiSarthi AI',
            regSubtitle: 'Register to unlock smart farming power',
            fullName: 'Full Name',
            location: 'Location (Village/Town)',
            regBtn: 'Create Account',
            hasAccount: 'Already have an account?',
            loginLink: 'Login Here',
        },
        chatbot: {
            title: 'KrishiSarthi AI',
            subtitle: 'Your Farming Assistant',
            welcome: 'Hello! I am KrishiSarthi AI, your farming assistant. How can I help you today?',
            error: "I'm having trouble connecting to the brain right now. Please try again later!",
            placeholder: 'Ask me anything...',
            quickQuestions: 'Quick questions:',
            aiLabel: 'AI Assistant',
            suggestions: [
                'What crops should I plant in Rabi season?',
                'How to improve soil fertility?',
                'Best irrigation practices?',
                'Current market prices?'
            ]
        },
        crops: {
            Wheat: 'Wheat',
            Rice: 'Rice',
            Coconut: 'Coconut',
            Maize: 'Maize',
            Onion: 'Onion',
            Cotton: 'Cotton',
            Soybean: 'Soybean',
            Tomato: 'Tomato',
            Potato: 'Potato',
            Barley: 'Barley',
            Gram: 'Gram',
            Peas: 'Peas',
            Mustard: 'Mustard',
            Lentil: 'Lentil',
            Bajra: 'Bajra',
            Jowar: 'Jowar',
            Corn: 'Corn'
        }
    },
    kn: {
        nav: {
            home: 'ಮನೆ',
            scan: 'ಸ್ಕ್ಯಾನ್',
            soil: 'ಮಣ್ಣು',
            water: 'ನೀರು',
            weather: 'ಹವಾಮಾನ',
            wildlife: 'ವನ್ಯಜೀವಿ',
            market: 'ಮಾರುಕಟ್ಟೆ',
            advisory: 'ಸಲಹೆ',
            profile: 'ಪ್ರೊಫೈಲ್',
        },
        dashboard: {
            welcome: 'ಕೃಷಿಸಾರಥಿ AI ಗೆ ಸುಸ್ವಾಗತ',
            subtitle: 'AI ನಿಂದ ನಡೆಸಲ್ಪಡುವ ನಿಮ್ಮ ಸಮಗ್ರ ಕೃಷಿ ಸಂಗಾತಿ',
            tools: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಪರಿಕರಗಳು',
            seasonalGuide: 'ಕಾಲೋಚಿತ ಬೆಳೆ ಮಾರ್ಗದರ್ಶಿ',
            rabi: 'ರಬಿ ಹಂಗಾಮು (ಚಳಿಗಾಲ)',
            kharif: 'ಖಾರಿಫ್ ಹಂಗಾಮು (ಮುಂಗಾರು)',
            rabiSeason: 'ರಬಿ ಹಂಗಾಮು ಬೆಳೆಗಳು',
            rabiMonths: 'ಅಕ್ಟೋಬರ್ - ಮಾರ್ಚ್ (ಚಳಿಗಾಲ)',
            kharifSeason: 'ಖಾರಿಫ್ ಹಂಗಾಮು ಬೆಳೆಗಳು',
            kharifMonths: 'ಜೂನ್ - ಅಕ್ಟೋಬರ್ (ಮುಂಗಾರು)',
            recommended: 'ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳು:',
            rabiNote: 'ಕಡಿಮೆ ತಾಪಮಾನಕ್ಕೆ ಸೂಕ್ತ • ಕಡಿಮೆ ನೀರು ಸಾಕು',
            kharifNote: 'ಬೆಚ್ಚಗಿನ ಮತ್ತು ಆರ್ದ್ರ ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ಬೆಳೆಯುತ್ತದೆ • ಮುಂಗಾರು ಅವಲಂಬಿತ',
            scanning: 'ಬೆಳೆ ರೋಗ ಸ್ಕ್ಯಾನರ್',
            scanningDesc: 'AI ಮೂಲಕ ಬೆಳೆ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಚಿಕಿತ್ಸೆ ಶಿಫಾರಸುಗಳು',
            soil: 'ಮಣ್ಣು ಮತ್ತು ಫಲವತ್ತತೆ ವಿಶ್ಲೇಷಣೆ',
            soilDesc: 'ಸಂಪೂರ್ಣ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ತಪಾಸಣೆ ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ಶಿಫಾರಸುಗಳು',
            water: 'ನೀರು ಮತ್ತು ನೀರಾವರಿ ಸಲಹೆಗಾರ',
            waterDesc: 'ಸ್ಮಾರ್ಟ್ ನೀರು ನಿರ್ವಹಣೆ ಮತ್ತು ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ',
            weather: 'ಹವಾಮಾನ ಮತ್ತು ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು',
            weatherDesc: '7 ದಿನಗಳ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು',
            wildlife: 'ವನ್ಯಜೀವಿ ಪತ್ತೆ ಮತ್ತು ತಡೆಗಟ್ಟುವಿಕೆ',
            wildlifeDesc: 'AI ವನ್ಯಜೀವಿ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಅರಣ್ಯ ಇಲಾಖೆ ಎಚ್ಚರಿಕೆಗಳು',
            market: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಮುನ್ಸೂಚನೆ',
            marketDesc: 'ರಿಯಲ್-ಟೈಮ್ ಮಂಡಿ ಬೆಲೆಗಳು ಮತ್ತು ಮಾರಾಟದ ಮುನ್ಸೂಚನೆಗಳು',
            advisory: 'ದೈನಂದಿನ ಸ್ಮಾರ್ಟ್ ಸಲಹೆ',
            advisoryDesc: 'ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಕೃಷಿ ಒಳನೋಟಗಳು ಮತ್ತು AI ಶಿಫಾರಸುಗಳು',
        },
        profile: {
            header: 'ರೈತರ ಪ್ರೊಫೈಲ್',
            subtitle: 'ನಿಮ್ಮ ಕೃಷಿ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಆದ್ಯತೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ',
            name: 'ಪೂರ್ಣ ಹೆಸರು',
            email: 'ಇಮೇಲ್ ವಿಳಾಸ',
            phone: 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ',
            location: 'ಸ್ಥಳ (ಗ್ರಾಮ/ಪಟ್ಟಣ)',
            save: 'ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ',
            saving: 'ಉಳಿಸಲಾಗುತ್ತಿದೆ...',
            success: 'ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!',
            statsHeader: 'ಬೆಳೆ ಮತ್ತು ಭೂಮಿ ಅಂಕಿಅಂಶಗಳು',
            healthStatus: 'ಆರೋಗ್ಯಕರ',
            verified: 'ಪರಿಶೀಲಿಸಿದ ರೈತ',
            standard: 'ಸಾಮಾನ್ಯ ಖಾತೆ',
        },
        market: {
            header: 'ಮಾರುಕಟ್ಟೆ ವಿಶ್ಲೇಷಣೆ',
            subtitle: 'ಮುನ್ಸೂಚನೆಯ ಬೆಲೆ ಮತ್ತು ನೈಜ-ಸಮಯದ ಮಂಡಿ ಟ್ರ್ಯಾಕಿಂಗ್',
            selectCrop: 'ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ:',
            price: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ',
            change: 'ವಾರದ ಬದಲಾವಣೆ',
            peak: 'ಗರಿಷ್ಠ ಮುನ್ಸೂಚನೆ',
            hotMandi: 'ಪ್ರಮುಖ ಮಂಡಿ',
            chartTitle: 'ಬೆಲೆ ಸೂಚ್ಯಂಕ (7-ದಿನಗಳ ಇತಿಹಾಸ)',
            mandiTitle: 'ಪ್ರಾದೇಶಿಕ ಲೈವ್ ಮಂಡಿ ಡೇಟಾ',
        },
        advisory: {
            header: 'ದೈನಂದಿನ ಸ್ಮಾರ್ಟ್ ಸಲಹೆ',
            subtitle: 'ನಿಮ್ಮ ಕೃಷಿಗಾಗಿ ನೈಜ-ಪ್ರಪಂಚದ ಒಳನೋಟಗಳು',
            selectCrop: 'ನನ್ನ ಬೆಳೆ:',
            summary: 'ಆರೋಗ್ಯ ವರದಿ',
            askAI: 'ಕೃಷಿಸಾರಥಿ AI ಅನ್ನು ಕೇಳಿ',
            askBtn: 'AI ಕೇಳಿ',
            analyzing: 'AI ವಿಶ್ಲೇಷಣೆ...',
            askPlaceholder: 'ಬಗ್ಗೆ ಕೇಳಿ',
            health: 'ಬೆಳೆ ಆರೋಗ್ಯ',
            soil: 'ಮಣ್ಣಿನ ಪೋಷಕಾಂಶ',
            water: 'ನೀರಿನ ಮಟ್ಟ',
            statusGood: 'ಉತ್ತಮ',
            statusExcellent: 'ಅತ್ಯುತ್ತಮ',
            statusStable: 'ಸ್ಥಿರ',
            statusVigorous: 'ವೇಗವಾಗಿ ಬೆಳೆಯುತ್ತಿರುವ',
            statusFair: 'ಸಾಧಾರಣ',
            asOfToday: 'ಇಂದಿನ ವಿಶ್ಲೇಷಣೆ'
        },
        scanner: {
            header: 'ಕೃಷಿಸಾರಥಿ ಬೆಳೆ ವೈದ್ಯ',
            subtitle: 'AI-ಚಾಲಿತ ಸಸ್ಯ ರೋಗಗಳ ಪತ್ತೆ ಮತ್ತು ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳು',
            dropzone: 'ರೋಗ ಪತ್ತೆಹಚ್ಚಲು ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಬಿಡಿ',
            uploadBtn: 'ಫೀಲ್ಡ್ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
            analyzing: 'ಸಸ್ಯ ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ...',
            diagnoseBtn: 'ರೋಗ ಪತ್ತೆಹಚ್ಚಿ',
            cancel: 'ರದ್ದುಗೊಳಿಸಿ',
            confidence: 'ವಿಶ್ವಾಸಾರ್ಹತೆ',
            treatmentPlan: 'ಶಿಫಾರಸು ಮಾಡಿದ ಚಿಕಿತ್ಸಾ ಯೋಜನೆ',
            recentScans: 'ಇತ್ತೀಚಿನ ಸ್ಕ್ಯಾನ್‌ಗಳು',
            scanNext: 'ಮುಂದಿನ ಸಸ್ಯವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
            severity: 'ಗಂಭೀರತೆ',
            none: 'ಯಾವುದೂ ಇಲ್ಲ',
            low: 'ಕಡಿಮೆ',
            medium: 'ಮಧ್ಯಮ',
            high: 'ಹೆಚ್ಚು',
            critical: 'ಗಂಭೀರ',
            treatments: {
                healthy: [
                    'ದಿನಚರಿ: ಪ್ರತಿ 4 ವಾರಗಳಿಗೊಮ್ಮೆ ಸಮತೋಲಿತ NPK 10-10-10 ಗೊಬ್ಬರ ನೀಡಿ.',
                    'ನೀರು: ನಿಯಮಿತವಾಗಿ ನೀರು ಹಾಕಿ (ವಾರಕ್ಕೆ 1-2 ಇಂಚುಗಳು).',
                    'ಮೇಲ್ವಿಚಾರಣೆ: ವಾರಕ್ಕೊಮ್ಮೆ ಕೀಟಗಳಿವೆಯೇ ಎಂದು ಪರೀಕ್ಷಿಸಿ.'
                ],
                fungal: [
                    'ಶಿಲೀಂಧ್ರನಾಶಕ: ಪ್ರತಿ 7-10 ದಿನಗಳಿಗೊಮ್ಮೆ ಕ್ಲೋರೊಥಲೋನಿಲ್ ಅಥವಾ ಮ್ಯಾಂಕೋಜೆಬ್ ಸಿಂಪಡಿಸಿ.',
                    'ಗೊಬ್ಬರ: ಹೆಚ್ಚಿನ ಸಾರಜನಕ ನಿಲ್ಲಿಸಿ. ಪೊಟ್ಯಾಸಿಯಮ್ ಹೆಚ್ಚಿರುವ NPK 5-10-10 ಬಳಸಿ.',
                    'ನೈರ್ಮಲ್ಯ: ಗಾಳಿಯಾಡಲು ಕೆಳಗಿನ ಹಳದಿ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.',
                    'ನೀರಾವರಿ: ಹನಿ ನೀರಾವರಿ ಮಾತ್ರ ಬಳಸಿ. ಎಲೆಗಳನ್ನು ಒಣಗಿಸಿಡಿ.'
                ],
                viral: [
                    'ನಿಯಂತ್ರಣ: ಅಫಿಡ್ಸ್/ಥ್ರಿಪ್ಸ್ ಕೊಲ್ಲಲು ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆ (0.5%) ಸಿಂಪಡಿಸಿ.',
                    'ರೋಗನಿರೋಧಕ ಶಕ್ತಿ: ಪೋಷಕಾಂಶಗಳನ್ನು (ಜಿಂಕ್, ಮೆಗ್ನೀಸಿಯಮ್, ಕಬ್ಬಿಣ) ನೀಡಿ.',
                    'ಮದ್ದು ಇಲ್ಲ: ಸೋಂಕಿತ ಸಸ್ಯಗಳನ್ನು ಗುಣಪಡಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. ಉಳಿದವುಗಳನ್ನು ಉಳಿಸಲು ಗಮನ ಕೊಡಿ.',
                    'ತಡೆಗಟ್ಟುವಿಕೆ: ಮುಂದಿನ ಋತುವಿನಲ್ಲಿ ರೋಗ ನಿರೋಧಕ ಬೀಜ ಪ್ರಭೇದಗಳನ್ನು ಬಳಸಿ.'
                ],
                bacterial: [
                    'ರಾಸಾಯನಿಕ: ತಕ್ಷಣ ಕಾಪರ್ ಹೈಡ್ರಾಕ್ಸೈಡ್ ಸಿಂಪಡಿಸಿ.',
                    'ಗೊಬ್ಬರ: ಸಮತೋಲಿತ NPK 10-10-10 ಬಳಸಿ. ಹೆಚ್ಚಿನ ಸಾರಜನಕ ತಪ್ಪಿಸಿ.',
                    'ಹವಾಮಾನ: ಒದ್ದೆಯಾದಾಗ ಸಸ್ಯಗಳನ್ನು ಮುಟ್ಟಬೇಡಿ, ರೋಗ ಹರಡಬಹುದು.',
                    'ಪರಿಕರಗಳು: ಕತ್ತರಿಸುವ ಕತ್ತರಿಗಳನ್ನು ಬ್ಲೀಚ್ ದ್ರಾವಣದಲ್ಲಿ ಅದ್ದಿ.'
                ],
                pests: [
                    'ಕೀಟನಾಶಕ: ಹುಳುಗಳಿಗಾಗಿ ಸ್ಪಿನೋಸಾಡ್ ಅಥವಾ ಸೈಪರ್ಮೆಥ್ರಿನ್ ಬಳಸಿ.',
                    'ನುಸಿ: ಅಬಾಮೆಕ್ಟಿನ್ ಅಥವಾ ವಿಶೇಷ ನುಸಿ ನಾಶಕಗಳನ್ನು ಬಳಸಿ.',
                    'ಸಾವಯವ: ಪ್ರತಿ 5 ದಿನಗಳಿಗೊಮ್ಮೆ ಬೇವಿನ ಎಣ್ಣೆಯನ್ನು ಬಳಸಿ.'
                ],
                general: [
                    'ಸಾಮಾನ್ಯ ಚಿಕಿತ್ಸೆ: ಕಾಪರ್ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಬಳಸಿ.',
                    'ಗೊಬ್ಬರ: ಸಮತೋಲಿತ NPK 10-10-10 ಗೊಬ್ಬರವನ್ನು ನೀಡಿ.',
                    'ನೀರು: ಹೊಲದ ಒಳಚರಂಡಿಯನ್ನು ಸುಧಾರಿಸಿ. ನೀರು ನಿಂತರೆ ಬೇರು ಕೊಳೆಯಬಹುದು.'
                ]
            }
        },
        advisoryProfiles: {
            Wheat: {
                health: { status: 'statusGood', tip: 'ಉತ್ತರ ವಲಯಗಳಲ್ಲಿ ಬಲವಾದ ಬೆಳವಣಿಗೆ' },
                soil: { status: 'ಸಾರಜನಕ ಕಡಿಮೆ', tip: 'ಯೂರಿಯಾ ಬೇಕಾಗಿದೆ' },
                water: { status: 'ಮಧ್ಯಮ', tip: 'ಮುಂದಿನ ನೀರಾವರಿ 3 ದಿನಗಳಲ್ಲಿ' },
                risk: { status: 'ತುಕ್ಕು ರೋಗದ ಅಪಾಯ', tip: 'ಕೆಳಗಿನ ಎಲೆಗಳಲ್ಲಿ ಹಳದಿ ಕಲೆಗಳಿವೆಯೇ ಎಂದು ಪರೀಕ್ಷಿಸಿ' },
                summary: 'ಗೋಧಿಯು ಸಕ್ರಿಯ ಬೆಳವಣಿಗೆಯ ಹಂತದಲ್ಲಿದೆ. ಧಾನ್ಯದ ಬೆಳವಣಿಗೆಗೆ ಹವಾಮಾನವು ಉತ್ತಮವಾಗಿದೆ.'
            },
            Rice: {
                health: { status: 'statusExcellent', tip: 'ತೆನೆ ಬರುವ ಹಂತ ಪ್ರಾರಂಭವಾಗಿದೆ' },
                soil: { status: 'ಪೊಟ್ಯಾಶ್ ಅಗತ್ಯ', tip: 'ಬಲವಾದ ಕಾಂಡಗಳಿಗಾಗಿ MOP ಬಳಸಿ' },
                water: { status: 'ಗಂಭೀರ', tip: '5 ಸೆಂ.ಮೀ ನಿಂತ ನೀರನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ' },
                risk: { status: 'ಬ್ಲಾಸ್ಟ್ ಎಚ್ಚರಿಕೆ', tip: 'ಆರ್ದ್ರತೆ ಹೆಚ್ಚಿದೆ, ಎಲೆ ಬ್ಲಾಸ್ಟ್ ಗಮನಿಸಿ' },
                summary: 'ನಿಂತ ನೀರಿನ ಮಟ್ಟ ಉತ್ತಮವಾಗಿದೆ. ಶಾಖದ ಒತ್ತಡ ತಡೆಗಟ್ಟಲು ತೇವಾಂಶ ಕಾಪಾಡಿಕೊಳ್ಳಿ.'
            },
            Coconut: {
                health: { status: 'statusStable', tip: 'ಹೊಸ ಗರಿಗಳು ಬರುತ್ತಿವೆ' },
                soil: { status: 'ಬೋರಾನ್ ಕೊರತೆ', tip: 'ಕಾಯಿ ಉಳಿಸಿಕೊಳ್ಳಲು ಬೊರಾಕ್ಸ್ ಬಳಸಿ' },
                water: { status: 'ಬರಗಾಲದ ಅಪಾಯ', tip: 'ತಕ್ಷಣ ಆಳವಾದ ನೀರಾವರಿ ಅಗತ್ಯವಿದೆ' },
                risk: { status: 'ನುಸಿ ಎಚ್ಚರಿಕೆ', tip: 'ಎಳೆ ಕಾಯಿಗಳಲ್ಲಿ ಕಲೆಗಳಿವೆಯೇ ಎಂದು ಪರೀಕ್ಷಿಸಿ' },
                summary: 'ತೋಟದಲ್ಲಿ ತೇವಾಂಶದ ಕೊರತೆಯ ಲಕ್ಷಣಗಳು ಕಂಡುಬರುತ್ತಿವೆ. ಹನಿ ನೀರಾವರಿ ಹೆಚ್ಚಿಸಬೇಕು.'
            },
            Maize: {
                health: { status: 'statusVigorous', tip: 'ತೆನೆ ಬರುವ ಹಂತ ಹತ್ತಿರದಲ್ಲಿದೆ' },
                soil: { status: 'ಫಲವತ್ತಾಗಿದೆ', tip: 'ಪೋಷಕಾಂಶಗಳ ಮಟ್ಟ ಉತ್ತಮವಾಗಿದೆ' },
                water: { status: 'ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ', tip: 'ಪರಾಗಸ್ಪರ್ಶದ ಸಮಯದಲ್ಲಿ ನೀರಿನ ಅಗತ್ಯವಿದೆ' },
                risk: { status: 'ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು', tip: 'ಪೆರೋಮೋನ್ ಬಲೆಗಳಲ್ಲಿ ಚಟುವಟಿಕೆ ಕಂಡುಬಂದಿದೆ' },
                summary: 'ಬೆಳವಣಿಗೆ ವೇಗವಾಗಿದೆ. ಕಾಂಡದ ಬಲಕ್ಕಾಗಿ ಸಾರಜನಕ ಲಭ್ಯತೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.'
            },
            Onion: {
                health: { status: 'statusFair', tip: 'ಗಡ್ಡೆ ಕಟ್ಟುವ ಹಂತದಲ್ಲಿದೆ' },
                soil: { status: 'ಗಂಧಕದ ಅಗತ್ಯ', tip: 'ಉತ್ತಮ ಗುಣಮಟ್ಟಕ್ಕಾಗಿ ಗಂಧಕ ಬಳಸಿ' },
                water: { status: 'ನಿಖರತೆ', tip: 'ದಿನಬಿಟ್ಟು ದಿನ ಹಗುರ ನೀರಾವರಿ' },
                risk: { status: 'ನುಸಿ ಎಚ್ಚರಿಕೆ', tip: 'ಎಲೆಗಳ ಮೇಲೆ ಬೆಳ್ಳಿ ಗೆರೆಗಳು ಕಾಣಿಸುತ್ತಿವೆ' },
                summary: 'ನುಸಿಗಳ ಸಂಖ್ಯೆ ಹೆಚ್ಚಿದೆ. ಸಂಜೆಯ ಮೊದಲು ಸಾವಯವ ಸಿಂಪಡಣೆ ಮಾಡಿ.'
            }
        },
        wildlife: {
            header: 'ವನ್ಯಜೀವಿ ಪತ್ತೆ ಮತ್ತು ತಡೆಗಟ್ಟುವಿಕೆ',
            subtitle: 'AI ವನ್ಯಜೀವಿ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಅರಣ್ಯ ಇಲಾಖೆ ಎಚ್ಚರಿಕೆಗಳು',
            uploadTitle: 'ಸೆನ್ಸರ್/ಕ್ಯಾಮೆರಾ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
            uploadDesc: 'ವನ್ಯಜೀವಿ ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಹೊಲದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
            selectBtn: 'ಚಿತ್ರವನ್ನು ಆರಿಸಿ',
            detecting: 'ವನ್ಯಜೀವಿಗಳ ಬಗ್ಗೆ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
            detectBtn: 'ವನ್ಯಜೀವಿ ಪತ್ತೆಹಚ್ಚಿ',
            uploadNew: 'ಬೇರೆ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
            resultHeader: 'ಫಲಿತಾಂಶ',
            count: 'ಸಂಖ್ಯೆ',
            threat: 'ಅಪಾಯದ ಮಟ್ಟ',
            location: 'ಕೊನೆಯದಾಗಿ ಕಂಡ ಸ್ಥಳ',
            time: 'ಪತ್ತೆಯಾದ ಸಮಯ',
            notifyBtn: 'ಅರಣ್ಯ ಇಲಾಖೆಗೆ ತಿಳಿಸಿ',
            immediateActions: 'ತಕ್ಷಣದ ಕ್ರಮಗಳು',
            longTerm: 'ದೀರ್ಘಕಾಲೀನ ತಡೆಗಟ್ಟುವ ವಿಧಾನಗಳು',
            notified: 'ಅರಣ್ಯ ಇಲಾಖೆಗೆ ಯಶಸ್ವಿಯಾಗಿ ತಿಳಿಸಲಾಗಿದೆ! ಅವರು 24 ಗಂಟೆಗಳ ಒಳಗೆ ಸ್ಪಂದಿಸುತ್ತಾರೆ.',
            animals: {
                'Wild Boar': 'ಕಾಡು ಹಂದಿ',
                'Elephant': 'ಆನೆ',
                'Monkey': 'ಮಂಗ',
                'Deer': 'ಜಿಂಕೆ',
                'Tiger': 'ಹುಲಿ',
                'Lion': 'ಸಿಂಹ',
                'Leopard': 'ಚಿರತೆ',
                'Bear': 'ಕರಡಿ',
                'Wolf': 'ತೋಳ',
                'Fox': 'ನರಿ',
                'Bird': 'ಪಕ್ಷಿ',
                'Unknown': 'ಅಪರಿಚಿತ ಪ್ರಾಣಿ'
            },
            actions: [
                'ಬೆಳೆಗಳ ಸುತ್ತ ಎಲೆಕ್ಟ್ರಿಕಲ್ ಫೆನ್ಸಿಂಗ್ ಅಳವಡಿಸಿ',
                'ಲೈಟ್ ಮತ್ತು ಅಲಾರಂಗಳನ್ನು ಅಳವಡಿಸಿ',
                'ಮುಳ್ಳಿನ ಪೊದೆಗಳನ್ನು ಬಳಸಿ ತಡೆಗೋಡೆಗಳನ್ನು ನಿರ್ಮಿಸಿ',
                'ಸಕ್ರಿಯ ಮೇಲ್ವಿಚಾರಣೆಗಾಗಿ ನೆರೆಹೊರೆಯವರೊಂದಿಗೆ ಸಹಕರಿಸಿ'
            ],
            prevention: [
                'ಬಿದ್ದ ಹಣ್ಣುಗಳಂತಹ ಆಹಾರದ ಮೂಲಗಳನ್ನು ತೆಗೆದುಹಾಕಿ',
                'ಹೊಲಗಳ ಸುತ್ತ ಸ್ಪಷ್ಟ ಗಡಿಗಳನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ',
                'ವಾಸನೆ ಆಧಾರಿತ ವಿಕರ್ಷಕಗಳನ್ನು ಬಳಸಿ',
                'ಸಂಜೆ ಮತ್ತು ಮುಂಜಾನೆ ನಿಯಮಿತವಾಗಿ ಗಸ್ತು ತಿರುಗಿ'
            ],
            mock_locations: ['ಉತ್ತರ ವಲಯ - ಸೆಕ್ಟರ್ ಬಿ', 'ದಕ್ಷಿಣ ಗದ್ದೆ - ವಲಯ 4', 'ಪಶ್ಚಿಮ ಕಾಡು ಹಾದಿ', 'ಹಳ್ಳದ ಹತ್ತಿರ'],
            mock_times: ['ಈಗ ತಾನೇ ಪತ್ತೆಯಾಗಿದೆ', '15 ನಿಮಿಷಗಳ ಹಿಂದೆ ಪತ್ತೆಯಾಗಿದೆ', '1 ಗಂಟೆಯ ಹಿಂದೆ ಪತ್ತೆಯಾಗಿದೆ', '2 ಗಂಟೆಗಳ ಹಿಂದೆ ಪತ್ತೆಯಾಗಿದೆ']
        },
        soil: {
            header: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆ',
            subtitle: 'ಸಂಪೂರ್ಣ ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ಮೌಲ್ಯಮಾಪನ',
            uploadBtn: 'ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
            uploadDesc: 'ಬೆಂಬಲಿತ ವಿಧಗಳು: JPG, PNG',
            phHeader: 'ಮಣ್ಣಿನ pH ಆಯ್ಕೆಮಾಡಿ',
            phAcidic: 'ಆಮ್ಲೀಯ',
            phAlkaline: 'ಕ್ಷಾರೀಯ',
            colorHeader: 'ಮಣ್ಣಿನ ಬಣ್ಣ ಆಯ್ಕೆಮಾಡಿ',
            analyzeBtn: 'ಮಣ್ಣನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
            analyzing: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
            resultHeader: 'ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣಾ ಫಲಿತಾಂಶಗಳು',
            type: 'ಮಣ್ಣಿನ ವಿಧ',
            moisture: 'ತೇವಾಂಶ',
            organic: 'ಸಾವಯವ ಅಂಶ',
            nutrients: 'NPK ಪೋಷಕಾಂಶ ಮಟ್ಟಗಳು',
            recommendations: 'ಗೊಬ್ಬರದ ಶಿಫಾರಸುಗಳು',
            cropHeader: 'ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆಗಳು (ಪ್ರಸ್ತುತ ಹಂಗಾಮು)',
            alsoSuitable: 'ನಿಮ್ಮ ಮಣ್ಣಿಗೆ ಇವುಗಳು ಕೂಡ ಸೂಕ್ತವಾಗಿವೆ:',
            colors: {
                'Dark Brown': 'ಗಾಢ ಕಂದು',
                'Light Brown': 'ತಿಳಿ ಕಂದು',
                'Red': 'ಕೆಂಪು',
                'Yellow': 'ಹಳದಿ',
                'Black': 'ಕಪ್ಪು',
                'Gray': 'ಬೂದು'
            },
            types: {
                Loamy: 'ಜೇಡಿ ಮಿಶ್ರಿತ ಮಣ್ಣು',
                Sandy: 'ಮರಳು ಮಣ್ಣು',
                Clay: 'ಜೇಡಿ ಮಣ್ಣು',
                Silt: 'ಹೂಳು ಮಣ್ಣು'
            },
            periods: {
                'Split application': 'ವಿಭಜಿತ ಅನ್ವಯ (ಆರಂಭಿಕ ಮತ್ತು ಮಧ್ಯ ಹಂತ)',
                'Basal dose': 'ಮೂಲ ಪ್ರಮಾಣ (ಬಿತ್ತನೆ ಸಮಯದಲ್ಲಿ)',
                'With DAP': 'ಡಿಎಪಿ ಜೊತೆಗೆ'
            }
        },
        weather: {
            header: 'ಹವಾಮಾನ ಮತ್ತು ಹವಾಮಾನ ಸಹಾಯಕ',
            subtitle: 'ನಿಖರ ಕೃಷಿ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು',
            fetching: 'ಸ್ಥಳೀಯ ಹವಾಮಾನ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...',
            alertsHeader: 'ಹವಾಮಾನ ಸ್ಮಾರ್ಟ್ ಎಚ್ಚರಿಕೆಗಳು',
            alertsSubtitle: 'ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಲು ನಿಮ್ಮ ಪ್ರದೇಶದ ನಿರ್ಣಾಯಕ ಎಚ್ಚರಿಕೆಗಳು',
            recommendations: 'ಕೃಷಿ ಶಿಫಾರಸುಗಳು',
            alert: 'ಎಚ್ಚರಿಕೆ',
            days: {
                Mon: 'ಸೋಮ', Tue: 'ಮಂಗಳ', Wed: 'ಬುಧ', Thu: 'ಗುರು', Fri: 'ಶುಕ್ರ', Sat: 'ಶನಿ', Sun: 'ಭಾನು'
            },
            conditions: {
                sunny: 'ಬಿಸಿಲು',
                'partly-cloudy': 'ಭಾಗಶಃ ಮೋಡ',
                rainy: 'ಮಳೆ',
                cloudy: 'ಮೋಡ'
            }
        },
        water: {
            header: 'ನೀರು ಮತ್ತು ನೀರಾವರಿ ಸಲಹೆಗಾರ',
            subtitle: 'ಸ್ಮಾರ್ಟ್ ನೀರು ನಿರ್ವಹಣೆ ಮತ್ತು ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ',
            moistureHeader: 'ಪ್ರಸ್ತುತ ಮಣ್ಣಿನ ತೇವಾಂಶ',
            tempHeader: 'ತಾಪಮಾನ',
            stageHeader: 'ಬೆಳೆ ಬೆಳೆಯುವ ಹಂತ',
            cropHeader: 'ಬೆಳೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
            selectCrop: 'ಬೆಳೆಯನ್ನು ಆರಿಸಿ...',
            crops: {
                rice: 'ಭತ್ತ',
                wheat: 'ಗೋಧಿ',
                cotton: 'ಹತ್ತಿ',
                sugarcane: 'ಕಬ್ಬು',
                tomato: 'ಟೊಮೆಟೊ',
                potato: 'ಆಲೂಗಡ್ಡೆ'
            },
            calcBtn: 'ನೀರಾವರಿ ಅಗತ್ಯತೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ',
            requirement: 'ನೀರಾವರಿ ಅಗತ್ಯತೆ',
            status: {
                high: 'ಹೆಚ್ಚಿನ ಆದ್ಯತೆ',
                medium: 'ಮಧ್ಯಮ ಅಗತ್ಯತೆ',
                low: 'ಕಡಿಮೆ ಆದ್ಯತೆ'
            },
            schedule: 'ಶಿಫಾರಸು ಮಾಡಿದ ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ',
            amount: 'ಪ್ರಮಾಣ',
            frequency: 'ಆವರ್ತನ',
            time: 'ಅತ್ಯುತ್ತಮ ಸಮಯ',
            freq: {
                daily: 'ದಿನನಿತ್ಯ',
                every2: 'ಪ್ರತಿ 2 ದಿನಕ್ಕೊಮ್ಮೆ',
                every3: 'ಪ್ರತಿ 3 ದಿನಕ್ಕೊಮ್ಮೆ'
            },
            params: {
                dry: 'ಒಣಗಿದ',
                wet: 'ತೇವ',
                cool: 'ತಂಪು',
                hot: 'ಬಿಸಿ'
            },
            bestTime: 'ಮುಂಜಾನೆ',
            tipsHeader: 'ನೀರನ್ನು ಉಳಿಸುವ ಸಲಹೆಗಳು',
            tips: [
                'ನೀರಿನ ಉಳಿತಾಯಕ್ಕಾಗಿ ಹನಿ ನೀರಾವರಿ ಬಳಸಿ',
                'ತೇವಾಂಶ ಉಳಿಸಿಕೊಳ್ಳಲು ಮಣ್ಣಿನ ಹೊದಿಕೆ ಬಳಸಿ',
                'ತಂಪಾದ ಸಮಯದಲ್ಲಿ ನೀರು ಹಾಯಿಸಿ',
                'ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ನಿಯಮಿತವಾಗಿ ಗಮನಿಸಿ'
            ],
            stages: {
                germination: 'ಮೊಳಕೆಯೊಡೆಯುವಿಕೆ',
                vegetative: 'ಬೆಳವಣಿಗೆ',
                flowering: 'ಹೂಬಿಡುವಿಕೆ',
                fruiting: 'ಕಾಯಿ ಬಿಡುವಿಕೆ'
            }
        },
        auth: {
            loginHeader: 'ರೈತ ಮಿತ್ರರೇ, ಸುಸ್ವಾಗತ',
            loginSubtitle: 'ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಕೃಷಿ ಪ್ರಯಾಣವನ್ನು ಮುಂದುವರಿಸಿ',
            phone: 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ',
            password: 'ಪಾಸ್‌ವರ್ಡ್',
            loginBtn: 'ಲಾಗಿನ್ ಮಾಡಿ',
            noAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
            registerLink: 'ಇಲ್ಲಿ ನೋಂದಾಯಿಸಿ',
            regHeader: 'ಕೃಷಿಸಾರಥಿ AI ಗೆ ಸೇರಿ',
            regSubtitle: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಶಕ್ತಿಯನ್ನು ಪಡೆಯಲು ನೋಂದಾಯಿಸಿ',
            fullName: 'ಪೂರ್ಣ ಹೆಸರು',
            location: 'ಸ್ಥಳ (ಗ್ರಾಮ/ಪಟ್ಟಣ)',
            regBtn: 'ಖಾತೆ ತೆರೆಯಿರಿ',
            hasAccount: 'ಖಾತೆ ಈಗಾಗಲೇ ಇದೆಯೇ?',
            loginLink: 'ಇಲ್ಲಿ ಲಾಗಿನ್ ಮಾಡಿ',
        },
        chatbot: {
            title: 'ಕೃಷಿಸಾರಥಿ AI',
            subtitle: 'ನಿಮ್ಮ ಕೃಷಿ ಸಹಾಯಕ',
            welcome: 'ನಮಸ್ಕಾರ! ನಾನು ಕೃಷಿಸಾರಥಿ AI, ನಿಮ್ಮ ಕೃಷಿ ಸಹಾಯಕ. ನಾನು ನಿಮಗೆ ಇಂದು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
            error: "ನನಗೆ ಈಗ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ನಂತರ ಪ್ರಯತ್ನಿಸಿ!",
            placeholder: 'ಏನನ್ನಾದರೂ ಕೇಳಿ...',
            quickQuestions: 'ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು:',
            aiLabel: 'AI ಸಹಾಯಕ',
            suggestions: [
                'ರಬಿ ಹಂಗಾಮಿನಲ್ಲಿ ನಾನು ಯಾವ ಬೆಳೆಗಳನ್ನು ಬೆಳೆಯಬೇಕು?',
                'ಮಣ್ಣಿನ ಫಲವತ್ತತೆಯನ್ನು ಸುಧಾರಿಸುವುದು ಹೇಗೆ?',
                'ಅತ್ಯುತ್ತಮ ನೀರಾವರಿ ಪದ್ಧತಿಗಳು ಯಾವುವು?',
                'ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಎಷ್ಟಿವೆ?'
            ]
        },
        crops: {
            Wheat: 'ಗೋಧಿ',
            Rice: 'ಅಕ್ಕಿ',
            Coconut: 'ತೆಂಗಿನಕಾಯಿ',
            Maize: 'ಮೆಕ್ಕೆಜೋಳ',
            Onion: 'ಈರುಳ್ಳಿ',
            Cotton: 'ಹತ್ತಿ',
            Soybean: 'ಸೋಯಾಬೀನ್',
            Tomato: 'ಟೊಮೆಟೊ',
            Potato: 'ಆಲೂಗಡ್ಡೆ',
            Barley: 'ಬಾರ್ಲಿ',
            Gram: 'ಕಡಲೆ',
            Peas: 'ಬಟಾಣಿ',
            Mustard: 'ಸಾಸಿವೆ',
            Lentil: 'ಹೆಸರು ಬೇಳೆ',
            Bajra: 'ಸಜ್ಜೆ',
            Jowar: 'ಜೋಳ',
            Corn: 'ಮೆಕ್ಕೆಜೋಳ'
        }
    },
    hi: {
        nav: {
            home: 'होम',
            scan: 'स्कैन',
            soil: 'मिट्टी',
            water: 'पानी',
            weather: 'मौसम',
            wildlife: 'वन्यजीव',
            market: 'बाज़ार',
            advisory: 'सलाह',
            profile: 'प्रोफ़ाइल',
        },
        dashboard: {
            welcome: 'कृषिसारथी AI में आपका स्वागत है',
            subtitle: 'AI द्वारा संचालित आपका व्यापक खेती साथी',
            tools: 'स्मार्ट खेती उपकरण',
            seasonalGuide: 'मौसमी फसल गाइड',
            rabi: 'रबी सीजन (सर्दियों)',
            kharif: 'खरीफ सीजन (मानसून)',
            rabiSeason: 'रबी सीजन की फसलें',
            rabiMonths: 'अक्टूबर - मार्च (सर्दी का मौसम)',
            kharifSeason: 'खरीफ सीजन की फसलें',
            kharifMonths: 'जून - अक्टूबर (मानसून का मौसम)',
            recommended: 'अनुशंसित फसलें:',
            rabiNote: 'कम तापमान के लिए सर्वोत्तम • कम पानी की आवश्यकता',
            kharifNote: 'गर्म और आर्द्र परिस्थितियों में पनपता है • मानसून पर निर्भर',
            scanning: 'फसल रोग स्कैनर',
            scanningDesc: 'AI-संचालित फसल रोग का पता लगाना और उपचार की सिफारिशें',
            soil: 'मिट्टी और उर्वरता विश्लेषण',
            soilDesc: 'व्यापक मिट्टी स्वास्थ्य जांच और पोषक तत्वों की सिफारिशें',
            water: 'जल और सिंचाई सलाहकार',
            waterDesc: 'स्मार्ट जल प्रबंधन और सिंचाई समय निर्धारण',
            weather: 'मौसम और जलवायु अलर्ट',
            weatherDesc: '7-दिवसीय पूर्वानुमान और चरम मौसम सूचनाएं',
            wildlife: 'वन्यजीव पहचान और रोकथाम',
            wildlifeDesc: 'AI वन्यजीव निगरानी और वन विभाग अलर्ट',
            market: 'बाज़ार मूल्य पूवानुमान',
            marketDesc: 'वास्तविक समय मंडी की कीमतें और सर्वोत्तम विक्री पूर्वानुमान',
            advisory: 'दैनिक स्मार्ट सलाहकार',
            advisoryDesc: 'व्यक्तिगत खेती अंतर्दृष्टि और AI सिफारिशें',
        },
        profile: {
            header: 'किसान प्रोफ़ाइल',
            subtitle: 'अपनी खेती प्रोफ़ाइल और प्राथमिकताओं को प्रबंधित करें',
            name: 'पूरा नाम',
            email: 'इमेल पता',
            phone: 'फ़ोन नंबर',
            location: 'स्थान (गांव/कस्बा)',
            save: 'प्रोफ़ाइल सहेजें',
            saving: 'सहेजा जा रहा है...',
            success: 'सफलतापूर्वक सहेजा गया!',
            statsHeader: 'फसल और भूमि सांख्यिकी',
            healthStatus: 'स्वस्थ',
            verified: 'सत्यापित किसान',
            standard: 'मानक खाता',
        },
        market: {
            header: 'बाज़ार विश्लेषण',
            subtitle: 'अनुमानित मूल्य निर्धारण और रीयल-टाइम मंडी ट्रैकिंग',
            selectCrop: 'फसल चुनें:',
            price: 'बाज़ार मूल्य',
            change: 'साप्ताहिक परिवर्तन',
            peak: 'पूर्वानुमान शिखर',
            hotMandi: 'प्रमुख मंडी',
            chartTitle: 'मूल्य सूचकांक (7-दिवसीय इतिहास)',
            mandiTitle: 'क्षेत्रीय लाइव मंडी डेटा',
        },
        advisory: {
            header: 'दैनिक स्मार्ट सलाह',
            subtitle: 'आपके खेत के लिए वास्तविक दुनिया की अंतर्दृष्टि',
            selectCrop: 'मेरी फसल:',
            summary: 'स्वास्थ्य रिपोर्ट',
            askAI: 'कृषिसारथी AI से सलाह लें',
            askBtn: 'AI से पूछें',
            analyzing: 'AI विश्लेषण हो रहा है...',
            askPlaceholder: 'के बारे में पूछें',
            health: 'फसल स्वास्थ्य',
            soil: 'मिट्टी के पोषक तत्व',
            water: 'जल स्तर',
            statusGood: 'अच्छा',
            statusExcellent: 'उत्कृष्ट',
            statusStable: 'स्थिर',
            statusVigorous: 'जोरदार',
            statusFair: 'ठीक-ठाक',
            asOfToday: 'आज का विश्लेषण'
        },
        scanner: {
            header: 'कृषिसारथी फसल डॉक्टर',
            subtitle: 'AI-संचालित पौधे के रोग की पहचान और उपचार सिफारिशें',
            dropzone: 'पहचान शुरू करने के लिए फसल की छवि यहाँ छोड़ें',
            uploadBtn: 'खेत की छवि अपलोड करें',
            analyzing: 'पौधे का विश्लेषण जारी है...',
            diagnoseBtn: 'जांच शुरू करें',
            cancel: 'रद्द करें',
            confidence: 'विश्वास',
            treatmentPlan: 'अनुशंसित उपचार योजना',
            recentScans: 'हाल के स्कैन',
            scanNext: 'अगले पौधे को स्कैन करें',
            severity: 'गंभीरता',
            none: 'कोई नहीं',
            low: 'कम',
            medium: 'मध्यम',
            high: 'उच्च',
            critical: 'गंभीर',
            treatments: {
                healthy: [
                    'रूटीन: हर 4 सप्ताह में संतुलित NPK 10-10-10 उर्वरक दें।',
                    'पानी: नियमित रूप से पानी दें (सप्ताह में 1-2 इंच)।',
                    'निगरानी: साप्ताहिक रूप से कीटों की जाँच करें।'
                ],
                fungal: [
                    'कवकनाशी: हर 7-10 दिनों में क्लोरोथालोनिल या मैनकोज़ेब का छिड़काव करें।',
                    'उर्वरक: उच्च नाइट्रोजन का प्रयोग बंद करें। उच्च-पोटेशियम NPK 5-10-10 का उपयोग करें।',
                    'स्वच्छता: हवा के प्रवाह को सुधारने के लिए निचली पीली पत्तियों को हटा दें।',
                    'सिंचाई: केवल ड्रिप सिंचाई। पत्तियों को 100% सूखा रखें।'
                ],
                viral: [
                    'कंट्रोल: एफिड्स/थ्रिप्स को मारने के लिए इमिडाक्लोप्रिड या नीम के तेल (0.5%) का छिड़काव करें।',
                    'रोग प्रतिरोधक क्षमता: सूक्ष्म पोषक तत्व (जिंक, मैग्नीशियम, लोहा) लगाएं।',
                    'कोई इलाज नहीं: संक्रमित पौधों को ठीक नहीं किया जा सकता है। शेष को बचाने पर ध्यान दें।',
                    'निवारण: अगले सीजन में वायरस-प्रतिरोधी बीज किस्मों का उपयोग करें।'
                ],
                bacterial: [
                    'रसायन: तुरंत कॉपर हाइड्रोक्साइड का छिड़काव करें।',
                    'उर्वरक: संतुलित NPK 10-10-10 का उपयोग करें। अतिरिक्त नाइट्रोजन से बचें।',
                    'मौसम: गीले मौसम में बैक्टीरिया फैलता है। गीले होने पर पौधों को न छुएं।',
                    'उपकरण: प्रूनिंग कतरनी को 10% ब्लीच घोल में डुबोएं।'
                ],
                pests: [
                    'कीटनाशक: कीड़ों/भृंगों के लिए स्पिनोसैड या साइपरमेथ्रिन लगाएं।',
                    'माइट्स: अबामेक्टिन या विशेष कीटनाशकों का प्रयोग करें।',
                    'जैविक: हर 5 दिन में नीम का तेल उपयोग करें।'
                ],
                general: [
                    'सामान्य उपचार: ब्रॉड-स्पेक्ट्रम कॉपर फंगिसाइड लगाएं।',
                    'उर्वरक: संतुलित NPK 10-10-10 लगाएं।',
                    'पानी: खेत की जल निकासी व्यवस्था में सुधार करें।'
                ]
            }
        },
        advisoryProfiles: {
            Wheat: {
                health: { status: 'statusGood', tip: 'उत्तरी क्षेत्रों में जोरदार वृद्धि' },
                soil: { status: 'नाइट्रोजन की कमी', tip: 'यूरिया की आवश्यकता है' },
                water: { status: 'मध्यम', tip: 'अगली सिंचाई 3 दिनों में' },
                risk: { status: 'रस्ट का खतरा', tip: 'नीचे की पत्तियों पर पीले धब्बे देखें' },
                summary: 'गेहूं सक्रिय विकास चरण में है। दाने के विकास के लिए जलवायु अनुकूल है।'
            },
            Rice: {
                health: { status: 'statusExcellent', tip: 'बाली आने की प्रक्रिया शुरू' },
                soil: { status: 'पोटाश की आवश्यकता', tip: 'मजबूत तनों के लिए MOP लगाएं' },
                water: { status: 'गंभीर', tip: '5 सेमी खड़ा पानी बनाए रखें' },
                risk: { status: 'ब्लास्ट की चेतावनी', tip: 'नमी अधिक है, लीफ ब्लास्ट पर नज़र रखें' },
                summary: 'खड़े पानी का स्तर अच्छा है। गर्मी के तनाव को रोकने के लिए नमी बनाए रखें।'
            },
            Coconut: {
                health: { status: 'statusStable', tip: 'नई पत्तियों का निकलना शुरू' },
                soil: { status: 'बोरोन की कमी', tip: 'फलों को रोकने के लिए बोरेक्स लगाएं' },
                water: { status: 'सूखे का खतरा', tip: 'तुरंत गहरी सिंचाई की आवश्यकता है' },
                risk: { status: 'माइट अलर्ट', tip: 'छोटे फलों पर दागों की जांच करें' },
                summary: 'बागान में नमी के तनाव के लक्षण दिख रहे हैं। ड्रिप सिंचाई बढ़ानी होगी।'
            },
            Maize: {
                health: { status: 'statusVigorous', tip: 'सिल्किंग चरण करीब है' },
                soil: { status: 'समृद्ध', tip: 'सिल्किंग के लिए पोषक तत्व आदर्श हैं' },
                water: { status: 'उच्च मांग', tip: 'परागण के दौरान पानी की आवश्यकता' },
                risk: { status: 'तना छेदक', tip: 'फेरोमोन ट्रैप में गतिविधि दिख रही है' },
                summary: 'वृद्धि तेजी से हो रही है। तने की मजबूती के लिए नाइट्रोजन सुनिश्चित करें.'
            },
            Onion: {
                health: { status: 'statusFair', tip: 'गांठ बनने की प्रक्रिया जारी' },
                soil: { status: 'सल्फर की आवश्यकता', tip: 'बेहतर स्वाद के लिए सल्फर लगाएं' },
                water: { status: 'सटीक', tip: 'एक दिन छोड़कर हल्की सिंचाई' },
                risk: { status: 'थ्रिप्स अलर्ट', tip: 'पत्तियों पर चांदी जैसी धारियां दिख रही हैं' },
                summary: 'थ्रिप्स की संख्या अधिक है। शाम से पहले जैविक स्प्रे की सलाह दी जाती है।'
            }
        },
        wildlife: {
            header: 'वन्यजीव पहचान और रोकथाम',
            subtitle: 'AI वन्यजीव निगरानी और वन विभाग अलर्ट',
            uploadTitle: 'सेंसर/कैमरा छवि अपलोड करें',
            uploadDesc: 'वन्यजीव विश्लेषण के लिए खेत की एक स्पष्ट छवि अपलोड करें',
            selectBtn: 'छवि चुनें',
            detecting: 'वन्यजीवों का विश्लेषण किया जा रहा है...',
            detectBtn: 'वन्यजीवों का पता लगाएं',
            uploadNew: 'अलग छवि अपलोड करें',
            resultHeader: 'पहचान परिणाम',
            count: 'संख्या',
            threat: 'खतरे का स्तर',
            location: 'आखिरी बार देखे जाने का स्थान',
            time: 'पहचान का समय',
            notifyBtn: 'वन विभाग को सूचित करें',
            immediateActions: 'तत्काल प्रतिक्रिया कार्य',
            longTerm: 'दीर्घकालिक रोकथाम के तरीके',
            notified: 'वन विभाग को सफलतापूर्वक सूचित कर दिया गया है! वे 24 घंटों के भीतर जवाब देंगे।',
            animals: {
                'Wild Boar': 'जंगली सूअर',
                'Elephant': 'हाथी',
                'Monkey': 'बंदर',
                'Deer': 'हिरण',
                'Tiger': 'बाघ',
                'Lion': 'शेर',
                'Leopard': 'तेंदुआ',
                'Bear': 'भालू',
                'Wolf': 'भेड़िया',
                'Fox': 'लोमड़ी',
                'Bird': 'पक्ष पक्षी',
                'Unknown': 'अज्ञात जानवर'
            },
            actions: [
                'कमजोर फसलों के चारों ओर बिजली की बाड़ लगाएं',
                'मोशन-सक्रिय लाइट और अलार्म लगाएं',
                'कांटेदार झाड़ियों का उपयोग करके भौतिक बाधाएं बनाएं',
                'समूह निगरानी के लिए पड़ोसियों के साथ समन्वय करें'
            ],
            prevention: [
                'गिरे हुए फलों जैसे खाद्य स्रोतों को हटा दें',
                'खेतों के चारों ओर स्पष्ट सीमाएं बनाए रखें',
                'गंध आधारित विकर्षक का उपयोग करें',
                'शाम और सुबह के दौरान नियमित गश्त करें'
            ],
            mock_locations: ['उत्तरी क्षेत्र - सेक्टर बी', 'दक्षिणी तट - जोन 4', 'पश्चिमी वन किनारा', 'नदी के पास'],
            mock_times: ['अभी पता चला', '15 मिनट पहले पता चला', '1 घंटे पहले पता चला', '2 घंटे पहले पता चला']
        },
        soil: {
            header: 'मिट्टी स्वास्थ्य विश्लेषण',
            subtitle: 'व्यापक मिट्टी उर्वरता और पोषक तत्व मूल्यांकन',
            uploadBtn: 'छवि अपलोड करें',
            uploadDesc: 'समर्थित: JPG, PNG',
            phHeader: 'मिट्टी pH चुनें',
            phAcidic: 'अम्लीय',
            phAlkaline: 'क्षारीय',
            colorHeader: 'मिट्टी का रंग चुनें',
            analyzeBtn: 'मिट्टी विश्लेषण करें',
            analyzing: 'विश्लेषण हो रहा है...',
            resultHeader: 'मिट्टी विश्लेषण परिणाम',
            type: 'मिट्टी का प्रकार',
            moisture: 'नमी',
            organic: 'जैविक तत्व',
            nutrients: 'NPK पोषक तत्व स्तर',
            recommendations: 'उर्वरक सिफारिशें',
            cropHeader: 'अनुशंसित फसलें (वर्तमान सीजन)',
            alsoSuitable: 'आपकी मिट्टी के लिए ये भी उपयुक्त हैं:',
            colors: {
                'Dark Brown': 'गहरा भूरा',
                'Light Brown': 'हल्का भूरा',
                'Red': 'लाल',
                'Yellow': 'पीला',
                'Black': 'काला',
                'Gray': 'धूसर/स्लेटी'
            },
            types: {
                Loamy: 'दोमट मिट्टी',
                Sandy: 'रेतीली मिट्टी',
                Clay: 'चिकनी मिट्टी',
                Silt: 'गाद मिट्टी'
            },
            periods: {
                'Split application': 'विभाजित प्रयोग (प्रारंभिक और मध्य)',
                'Basal dose': 'आधार खुराक (बुवाई के समय)',
                'With DAP': 'डीएपी के साथ'
            }
        },
        weather: {
            header: 'मौसम और जलवायु सहायक',
            subtitle: 'सटीक कृषि मौसम पूर्वानुमान और जलवायु-स्मार्ट अलर्ट',
            fetching: 'स्थानीय मौसम डेटा प्राप्त किया जा रहा है...',
            alertsHeader: 'जलवायु स्मार्ट अलर्ट',
            alertsSubtitle: 'आपकी फसलों की रक्षा के लिए आपके क्षेत्र के लिए गंभीर अलर्ट',
            recommendations: 'खेती की सिफारिशें',
            alert: 'अलर्ट',
            days: {
                Mon: 'सोम', Tue: 'मंगल', Wed: 'बुध', Thu: 'गुरु', Fri: 'शुक्र', Sat: 'शनि', Sun: 'रवि'
            },
            conditions: {
                sunny: 'धूप',
                'partly-cloudy': 'आंशिक रूप से बादल',
                rainy: 'बारिश',
                cloudy: 'बादल'
            }
        },
        water: {
            header: 'जल और सिंचाई सलाहकार',
            subtitle: 'स्मार्ट जल प्रबंधन और सिंचाई समय निर्धारण',
            moistureHeader: 'वर्तमान मिट्टी की नमी',
            tempHeader: 'तापमान',
            stageHeader: 'फसल वृद्धि चरण',
            cropHeader: 'फसल चुनें',
            selectCrop: 'एक फसल चुनें...',
            crops: {
                rice: 'चावल',
                wheat: 'गेहूँ',
                cotton: 'कपास',
                sugarcane: 'गन्ना',
                tomato: 'टमाटर',
                potato: 'आलू'
            },
            calcBtn: 'सिंचाई की आवश्यकता की गणना करें',
            requirement: 'सिंचाई की आवश्यकता',
            status: {
                high: 'उच्च प्राथमिकता',
                medium: 'मध्यम आवश्यकता',
                low: 'कम प्राथमिकता'
            },
            schedule: 'अनुशंसित सिंचाई कार्यक्रम',
            amount: 'मात्रा',
            frequency: 'आवृत्ति',
            time: 'सबसे अच्छा समय',
            freq: {
                daily: 'दैनिक',
                every2: 'हर 2 दिन में',
                every3: 'हर 3 दिन में'
            },
            params: {
                dry: 'सूखा',
                wet: 'गीला',
                cool: 'ठंडा',
                hot: 'गर्म'
            },
            bestTime: 'सुबह जल्दी',
            tipsHeader: 'जल संरक्षण युक्तियाँ',
            tips: [
                'पानी की दक्षता के लिए ड्रिप सिंचाई का उपयोग करें',
                'नमी बनाए रखने के लिए पौधों के चारों ओर मल्च लगाएं',
                'दिन के ठंडे समय में पानी दें',
                'नियमित रूप से मिट्टी की नमी की निगरानी करें'
            ],
            stages: {
                germination: 'अंकुरण',
                vegetative: 'वृद्धि',
                flowering: 'फूल आना',
                fruiting: 'फल लगना'
            }
        },
        auth: {
            loginHeader: 'किसान मित्र, आपका स्वागत है',
            loginSubtitle: 'अपनी डिजिटल खेती की यात्रा जारी रखें',
            phone: 'फ़ोन नंबर',
            password: 'पासवर्ड',
            loginBtn: 'लॉगिन करें',
            noAccount: "खाता नहीं है?",
            registerLink: 'यहाँ रजिस्टर करें',
            regHeader: 'कृषिसारथी AI से जुड़ें',
            regSubtitle: 'स्मार्ट खेती की शक्ति अनलॉक करने के लिए रजिस्टर करें',
            fullName: 'पूरा नाम',
            location: 'स्थान (गांव/शहर)',
            regBtn: 'खाता बनाएँ',
            hasAccount: 'पहले से ही खाता है?',
            loginLink: 'यहाँ लॉगिन करें',
        },
        chatbot: {
            title: 'कृषिसारथी AI',
            subtitle: 'आपका खेती सहायक',
            welcome: 'नमस्ते! मैं कृषिसारथी AI हूँ, आपका खेती सहायक। मैं आज आपकी कैसे मदद कर सकता हूँ?',
            error: "मुझे अभी जुड़ने में समस्या हो रही है। कृपया बाद में पुनः प्रयास करें!",
            placeholder: 'मुझसे कुछ भी पूछें...',
            quickQuestions: 'त्वरित प्रश्न:',
            aiLabel: 'AI सहायक',
            suggestions: [
                'मुझे रबी सीजन में कौन सी फसलें लगानी चाहिए?',
                'मिट्टी की उर्वरता कैसे सुधारें?',
                'सर्वोत्तम सिंचाई पद्धतियां क्या हैं?',
                'वर्तमान बाजार दरें क्या हैं?'
            ]
        },
        crops: {
            Wheat: 'गेंहू',
            Rice: 'चावल',
            Coconut: 'नारियल',
            Maize: 'मक्का',
            Onion: 'प्याज',
            Cotton: 'कपास',
            Soybean: 'सोयाबीन',
            Tomato: 'टमाटर',
            Potato: 'आलू',
            Barley: 'जौ',
            Gram: 'चना',
            Peas: 'मटर',
            Mustard: 'सरसों',
            Lentil: 'दाल',
            Bajra: 'बाजरा',
            Jowar: 'ज्वार',
            Corn: 'मक्का'
        }
    }
};
