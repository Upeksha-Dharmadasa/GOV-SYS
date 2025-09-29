/* ============================================================================
   VIEW - PRESENTATION LAYER - CLIMATE SYMPOSIUM 2025 (FIXED)
   ============================================================================ */

class ConferenceView {
    constructor() {
        // Cache DOM elements
        this.agendaList = document.getElementById('agendaList');
        this.currentDetail = document.getElementById('currentDetail');
        this.currentClock = document.getElementById('currentClock');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.autoBtn = document.getElementById('autoBtn');
        this.controls = document.getElementById('controls');
        
        // Debug elements
        this.debugSystemTime = document.getElementById('debugSystemTime');
        this.debugDisplayTime = document.getElementById('debugDisplayTime');
        this.debugCurrentEvent = document.getElementById('debugCurrentEvent');
        this.debugMode = document.getElementById('debugMode');
        this.debugStatus = document.getElementById('debugStatus');
        
        // Display identification
        this.isDisplay1 = !!this.agendaList && !this.currentDetail;
        this.isDisplay2 = !!this.currentDetail;
        
        // Pre-event highlight system
        this.preEventMode = false;
        this.highlightInterval = null;
        this.currentHighlightIndex = 0;
        this.highlightDuration = 12000;
        
        // Current day for the conference
        this.currentDay = 'Day 1';
        
        console.log(`View initialized for ${this.isDisplay1 ? 'Display 1 (Agenda)' : 'Display 2 (Details)'}`);
        
        this.hideDebugPanel();
        this.setupDaySync();
    }

    hideDebugPanel() {
        const debugPanel = document.getElementById('debugPanel');
        if (debugPanel) {
            debugPanel.style.display = 'none';
        }
    }

    startPreEventHighlights() {
        if (!this.isDisplay1) return;
        
        console.log('=== STARTING PRE-EVENT HIGHLIGHT MODE ===');
        this.preEventMode = true;
        this.currentHighlightIndex = 0;
        
        if (this.highlightInterval) {
            clearInterval(this.highlightInterval);
        }
        
        this.doHighlight();
        
        this.highlightInterval = setInterval(() => {
            this.doHighlight();
        }, this.highlightDuration);
    }

    doHighlight() {
        const agenda = window.conferenceApp?.model?.getAgendaData() || [];
        if (agenda.length === 0) return;
        
        const allEvents = document.querySelectorAll('.event-item');
        allEvents.forEach(element => {
            element.classList.remove('highlight-preview');
        });
        
        const eventItems = document.querySelectorAll('.event-item');
        if (eventItems[this.currentHighlightIndex]) {
            eventItems[this.currentHighlightIndex].classList.add('highlight-preview');
            
            const eventTitle = eventItems[this.currentHighlightIndex].querySelector('.title')?.textContent || 'Unknown';
            const eventTime = eventItems[this.currentHighlightIndex].querySelector('.time')?.textContent || 'Unknown';
            console.log(`Highlighting: ${eventTime} - ${eventTitle}`);
        }
        
        this.currentHighlightIndex = (this.currentHighlightIndex + 1) % agenda.length;
    }

    stopPreEventHighlights() {
        console.log('=== STOPPING PRE-EVENT HIGHLIGHT MODE ===');
        this.preEventMode = false;
        
        if (this.highlightInterval) {
            clearInterval(this.highlightInterval);
            this.highlightInterval = null;
        }
        
        const allEvents = document.querySelectorAll('.event-item');
        allEvents.forEach(element => {
            element.classList.remove('highlight-preview');
        });
    }

    highlightItem(index) {
        if (!this.isDisplay1) return;
        
        this.currentHighlightIndex = index;
        this.doHighlight();
    }

    setupDaySync() {
        setInterval(() => {
            if (window.conferenceApp && window.conferenceApp.model) {
                const modelDay = window.conferenceApp.model.getCurrentDay();
                if (modelDay !== this.currentDay) {
                    console.log(`Day sync: ${this.currentDay} → ${modelDay}`);
                    this.currentDay = modelDay;
                    this.updateDayInHeader(modelDay);
                }
            }
        }, 30000);
        
        setTimeout(() => {
            if (window.conferenceApp && window.conferenceApp.model) {
                const modelDay = window.conferenceApp.model.getCurrentDay();
                if (modelDay !== this.currentDay) {
                    console.log(`Initial day sync: ${this.currentDay} → ${modelDay}`);
                    this.currentDay = modelDay;
                    this.updateDayInHeader(modelDay);
                }
            }
        }, 2000);
    }

    updateDayInHeader(newDay) {
        const dayElement = document.querySelector('.event-day');
        if (dayElement && dayElement.textContent !== newDay) {
            dayElement.textContent = newDay;
            console.log(`Header updated to show: ${newDay}`);
        }
    }

    setCurrentDay(day) {
        this.currentDay = day;
    }

    getLogoHtml() {
        return `<img src="LOGO.png" alt="Climate Symposium 2025" style="max-width: 100%; height: auto; max-height: 150px;">`;
    }

    timeToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    }

    renderAgendaList(agendaData, currentIndex) {
        if (!this.isDisplay1 || !this.agendaList) return;

        try {
            this.agendaList.innerHTML = '';
            
            const headerSection = document.createElement('div');
            headerSection.className = 'agenda-header';
            headerSection.innerHTML = `
                <div class="conference-logo">
                    ${this.getLogoHtml()}
                </div>
                <div class="event-title-section">
                    <div class="event-title">Symposium on Climate Actions 2025</div>
                    <div class="event-day">${this.currentDay}</div>
                </div>
            `;
            this.agendaList.appendChild(headerSection);
            
            const movingTextBanner = document.createElement('div');
            movingTextBanner.className = 'moving-text-container';
            movingTextBanner.innerHTML = `
                <div class="moving-text">WELCOME TO SYMPOSIUM ON CLIMATE ACTIONS - 2025</div>
            `;
            this.agendaList.appendChild(movingTextBanner);
            
            const eventsContainer = document.createElement('div');
            eventsContainer.className = 'all-events';
            
            const currentTime = window.conferenceApp?.model?.getCurrentRealTime() || '00:00';
            const currentMinutes = this.timeToMinutes(currentTime);
            
            console.log(`Current time: ${currentTime} (${currentMinutes} minutes)`);
            
            agendaData.forEach((item, index) => {
                const eventMinutes = this.timeToMinutes(item.time);
                const eventEndMinutes = eventMinutes + (item.duration || 0);
                
                // FIXED LOGIC: Check if event has ended
                let eventStatus = 'future-event';
                
                const eventHasEnded = eventEndMinutes <= currentMinutes;
                const eventIsActive = eventMinutes <= currentMinutes && currentMinutes < eventEndMinutes;
                
                if (eventHasEnded) {
                    eventStatus = 'past-event';
                    console.log(`Event ${index}: "${item.title}" is PAST (ended at ${eventEndMinutes} min)`);
                } else if (eventIsActive || index === currentIndex) {
                    eventStatus = 'current-active';
                    console.log(`Event ${index}: "${item.title}" is CURRENT`);
                } else {
                    eventStatus = 'future-event';
                    console.log(`Event ${index}: "${item.title}" is FUTURE (starts at ${eventMinutes} min)`);
                }
                
                const eventItem = document.createElement('div');
                eventItem.className = `event-item ${eventStatus}`;
                eventItem.innerHTML = `
                    <div class="title">${item.title}</div>
                    <div class="time">${item.displayTime}</div>
                `;
                
                eventItem.addEventListener('click', () => {
                    if (this.onItemClick) {
                        this.onItemClick(index);
                    }
                });
                
                eventsContainer.appendChild(eventItem);
            });
            
            this.agendaList.appendChild(eventsContainer);
            
            // Log how many past events were found
            setTimeout(() => {
                const pastEventCount = document.querySelectorAll('.past-event').length;
                console.log(`Total past events rendered: ${pastEventCount}`);
            }, 100);
            
        } catch (error) {
            console.error('Error rendering agenda list:', error);
        }
    }

    renderCurrentEvent(currentEvent, status, nextEvent, timeUntilNext) {
        if (!this.isDisplay2 || !this.currentDetail) return;

        try {
            this.currentDetail.innerHTML = '';
            
            if (currentEvent && status === 'active') {
                this.currentDetail.innerHTML = `
                    <div class="event-content">
                        <div class="current-time">${currentEvent.displayTime}</div>
                        <div class="current-title">${currentEvent.title}</div>
                        <div class="current-description">${currentEvent.description}</div>
                    </div>
                `;
            } else if (status === 'waiting') {
                let nextEventHtml = '';
                if (nextEvent) {
                    const timeText = timeUntilNext > 0 ? 
                        `Starts in ${timeUntilNext} minutes` : 'Starting now';
                    
                    nextEventHtml = `
                        <div class="next-event-preview">
                            <h3>First Event:</h3>
                            <div style="color: #e74c3c; font-size: 1.2em; margin-bottom: 10px;">
                                ${nextEvent.displayTime}
                            </div>
                            <div style="font-size: 1.1em; margin-bottom: 10px;">
                                ${nextEvent.title}
                            </div>
                            <div style="color: #f39c12; font-weight: bold;">
                                ${timeText}
                            </div>
                        </div>
                    `;
                }
                
                this.currentDetail.innerHTML = `
                    <div class="event-content">
                        <div class="no-current-event">
                            <h2>Climate Symposium Starts Soon...</h2>
                            <p>Please take your seats and prepare for an impactful day</p>
                            ${nextEventHtml}
                        </div>
                    </div>
                `;
            } else if (status === 'completed') {
                this.currentDetail.innerHTML = `
                    <div class="event-content">
                        <div class="no-current-event">
                            <h2>Climate Symposium Has Concluded</h2>
                            <p>Thank you for your participation!</p>
                            <div class="conference-info">
                                <h4>Thank You!</h4>
                                <p>We hope you enjoyed today's sessions</p>
                                <p>Follow-up materials will be sent via email</p>
                                <p>Stay connected with our climate action community</p>
                                <p>See you at our next climate event!</p>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                this.currentDetail.innerHTML = `
                    <div class="event-content">
                        <div class="no-current-event">
                            <h2>Symposium on Climate Actions 2025</h2>
                            <p>Waiting for event information...</p>
                        </div>
                    </div>
                `;
            }
            
        } catch (error) {
            console.error('Error rendering current event:', error);
        }
    }

    updateControls(currentIndex, totalEvents, isAutoMode) {
        if (!this.isDisplay1) return;
        try {
            if (this.prevBtn) this.prevBtn.disabled = currentIndex <= 0;
            if (this.nextBtn) this.nextBtn.disabled = currentIndex >= totalEvents - 1;
            if (this.autoBtn) {
                this.autoBtn.disabled = true;
                this.autoBtn.textContent = 'Real-Time Mode';
                this.autoBtn.classList.remove('auto-active');
            }
        } catch (error) {
            console.error('Error updating controls:', error);
        }
    }

    updateClock(timeString) {
        try {
            if (this.currentClock) {
                this.currentClock.textContent = timeString;
            }
        } catch (error) {
            console.error('Error updating clock:', error);
        }
    }

    updateDebugPanel(debugInfo) {
        if (!this.isDisplay1) return;
        try {
            if (this.debugSystemTime) this.debugSystemTime.textContent = debugInfo.systemTime;
            if (this.debugDisplayTime) this.debugDisplayTime.textContent = debugInfo.displayTime;
            if (this.debugCurrentEvent) this.debugCurrentEvent.textContent = debugInfo.currentEvent;
            if (this.debugMode) this.debugMode.textContent = debugInfo.mode;
            if (this.debugStatus) this.debugStatus.textContent = debugInfo.status;
        } catch (error) {
            console.error('Error updating debug panel:', error);
        }
    }

    hideControls() {
        if (this.controls) {
            this.controls.classList.add('hidden');
        }
    }

    showControls() {
        if (this.controls) {
            this.controls.classList.remove('hidden');
        }
    }

    setEventHandlers(handlers) {
        this.onPrevious = handlers.onPrevious;
        this.onNext = handlers.onNext;
        this.onAutoToggle = handlers.onAutoToggle;
        this.onItemClick = handlers.onItemClick;
        
        if (this.isDisplay1) {
            if (this.prevBtn) this.prevBtn.addEventListener('click', this.onPrevious);
            if (this.nextBtn) this.nextBtn.addEventListener('click', this.onNext);
            if (this.autoBtn) this.autoBtn.addEventListener('click', this.onAutoToggle);
        }
    }

    showLoading() {
        try {
            if (this.isDisplay2 && this.currentDetail) {
                this.currentDetail.innerHTML = `
                    <div class="no-current-event">
                        <h2>Loading Climate Symposium Data...</h2>
                        <p>Please wait while we prepare the agenda</p>
                    </div>
                `;
            }
            if (this.isDisplay1 && this.agendaList) {
                this.agendaList.innerHTML = `
                    <div class="agenda-header">
                        <div class="conference-logo">${this.getLogoHtml()}</div>
                        <div class="event-title-section">
                            <div class="event-title">Symposium on Climate Actions 2025</div>
                            <div class="event-day">Loading...</div>
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error showing loading state:', error);
        }
    }

    showError(errorMessage) {
        try {
            if (this.isDisplay2 && this.currentDetail) {
                this.currentDetail.innerHTML = `
                    <div class="no-current-event">
                        <h2>System Error</h2>
                        <p>${errorMessage}</p>
                        <div class="conference-info">
                            <h4>Troubleshooting</h4>
                            <p>Please refresh the page</p>
                            <p>Check your internet connection</p>
                            <p>Contact technical support if issue persists</p>
                        </div>
                    </div>
                `;
            }
            if (this.isDisplay1 && this.agendaList) {
                this.agendaList.innerHTML = `
                    <div style="color: white; text-align: center; padding: 50px;">
                        <h2>System Error</h2>
                        <p>${errorMessage}</p>
                        <div style="margin-top: 20px;">
                            <h4>Troubleshooting</h4>
                            <p>Please refresh the page</p>
                            <p>Check your internet connection</p>
                            <p>Contact technical support if issue persists</p>
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error showing error state:', error);
        }
    }

    updateConferenceDay(day) {
        this.setCurrentDay(day);
        const dayElement = document.querySelector('.event-day');
        if (dayElement) {
            dayElement.textContent = day;
        }
    }

    cleanup() {
        console.log('Cleaning up view resources...');
        
        if (this.highlightInterval) {
            clearInterval(this.highlightInterval);
            this.highlightInterval = null;
        }
        
        this.preEventMode = false;
    }
}

window.hideButtons = function() {
    if (window.conferenceApp && window.conferenceApp.view) {
        window.conferenceApp.view.hideControls();
    }
};

window.showButtons = function() {
    if (window.conferenceApp && window.conferenceApp.view) {
        window.conferenceApp.view.showControls();
    }
};

window.startPreviewMode = function() {
    if (window.conferenceApp && window.conferenceApp.view) {
        window.conferenceApp.view.startPreEventHighlights();
    }
};

window.stopPreviewMode = function() {
    if (window.conferenceApp && window.conferenceApp.view) {
        window.conferenceApp.view.stopPreEventHighlights();
    }
};

window.testHighlight = function(index) {
    if (window.conferenceApp && window.conferenceApp.view) {
        window.conferenceApp.view.highlightItem(index || 0);
        console.log('Test highlight applied to item', index || 0);
    }
};

console.log('ConferenceView loaded for Climate Symposium 2025');
console.log('Features: Shows ALL events (past/current/future), Title first then time');

/*
// FORCE past-event class based on real time - runs every second
setInterval(() => {
    if (!window.conferenceApp?.model) return;
    
    const currentTime = window.conferenceApp.model.getCurrentRealTime();
    const currentMinutes = parseInt(currentTime.split(':')[0]) * 60 + parseInt(currentTime.split(':')[1]);
    
    document.querySelectorAll('.event-item').forEach(eventItem => {
        const timeElement = eventItem.querySelector('.time');
        if (!timeElement) return;
        
        const timeText = timeElement.textContent.trim();
        const timeMatch = timeText.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
        if (!timeMatch) return;
        
        let hours = parseInt(timeMatch[1]);
        const minutes = parseInt(timeMatch[2]);
        
        if (timeMatch[3]) {
            if (timeMatch[3].toUpperCase() === 'PM' && hours !== 12) hours += 12;
            if (timeMatch[3].toUpperCase() === 'AM' && hours === 12) hours = 0;
        }
        
        const eventMinutes = hours * 60 + minutes;
        const eventEndMinutes = eventMinutes + 90; // assume 90 min duration
        
        if (eventEndMinutes <= currentMinutes) {
            eventItem.classList.remove('current-active', 'future-event');
            eventItem.classList.add('past-event');
        }
    });
}, 1000);*/