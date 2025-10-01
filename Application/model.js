/* ============================================================================
   MODEL - DATA LAYER (MVC Architecture) - CLIMATE SYMPOSIUM 2025 (FINAL)
   ============================================================================ */

/**
 * ConferenceModel - Manages all data and business logic for Climate Symposium
 */
class ConferenceModel {
    constructor() {
        // Conference dates for Climate Symposium 2025
        this.conferenceDates = {
            'Day 1': '2025-09-30',           // September 30th
            'Day 2': '2025-10-01'            // October 1st
        };
        
        // Automatically detect current day based on real date
        this.currentDay = this.detectCurrentDay();
        console.log(`Climate Symposium day automatically detected: ${this.currentDay}`);
        
        // Climate Symposium 2025 agenda data - FINAL TIMETABLE
        this.allAgendaData = {
            'Day 1': [
                {
                    time: "08:30",
                    displayTime: "8:30 AM",
                    title: "Registration - Lobby",
                    description: "Registration and welcome for Day 1 participants at the Lobby.",
                    duration: 50
                },
                {
                    time: "09:30",
                    displayTime: "9:30 AM",
                    title: "Inauguration Session - Lotus Hall",
                    description: "Opening ceremony and welcome remarks for the Symposium on Climate Actions 2025 at Lotus Hall.",
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
                    title: "Symposium Highlight - Lotus Hall",
                    description: "From the Ground Up: Sharing Community Level impacts for National Climate Policy & Action",
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
                    title: "Opening of the Poster Presentation (All) Day One - Hall 04 - Spice",
                    description: "Poster session opening with all presentations available for viewing at Hall 04 - Spice.",
                    duration: 60
                },
                {
                    time: "15:00",
                    displayTime: "3:00 PM",
                    title: "Technical Session 01 A - Rehabilitation, upgrading and modernization of village irrigation systems - Hall 01 Lotus",
                    description: "Rehabilitation, upgrading and modernization of village irrigation systems at Hall 01 Lotus",
                    duration: 90
                },
                {
                    time: "15:00",
                    displayTime: "3:00 PM",
                    title: "Technical Session 01 B - Climate advisories and early warnings - Hall 02 - Lotus",
                    description: "Climate advisories and early warnings: recent innovations, successes and constraints in local adaptation at Hall 02 - Lotus",
                    duration: 90
                },
                {
                    time: "15:00",
                    displayTime: "3:00 PM",
                    title: "Side Event 01 - Lessons from the project on policy formulation for Sub-National Stakeholders - Hall 03 Spice",
                    description: "Lessons from the project on policy formulation for Sub-National Stakeholders at Hall 03 Spice",
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
                    title: "Side Event 02 - High Level Donor Roundtable - Hall 02 Lotus",
                    description: "Closed Door Event for Targeted Invitees - From Resilience to Transformation: Catalyzing a National Master Plan for Climate-Resilient Rural Development in Sri Lanka at Hall 02 Lotus",
                    duration: 90
                },
                {
                    time: "17:00",
                    displayTime: "5:00 PM",
                    title: "Side Event 03 - Stakeholder Consultation on the Proposed MSc - Hall 05 Connect",
                    description: "Stakeholder Consultation on the Proposed MSc on climate change and Landscape Management Postgraduate Institute of Agriculture (PGIA), University of Peradeniya, Sri Lanka at Hall 05 Connect",
                    duration: 90
                },
                {
                    time: "17:00",
                    displayTime: "5:00 PM",
                    title: "Side Event 04 - Collective Climate Actions - GCF Knuckles Project - Hall 03 - Spice",
                    description: "Collective Climate Actions - GCF Knuckles Project implementation strategies at Hall 03 - Spice",
                    duration: 90
                },
                {
                    time: "19:15",
                    displayTime: "7:15 PM",
                    title: "Conference Dinner",
                    description: "Conference dinner and networking event for Day 1 participants.",
                    duration: 285
                }
            ],

            'Day 2': [
                {
                    time: "09:00",
                    displayTime: "9:00 AM",
                    title: "Technical Session 02 A - Climate Change Adaptation at the local level: Challengers and lessons learned - Hall 01 - Lotus",
                    description: "Climate change adaptation at the local level: Challengers and lessons learned at Hall 01 - Lotus",
                    duration: 90
                },
                {
                    time: "09:00",
                    displayTime: "9:00 AM",
                    title: "Technical Session 02 B - Gender equity, social inclusion and youth in climate adaptation - Hall 02 - Lotus",
                    description: "Gender equity, social inclusion and youth in climate adaptation at Hall 02 - Lotus",
                    duration: 90
                },
                {
                    time: "09:00",
                    displayTime: "9:00 AM",
                    title: "Side Event 05 - IWMI (#30) Scaling Climate-Resilient Water Solutions - Hall 03 - Spice",
                    description: "IWMI (#30) Scaling Climate-Resilient Water Solutions through Research, Innovation, and Community Action at Hall 03 - Spice",
                    duration: 90
                },
                {
                    time: "10:30",
                    displayTime: "10:30 AM",
                    title: "Opening of the Poster Presentation, Day Two and Tea Break (Hall 04 - Spice)",
                    description: "Poster presentation session opening and morning tea break at Hall 04 - Spice.",
                    duration: 60
                },
                {
                    time: "11:30",
                    displayTime: "11:30 AM",
                    title: "Technical Session 03 A - Climate smart agriculture: opportunities and challengers - Hall 01 - Lotus",
                    description: "Climate smart agriculture: opportunities and challengers at Hall 01 - Lotus",
                    duration: 90
                },
                {
                    time: "11:30",
                    displayTime: "11:30 AM",
                    title: "Technical Session 03 B - Drinking water management solution for climate adaptation - Hall 02 - Lotus",
                    description: "Drinking water management solution for climate adaptation at Hall 02 - Lotus",
                    duration: 90
                },
                {
                    time: "11:30",
                    displayTime: "11:30 AM",
                    title: "Side Event 06 - Loss & Damage Response and Climate security - Hall 03 - Spice",
                    description: "Loss & Damage Response and Climate security at Hall 03 - Spice",
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
                    title: "Technical Session 04 A - Integrated management of water and associated resources at the cascade level - Hall 01 - Lotus",
                    description: "Integrated management of water and associated resources at the cascade level at Hall 01 - Lotus",
                    duration: 90
                },
                {
                    time: "13:45",
                    displayTime: "1:45 PM",
                    title: "Technical Session 04 B - Policy, financial and legal considerations: Challengers and opportunities - Hall 02 - Lotus",
                    description: "Policy, financial and legal considerations: Challengers and opportunities at Hall 02 - Lotus",
                    duration: 90
                },
                {
                    time: "13:45",
                    displayTime: "1:45 PM",
                    title: "Side Event 07 - Mobilizing Green Climate Fund Resources for Climate Action in Sri Lanka - Hall 03 - Lotus",
                    description: "Mobilizing Green Climate Fund Resources for Climate Action in Sri Lanka at Hall 03 - Lotus",
                    duration: 90
                },
                {
                    time: "15:30",
                    displayTime: "3:30 PM",
                    title: "Closing Ceremony (#200) - Lotus Hall",
                    description: "Closing ceremony and final remarks for the Symposium on Climate Actions 2025 at Lotus Hall.",
                    duration: 60
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

        // Using exact timetable (no testing compression)

        // Current state
        this.currentEventIndex = -1;
        this.isAutoMode = false;
        this.lastRealTimeCheck = null;
        this.conferenceStatus = 'waiting';
        
        this.setupDayChangeDetection();
    }

    detectCurrentDay() {
        // Use local date (not UTC) to avoid off-by-one day issues
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const today = `${yyyy}-${mm}-${dd}`;
        
        console.log(`Today's date: ${today}`);
        console.log(`Conference dates:`, this.conferenceDates);
        
        for (const [dayName, date] of Object.entries(this.conferenceDates)) {
            if (date === today) {
                console.log(`Found matching day: ${dayName} for date ${today}`);
                return dayName;
            }
        }
        
        const todayTime = new Date(today).getTime();
        const day2Time = new Date(this.conferenceDates['Day 2']).getTime();
        if (todayTime > day2Time) {
            console.log(`Today is after Day 2, showing Day 2 content`);
            return 'Day 2';
        }
        
        const day1Time = new Date(this.conferenceDates['Day 1']).getTime();
        if (todayTime > day1Time) {
            console.log(`Today is after Day 1, showing Day 1 content`);
            return 'Day 1';
        }
        
        console.log(`Before conference starts, defaulting to Day 1`);
        return 'Day 1';
    }

    setupDayChangeDetection() {
        setInterval(() => {
            const detectedDay = this.detectCurrentDay();
            if (detectedDay !== this.currentDay) {
                console.log(`Day change detected: ${this.currentDay} → ${detectedDay}`);
                this.currentDay = detectedDay;
                this.currentEventIndex = -1;
                this.conferenceStatus = 'waiting';
                
                if (window.conferenceApp && window.conferenceApp.view) {
                    window.conferenceApp.view.updateConferenceDay(detectedDay);
                }
            }
        }, 60000);
    }

    updateConferenceDates(dates) {
        this.conferenceDates = { ...this.conferenceDates, ...dates };
        console.log('Conference dates updated:', this.conferenceDates);
        
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

    getAgendaData() {
        return this.allAgendaData[this.currentDay] || [];
    }

    getAvailableDays() {
        return Object.keys(this.allAgendaData);
    }

    setCurrentDay(dayName) {
        if (this.allAgendaData[dayName]) {
            this.currentDay = dayName;
            this.currentEventIndex = -1;
            this.conferenceStatus = 'waiting';
            console.log(`Conference day manually switched to: ${dayName}`);
            return true;
        } else {
            console.log(`Day "${dayName}" not found. Available days: ${this.getAvailableDays().join(', ')}`);
            return false;
        }
    }

    getCurrentDay() {
        return this.currentDay;
    }

    getCurrentEventIndex() {
        return this.currentEventIndex;
    }

    getCurrentEvent() {
        const agenda = this.getAgendaData();
        if (this.currentEventIndex >= 0 && this.currentEventIndex < agenda.length) {
            return agenda[this.currentEventIndex];
        }
        return null;
    }

    getConferenceStatus() {
        return this.conferenceStatus;
    }

    timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    getCurrentRealTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }

    getCurrentRealTimeWithSeconds() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0') + ':' + 
               now.getSeconds().toString().padStart(2, '0');
    }

    findCurrentRealTimeEvent() {
        // CRITICAL: CHECK DATE FIRST BEFORE CHECKING TIME (use local date)
        const nowLocal = new Date();
        const yyyyL = nowLocal.getFullYear();
        const mmL = String(nowLocal.getMonth() + 1).padStart(2, '0');
        const ddL = String(nowLocal.getDate()).padStart(2, '0');
        const today = `${yyyyL}-${mmL}-${ddL}`;
        const conferenceDate = this.conferenceDates[this.currentDay];
        
        console.log(`DATE CHECK: Today=${today}, ConferenceDate=${conferenceDate}`);
        
        // If today is BEFORE the conference date, nothing is active yet
        if (today < conferenceDate) {
            console.log('Conference has not started yet - showing waiting status');
            return {
                eventIndex: -1,
                status: 'waiting',
                message: `${this.currentDay} starts tomorrow`
            };
        }
        
        // If today is AFTER the conference date, it's completed
        if (today > conferenceDate) {
            console.log('Conference date has passed - showing completed status');
            return {
                eventIndex: -1,
                status: 'completed',
                message: `${this.currentDay} has concluded`
            };
        }
        
        // Only proceed with time checking if today === conferenceDate
        console.log('Today is the conference date - checking event times');
        
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
        const midnightMinutes = 1440;
        
        if (currentMinutes < firstEventMinutes) {
            return {
                eventIndex: -1,
                status: 'waiting',
                message: `${this.currentDay} starts soon...`
            };
        }
        
        // If current time is after the end of the last event, mark as completed
        const lastEvent = agenda[agenda.length - 1];
        const lastStart = this.timeToMinutes(lastEvent.time);
        let lastEnd = lastStart + (lastEvent.duration || 0);
        if (lastEnd > midnightMinutes) lastEnd = midnightMinutes;
        if (currentMinutes >= lastEnd) {
            return {
                eventIndex: -1,
                status: 'completed',
                message: `${this.currentDay} has concluded`
            };
        }
        
        for (let i = 0; i < agenda.length; i++) {
            const event = agenda[i];
            const eventStart = this.timeToMinutes(event.time);
            let eventEnd = eventStart + (event.duration || 0);
            
            if (i === agenda.length - 1 && eventEnd > midnightMinutes) {
                eventEnd = midnightMinutes;
            }
            
            if (currentMinutes >= eventStart && currentMinutes < eventEnd) {
                return {
                    eventIndex: i,
                    status: 'active',
                    message: 'Event in progress'
                };
            }
        }
        
        // Between events: no current active item should be highlighted
        return {
            eventIndex: -1,
            status: 'waiting',
            message: 'Between events'
        };
    }

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
        
        return null;
    }

    getTimeUntilNextEvent() {
        const nextEvent = this.getNextEvent();
        if (!nextEvent) return -1;
        
        const currentMinutes = this.timeToMinutes(this.getCurrentRealTime());
        const nextEventMinutes = this.timeToMinutes(nextEvent.time);
        
        return nextEventMinutes - currentMinutes;
    }

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

    resetToRealTime() {
        this.updateRealTimeEvent();
        console.log(`Reset to real-time mode for ${this.currentDay}`);
    }
}

window.updateConferenceDates = function(dates) {
    if (window.conferenceApp && window.conferenceApp.model) {
        window.conferenceApp.model.updateConferenceDates(dates);
    }
};

console.log('ConferenceModel loaded with Climate Symposium 2025 agenda data - FINAL TIMETABLE');
console.log('Conference dates: Day 1 (Sep 30), Day 2 (Oct 1)');
console.log('DATE-AWARE: Checks date first, then time for event status');