/* ============================================================================
   MODEL - DATA LAYER (MVC Architecture) - CLIMATE SYMPOSIUM 2025 (FIXED)
   ============================================================================ */

/**
 * ConferenceModel - Manages all data and business logic for Climate Symposium
 */
class ConferenceModel {
    constructor() {
        // Conference dates for Climate Symposium 2025 - UPDATED FOR CURRENT DATE
        this.conferenceDates = {
            'Day 1': '2025-09-28',           // TODAY - September 28th
            'Day 2': '2025-09-29'            // Tomorrow - September 29th
        };
        
        // Automatically detect current day based on real date
        this.currentDay = this.detectCurrentDay();
        console.log(`Climate Symposium day automatically detected: ${this.currentDay}`);
        
        // Climate Symposium 2025 agenda data - EXTENDED CONFERENCE DINNER
        this.allAgendaData = {
            'Day 1': [
                {
                    time: "09:00",
                    displayTime: "9:00 AM",
                    title: "Registration",
                    description: "Registration and welcome coffee for Day 1 participants.",
                    duration: 20
                },
                {
                    time: "09:30",
                    displayTime: "9:30 AM",
                    title: "Inauguration Session (#250)",
                    description: "Opening ceremony and welcome remarks for the Symposium on Climate Actions 2025.",
                    duration: 90
                },
                {
                    time: "11:00",
                    displayTime: "11:00 AM",
                    title: "Tea Break",
                    description: "Morning tea break and networking session.",
                    duration: 30
                },
                {
                    time: "11:30",
                    displayTime: "11:30 AM",
                    title: "Symposium Highlight (#200): From the Ground Up",
                    description: "Sharing Community-Level Impacts for National Climate Policy & Action",
                    duration: 90
                },
                {
                    time: "13:00",
                    displayTime: "1:00 PM",
                    title: "Lunch",
                    description: "Lunch break and informal networking.",
                    duration: 60
                },
                {
                    time: "14:00",
                    displayTime: "2:00 PM",
                    title: "Opening of the Poster Presentation (All)",
                    description: "Poster session opening with all presentations available for viewing.",
                    duration: 60
                },
                {
                    time: "15:00",
                    displayTime: "3:00 PM",
                    title: "Technical Session 01 A - Rehabilitation & Modernization",
                    description: "Rehabilitation, upgrading and modernization of village irrigation systems",
                    duration: 90
                },
                {
                    time: "15:00",
                    displayTime: "3:00 PM",
                    title: "Technical Session 01 B - Climate Advisories",
                    description: "Climate advisories and early warnings: recent innovations, successes and constraints in local adaptation",
                    duration: 90
                },
                {
                    time: "15:00",
                    displayTime: "3:00 PM",
                    title: "Side Event 01 - Policy Formulation",
                    description: "Lessons from the Project on Policy Formulation for Sub-National Stakeholders (#100)",
                    duration: 90
                },
                {
                    time: "16:30",
                    displayTime: "4:30 PM",
                    title: "Tea Break",
                    description: "Afternoon tea break.",
                    duration: 30
                },
                {
                    time: "17:00",
                    displayTime: "5:00 PM",
                    title: "Side Event 02 - Building Climate-Resilient Communities",
                    description: "Closed Door Event for Targeted Invitees - Building Climate-Resilient Rural Communities: Aligning Donor Support with Praja Shakthi's Vision",
                    duration: 90
                },
                {
                    time: "17:00",
                    displayTime: "5:00 PM",
                    title: "Side Event 03 - Design of MSc UOP Event (#25)",
                    description: "Design of MSc - UOP Event focusing on climate action methodologies",
                    duration: 90
                },
                {
                    time: "17:00",
                    displayTime: "5:00 PM",
                    title: "Side Event 04 - Collective Climate Actions (#40)",
                    description: "Collective climate actions - GCF Knuckles Project implementation strategies",
                    duration: 90
                },
                {
                    time: "19:00",
                    displayTime: "7:00 PM",
                    title: "Conference Dinner (#150)",
                    description: "Conference dinner and networking event for Day 1 participants. Extended celebration until midnight!",
                    duration: 300  // EXTENDED TO 5 HOURS (until midnight)
                }
            ],

            'Day 2': [
                {
                    time: "09:00",
                    displayTime: "9:00 AM",
                    title: "Technical Session 02 A - Local Climate Adaptation",
                    description: "Climate change adaptation at the local level: challenges and lessons learned (#35)",
                    duration: 90
                },
                {
                    time: "09:00",
                    displayTime: "9:00 AM",
                    title: "Technical Session 02 B - Gender & Social Inclusion",
                    description: "Gender equity, social inclusion and youth in climate adaptation",
                    duration: 90
                },
                {
                    time: "09:00",
                    displayTime: "9:00 AM",
                    title: "Side Event 05 - IWMI Scaling Solutions (#30)",
                    description: "IWMI Scaling Climate-Resilient Water Solutions through Research, Innovation, and Community",
                    duration: 90
                },
                {
                    time: "10:30",
                    displayTime: "10:30 AM",
                    title: "Opening of the Poster Presentation & Tea Break",
                    description: "Poster presentation session opening and morning tea break.",
                    duration: 60
                },
                {
                    time: "11:30",
                    displayTime: "11:30 AM",
                    title: "Technical Session 03 A - Climate Smart Agriculture",
                    description: "Climate smart agriculture: opportunities and challenges",
                    duration: 90
                },
                {
                    time: "11:30",
                    displayTime: "11:30 AM",
                    title: "Technical Session 03 B - Water Management",
                    description: "Drinking water management solutions for climate adaptation",
                    duration: 90
                },
                {
                    time: "11:30",
                    displayTime: "11:30 AM",
                    title: "Side Event 06 - Climate Security Assessment (#50)",
                    description: "Climate Security Assessment (CSA), Loss & Damage, and Financing strategies",
                    duration: 90
                },
                {
                    time: "13:00",
                    displayTime: "1:00 PM",
                    title: "Lunch",
                    description: "Lunch break and informal networking for Day 2.",
                    duration: 45
                },
                {
                    time: "13:45",
                    displayTime: "1:45 PM",
                    title: "Technical Session 04 A - Integrated Water Management",
                    description: "Integrated management of water and associated resources at the cascade level",
                    duration: 90
                },
                {
                    time: "13:45",
                    displayTime: "1:45 PM",
                    title: "Technical Session 04 B - Policy & Legal Considerations",
                    description: "Policy, financial, and legal considerations: Challenges and opportunities",
                    duration: 90
                },
                {
                    time: "13:45",
                    displayTime: "1:45 PM",
                    title: "Side Event 07 - GCF Climate Financing (#25)",
                    description: "GCF Strengthening climate financing with GCF implementation strategies",
                    duration: 90
                },
                {
                    time: "15:15",
                    displayTime: "3:15 PM",
                    title: "Closing Ceremony (#200)",
                    description: "Closing ceremony and final remarks for the Symposium on Climate Actions 2025.",
                    duration: 75
                },
                {
                    time: "16:30",
                    displayTime: "4:30 PM",
                    title: "Refreshments",
                    description: "Final refreshments and farewell networking.",
                    duration: 30
                }
            ]
        };

        // Current state - Always use real-time mode
        this.currentEventIndex = -1; // -1 means no current event (before/after schedule)
        this.isAutoMode = false; // Manual mode disabled for real-time
        this.lastRealTimeCheck = null; // Track when we last checked real time
        this.conferenceStatus = 'waiting'; // waiting, active, completed
        
        // Pre-event highlight mode (2 hours before event starts)
        this.preEventMode = false;
        this.preEventStartTime = null;
        this.highlightInterval = null;
        this.currentHighlightIndex = 0;
        
        // Check for day changes every minute
        this.setupDayChangeDetection();
        
        // Set up pre-event highlighting
        this.setupPreEventHighlighting();
    }

    /**
     * Automatically detect which day it should be based on current date
     * @returns {string} Conference day name
     */
    detectCurrentDay() {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        
        console.log(`Today's date: ${today}`);
        console.log(`Conference dates:`, this.conferenceDates);
        
        // Check if today matches any conference date
        for (const [dayName, date] of Object.entries(this.conferenceDates)) {
            if (date === today) {
                console.log(`Found matching day: ${dayName} for date ${today}`);
                return dayName;
            }
        }
        
        // If no exact match, check if we're past certain dates
        const todayTime = new Date(today).getTime();
        
        // Check if today is after Day 2
        const day2Time = new Date(this.conferenceDates['Day 2']).getTime();
        if (todayTime > day2Time) {
            console.log(`Today is after Day 2, showing Day 2 content`);
            return 'Day 2';
        }
        
        // Check if today is after Day 1
        const day1Time = new Date(this.conferenceDates['Day 1']).getTime();
        if (todayTime > day1Time) {
            console.log(`Today is after Day 1, showing Day 1 content`);
            return 'Day 1';
        }
        
        // Default to Day 1 if before conference starts
        console.log(`Before conference starts, defaulting to Day 1`);
        return 'Day 1';
    }

    /**
     * Set up pre-event highlighting (2 hours before first event)
     */
    setupPreEventHighlighting() {
        // Check every minute if we should start pre-event highlighting
        setInterval(() => {
            this.checkPreEventMode();
        }, 60000); // Check every minute
        
        // Also check immediately
        setTimeout(() => {
            this.checkPreEventMode();
        }, 1000);
    }

    /**
     * Check if we should start or stop pre-event highlighting
     */
    checkPreEventMode() {
        const agenda = this.getAgendaData();
        if (agenda.length === 0) return;
        
        const firstEventTime = this.timeToMinutes(agenda[0].time);
        const currentMinutes = this.timeToMinutes(this.getCurrentRealTime());
        
        // Calculate minutes until first event
        const minutesUntilEvent = firstEventTime - currentMinutes;
        
        // Start highlighting 2 hours (120 minutes) before first event
        const shouldStartHighlighting = minutesUntilEvent <= 120 && minutesUntilEvent > 0;
        
        if (shouldStartHighlighting && !this.preEventMode) {
            this.startPreEventHighlighting();
        } else if (!shouldStartHighlighting && this.preEventMode) {
            this.stopPreEventHighlighting();
        }
    }

    /**
     * Start pre-event highlighting mode
     */
    startPreEventHighlighting() {
        console.log('=== STARTING PRE-EVENT HIGHLIGHT MODE ===');
        this.preEventMode = true;
        this.currentHighlightIndex = 0;
        
        if (this.highlightInterval) {
            clearInterval(this.highlightInterval);
        }
        
        // Highlight each item for 12 seconds
        this.highlightInterval = setInterval(() => {
            this.cycleHighlight();
        }, 12000); // 12 seconds per item
        
        // Notify view to start highlighting
        if (window.conferenceApp && window.conferenceApp.view && window.conferenceApp.view.startPreEventHighlights) {
            window.conferenceApp.view.startPreEventHighlights();
        }
    }

    /**
     * Stop pre-event highlighting mode
     */
    stopPreEventHighlighting() {
        console.log('=== STOPPING PRE-EVENT HIGHLIGHT MODE ===');
        this.preEventMode = false;
        
        if (this.highlightInterval) {
            clearInterval(this.highlightInterval);
            this.highlightInterval = null;
        }
        
        // Notify view to stop highlighting
        if (window.conferenceApp && window.conferenceApp.view && window.conferenceApp.view.stopPreEventHighlights) {
            window.conferenceApp.view.stopPreEventHighlights();
        }
    }

    /**
     * Cycle through highlighting different agenda items
     */
    cycleHighlight() {
        const agenda = this.getAgendaData();
        if (agenda.length === 0) return;
        
        this.currentHighlightIndex = (this.currentHighlightIndex + 1) % agenda.length;
        
        // Notify view of highlight change
        if (window.conferenceApp && window.conferenceApp.view && window.conferenceApp.view.highlightItem) {
            window.conferenceApp.view.highlightItem(this.currentHighlightIndex);
        }
    }

    /**
     * Get current highlight index (for view to use)
     */
    getCurrentHighlightIndex() {
        return this.preEventMode ? this.currentHighlightIndex : -1;
    }

    /**
     * Check if in pre-event mode
     */
    isInPreEventMode() {
        return this.preEventMode;
    }

    /**
     * Set up automatic day change detection
     */
    setupDayChangeDetection() {
        // Check for day changes every minute
        setInterval(() => {
            const detectedDay = this.detectCurrentDay();
            if (detectedDay !== this.currentDay) {
                console.log(`Day change detected: ${this.currentDay} → ${detectedDay}`);
                this.currentDay = detectedDay;
                this.currentEventIndex = -1; // Reset event index
                this.conferenceStatus = 'waiting'; // Reset status
                
                // Notify the view to update the day display
                if (window.conferenceApp && window.conferenceApp.view) {
                    window.conferenceApp.view.updateConferenceDay(detectedDay);
                }
            }
        }, 60000); // Check every minute
    }

    /**
     * Update conference dates (call this to change the dates for your actual conference)
     * @param {Object} dates Object with day names as keys and dates as values
     */
    updateConferenceDates(dates) {
        this.conferenceDates = { ...this.conferenceDates, ...dates };
        console.log('Conference dates updated:', this.conferenceDates);
        
        // Re-detect current day
        const newDay = this.detectCurrentDay();
        if (newDay !== this.currentDay) {
            this.currentDay = newDay;
            this.currentEventIndex = -1;
            this.conferenceStatus = 'waiting';
            
            if (window.conferenceApp && window.conferenceApp.view) {
                window.conferenceApp.view.updateConferenceDay(newDay);
            }
        }
    }

    /**
     * Get the agenda data for current day
     * @returns {Array} Array of agenda items for current day
     */
    getAgendaData() {
        return this.allAgendaData[this.currentDay] || [];
    }

    /**
     * Get all available days
     * @returns {Array} Array of day names
     */
    getAvailableDays() {
        return Object.keys(this.allAgendaData);
    }

    /**
     * Set current day (manual override)
     * @param {string} dayName Day name ('Day 1', 'Day 2')
     * @returns {boolean} True if day was set successfully
     */
    setCurrentDay(dayName) {
        if (this.allAgendaData[dayName]) {
            this.currentDay = dayName;
            this.currentEventIndex = -1; // Reset event index
            this.conferenceStatus = 'waiting'; // Reset status
            console.log(`Conference day manually switched to: ${dayName}`);
            return true;
        } else {
            console.log(`Day "${dayName}" not found. Available days: ${this.getAvailableDays().join(', ')}`);
            return false;
        }
    }

    /**
     * Get current day name
     * @returns {string} Current day name
     */
    getCurrentDay() {
        return this.currentDay;
    }

    /**
     * Get current event index
     * @returns {number} Current event index (-1 if no current event)
     */
    getCurrentEventIndex() {
        return this.currentEventIndex;
    }

    /**
     * Get current event data
     * @returns {Object|null} Current event object or null
     */
    getCurrentEvent() {
        const agenda = this.getAgendaData();
        if (this.currentEventIndex >= 0 && this.currentEventIndex < agenda.length) {
            return agenda[this.currentEventIndex];
        }
        return null;
    }

    /**
     * Get conference status
     * @returns {string} 'waiting', 'active', or 'completed'
     */
    getConferenceStatus() {
        return this.conferenceStatus;
    }

    /**
     * Convert time string to minutes since midnight
     * @param {string} timeStr Time in "HH:MM" format
     * @returns {number} Minutes since midnight
     */
    timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    /**
     * Get current real time in HH:MM format (Sri Lankan time)
     * @returns {string} Current time as "HH:MM"
     */
    getCurrentRealTime() {
        const now = new Date();
        // Convert to Sri Lankan time (UTC+5:30)
        const sriLankanTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
        return sriLankanTime.getUTCHours().toString().padStart(2, '0') + ':' + 
               sriLankanTime.getUTCMinutes().toString().padStart(2, '0');
    }

    /**
     * Get current real time with seconds for display
     * @returns {string} Current time as "HH:MM:SS"
     */
    getCurrentRealTimeWithSeconds() {
        const now = new Date();
        // Convert to Sri Lankan time (UTC+5:30)
        const sriLankanTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
        return sriLankanTime.getUTCHours().toString().padStart(2, '0') + ':' + 
               sriLankanTime.getUTCMinutes().toString().padStart(2, '0') + ':' + 
               sriLankanTime.getUTCSeconds().toString().padStart(2, '0');
    }

    /**
     * Find which event should be currently active based on real time
     * @returns {Object} Object with eventIndex and status
     */
    findCurrentRealTimeEvent() {
        const currentTime = this.getCurrentRealTime();
        const currentMinutes = this.timeToMinutes(currentTime);
        const agenda = this.getAgendaData();
        
        if (agenda.length === 0) {
            return {
                eventIndex: -1,
                status: 'waiting',
                message: `No events for ${this.currentDay}`
            };
        }
        
        const firstEventMinutes = this.timeToMinutes(agenda[0].time);
        const lastEventMinutes = this.timeToMinutes(agenda[agenda.length - 1].time);
        const lastEventDuration = agenda[agenda.length - 1].duration || 0;
        
        // Check if conference hasn't started yet
        if (currentMinutes < firstEventMinutes) {
            return {
                eventIndex: -1,
                status: 'waiting',
                message: `${this.currentDay} starts soon...`
            };
        }
        
        // Conference ends at midnight (00:00 = 1440 minutes)
        const midnightMinutes = 1440;
        
        // Check if it's after midnight (conference has ended)
        if (currentMinutes >= midnightMinutes || (currentMinutes < 300 && currentMinutes >= 0)) {
            // Between 00:00 and 05:00 is considered "next day" (conference ended)
            return {
                eventIndex: -1,
                status: 'completed',
                message: `${this.currentDay} has concluded`
            };
        }
        
        // Find active event (within its time duration)
        for (let i = 0; i < agenda.length; i++) {
            const event = agenda[i];
            const eventStart = this.timeToMinutes(event.time);
            let eventEnd = eventStart + (event.duration || 0);
            
            // Special case: if it's the last event and it ends after midnight, extend to midnight
            if (i === agenda.length - 1 && eventEnd > midnightMinutes) {
                eventEnd = midnightMinutes;
            }
            
            // If current time is within this event's duration
            if (currentMinutes >= eventStart && currentMinutes < eventEnd) {
                return {
                    eventIndex: i,
                    status: 'active',
                    message: 'Event in progress'
                };
            }
        }
        
        // If between events, find the most recent event that has started
        let mostRecentIndex = -1;
        for (let i = agenda.length - 1; i >= 0; i--) {
            const eventMinutes = this.timeToMinutes(agenda[i].time);
            if (eventMinutes <= currentMinutes) {
                mostRecentIndex = i;
                break;
            }
        }
        
        return {
            eventIndex: mostRecentIndex,
            status: 'active',
            message: 'Between events'
        };
    }

    /**
     * Update current event based on real time
     * @returns {boolean} True if event changed, false otherwise
     */
    updateRealTimeEvent() {
        const realTimeResult = this.findCurrentRealTimeEvent();
        const hasChanged = this.currentEventIndex !== realTimeResult.eventIndex || 
                          this.conferenceStatus !== realTimeResult.status;
        
        if (hasChanged) {
            this.currentEventIndex = realTimeResult.eventIndex;
            this.conferenceStatus = realTimeResult.status;
            this.lastRealTimeCheck = new Date();
            
            console.log(`Real-time update (${this.currentDay}): ${realTimeResult.message}`);
            if (realTimeResult.eventIndex >= 0) {
                const agenda = this.getAgendaData();
                console.log(`Current event: ${agenda[realTimeResult.eventIndex].title}`);
            }
        }
        
        return hasChanged;
    }

    /**
     * Get next upcoming event for current day
     * @returns {Object|null} Next event or null
     */
    getNextEvent() {
        const currentTime = this.getCurrentRealTime();
        const currentMinutes = this.timeToMinutes(currentTime);
        const agenda = this.getAgendaData();
        
        for (let i = 0; i < agenda.length; i++) {
            const eventMinutes = this.timeToMinutes(agenda[i].time);
            if (eventMinutes > currentMinutes) {
                return agenda[i];
            }
        }
        
        return null; // No more events today
    }

    /**
     * Get time until next event in minutes
     * @returns {number} Minutes until next event, -1 if no next event
     */
    getTimeUntilNextEvent() {
        const nextEvent = this.getNextEvent();
        if (!nextEvent) return -1;
        
        const currentMinutes = this.timeToMinutes(this.getCurrentRealTime());
        const nextEventMinutes = this.timeToMinutes(nextEvent.time);
        
        return nextEventMinutes - currentMinutes;
    }

    /**
     * Manual navigation methods (for testing purposes only)
     */
    nextEvent() {
        const agenda = this.getAgendaData();
        if (this.currentEventIndex < agenda.length - 1) {
            this.currentEventIndex++;
            this.conferenceStatus = 'active';
            console.log('Manual override: Next event');
            return true;
        }
        return false;
    }

    previousEvent() {
        if (this.currentEventIndex > 0) {
            this.currentEventIndex--;
            this.conferenceStatus = 'active';
            console.log('Manual override: Previous event');
            return true;
        }
        return false;
    }

    setCurrentEventIndex(index) {
        const agenda = this.getAgendaData();
        if (index >= -1 && index < agenda.length) {
            this.currentEventIndex = index;
            this.conferenceStatus = index >= 0 ? 'active' : 'waiting';
            console.log('Manual override: Set event index');
        }
    }

    /**
     * Reset to real-time mode (stop manual overrides)
     */
    resetToRealTime() {
        this.updateRealTimeEvent();
        console.log(`Reset to real-time mode for ${this.currentDay}`);
    }
}

// Add global function to update conference dates
window.updateConferenceDates = function(dates) {
    if (window.conferenceApp && window.conferenceApp.model) {
        window.conferenceApp.model.updateConferenceDates(dates);
    }
};

console.log('ConferenceModel loaded with Climate Symposium 2025 agenda data');
console.log('Conference dates: Day 1 (Sep 28), Day 2 (Sep 29) - UPDATED FOR TODAY');
console.log('Conference Dinner extended until midnight!');
console.log('Pre-event highlighting: 2 hours before first event');
console.log('Use updateConferenceDates() to change conference dates if needed');