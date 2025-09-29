/* ============================================================================
   VIEW - PRESENTATION LAYER - CLIMATE SYMPOSIUM 2025 (FINAL)
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
        
        // Current day for the conference
        this.currentDay = 'Day 1';
        
        // Countdown timer interval
        this.countdownInterval = null;
        
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

    /**
     * Start countdown timer that updates every second
     */
    startCountdownTimer(firstEventTime) {
        // Clear any existing countdown
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }

        const updateCountdown = () => {
            const countdownElement = document.querySelector('.countdown-container');
            if (!countdownElement) return;

            // Get current local time
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            
            // Get first event time in minutes
            const firstEventMinutes = this.timeToMinutes(firstEventTime);
            
            // If event has started or passed, hide countdown
            if (currentMinutes >= firstEventMinutes) {
                // Add fade-out animation before hiding
                countdownElement.classList.add('fade-out');
                const finalizeHide = () => {
                    countdownElement.classList.add('hidden');
                    countdownElement.classList.remove('fade-out');
                    // Force an immediate real-time update to reflect the new active event
                    try {
                        if (window.conferenceApp && typeof window.conferenceApp.performRealTimeUpdate === 'function') {
                            window.conferenceApp.performRealTimeUpdate();
                        }
                    } catch (e) {
                        console.warn('Failed to trigger immediate update after countdown hide:', e);
                    }
                };
                if (this.countdownInterval) {
                    clearInterval(this.countdownInterval);
                    this.countdownInterval = null;
                }
                // Use transitionend if available, fallback to timeout
                countdownElement.addEventListener('transitionend', finalizeHide, { once: true });
                setTimeout(finalizeHide, 600);
                return;
            }

            // Calculate time remaining
            let minutesRemaining = firstEventMinutes - currentMinutes;
            const hours = Math.floor(minutesRemaining / 60);
            const minutes = minutesRemaining % 60;
            const seconds = 59 - now.getSeconds();

            // Update countdown display
            const hoursElement = countdownElement.querySelector('.countdown-hours');
            const minutesElement = countdownElement.querySelector('.countdown-minutes');
            const secondsElement = countdownElement.querySelector('.countdown-seconds');

            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        };

        // Update immediately and then every second
        updateCountdown();
        this.countdownInterval = setInterval(updateCountdown, 1000);
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
                <div class="moving-text">
                    WELCOME TO SYMPOSIUM ON CLIMATE ACTIONS - 2025
                    <img src="LOGO.png" alt="Logo" class="moving-logo">
                    WELCOME TO SYMPOSIUM ON CLIMATE ACTIONS - 2025
                    <img src="LOGO.png" alt="Logo" class="moving-logo">
                </div>
            `;
            this.agendaList.appendChild(movingTextBanner);

            // Add countdown timer if event hasn't started
            const currentTime = window.conferenceApp?.model?.getCurrentRealTime() || '00:00';
            const currentMinutes = this.timeToMinutes(currentTime);
            const firstEventMinutes = agendaData.length > 0 ? this.timeToMinutes(agendaData[0].time) : 0;

            if (currentMinutes < firstEventMinutes) {
                const countdownContainer = document.createElement('div');
                countdownContainer.className = 'countdown-container';
                countdownContainer.innerHTML = `
                    <div class="countdown-message">Event Starts In</div>
                    <div class="countdown-timer">
                        <div class="countdown-unit">
                            <span class="countdown-number countdown-hours">00</span>
                            <span class="countdown-label">Hours</span>
                        </div>
                        <div class="countdown-unit">
                            <span class="countdown-number countdown-minutes">00</span>
                            <span class="countdown-label">Minutes</span>
                        </div>
                        <div class="countdown-unit">
                            <span class="countdown-number countdown-seconds">00</span>
                            <span class="countdown-label">Seconds</span>
                        </div>
                    </div>
                `;
                this.agendaList.appendChild(countdownContainer);

                // Start the countdown timer
                this.startCountdownTimer(agendaData[0].time);
            }
            
            const eventsContainer = document.createElement('div');
            eventsContainer.className = 'all-events';
            
            console.log(`Current time: ${currentTime} (${currentMinutes} minutes)`);
            
            agendaData.forEach((item, index) => {
                const eventMinutes = this.timeToMinutes(item.time);
                const eventEndMinutes = eventMinutes + (item.duration || 0);
                
                // Check if event has ended
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

            // Smoothly scroll the current active event into view (if any)
            setTimeout(() => {
                try {
                    const activeEl = this.agendaList.querySelector('.event-item.current-active');
                    if (activeEl && typeof activeEl.scrollIntoView === 'function') {
                        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } catch (e) {
                    console.warn('Failed to auto-scroll to active event:', e);
                }
            }, 150);
            
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
        // Clear countdown interval
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
        }
        console.log('Cleaning up view resources...');
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

console.log('ConferenceView loaded for Climate Symposium 2025');
console.log('Simple mode: Current event highlighting with completed tags, seamless logo scroll, countdown timer');