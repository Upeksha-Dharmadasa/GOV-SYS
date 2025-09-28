/* ============================================================================
   CONTROLLER - BUSINESS LOGIC LAYER (MVC Architecture) - CLIMATE SYMPOSIUM 2025
   ============================================================================ */

/**
 * ConferenceController - Manages interaction between Model and View for Climate Symposium
 */
class ConferenceController {
    constructor() {
        // Initialize MVC components
        this.model = new ConferenceModel();
        this.view = new ConferenceView();
        
        // Real-time vs Manual mode
        this.isRealTimeMode = true; // Start in real-time mode
        this.manualEventIndex = -1; // For manual navigation
        
        // Real-time update interval
        this.updateInterval = null;
        this.updateFrequency = 1000; // Update every 1 second
        
        // Pre-event highlighting state
        this.preEventHighlightActive = false;
        
        // Bind event handlers
        this.setupEventHandlers();
        
        // Start the application
        this.initialize();
    }

    /**
     * Set up all event handlers
     */
    setupEventHandlers() {
        // Set up view event handlers with proper binding
        this.view.setEventHandlers({
            onPrevious: () => this.handlePrevious(),
            onNext: () => this.handleNext(),
            onAutoToggle: () => this.toggleRealTimeMode(),
            onItemClick: (index) => this.handleItemClick(index)
        });

        // Keyboard event handlers
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Handle page visibility changes (pause/resume when tab is hidden/shown)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseUpdates();
            } else {
                this.resumeUpdates();
            }
        });
        
        // Handle window beforeunload (cleanup)
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });

        console.log('Event handlers set up for Climate Symposium controller');
    }

    /**
     * Initialize the application
     */
    initialize() {
        try {
            console.log('🌱 Climate Symposium 2025 Real-Time Display System Starting...');
            console.log('================================================');
            console.log('📅 Conference Schedule: Day 1 (Sep 30), Day 2 (Oct 1)');
            console.log(`📊 Loaded ${this.model.getAgendaData().length} agenda items for ${this.model.getCurrentDay()}`);
            console.log('⏰ Pre-event highlighting: 2 hours before first event (12s intervals)');
            
            // Show loading state
            this.view.showLoading();
            
            // Perform initial update
            this.performUpdate();
            
            // Start the update timer
            this.startUpdates();
            
            console.log('✅ Climate Symposium system initialized successfully');
            console.log(`🕒 Mode: ${this.isRealTimeMode ? 'Real-Time' : 'Manual'}`);
            console.log('💡 Pre-event highlighting will start automatically 2 hours before first event');
            
        } catch (error) {
            console.error('❌ Failed to initialize Climate Symposium system:', error);
            this.view.showError('Failed to initialize system. Please refresh the page.');
        }
    }

    /**
     * Toggle between real-time and manual mode
     */
    toggleRealTimeMode() {
        console.log(`🔄 Toggle requested. Current mode: ${this.isRealTimeMode ? 'Real-Time' : 'Manual'}`);
        
        this.isRealTimeMode = !this.isRealTimeMode;
        
        if (this.isRealTimeMode) {
            console.log('🔄 Switched to Real-Time Mode');
            // Reset to current real-time event
            this.model.resetToRealTime();
            this.manualEventIndex = -1;
        } else {
            console.log('👋 Switched to Manual Mode');
            // Set manual index to current real-time index or 0 if none
            this.manualEventIndex = Math.max(0, this.model.getCurrentEventIndex());
        }
        
        // Force immediate update to reflect mode change
        this.performUpdate();
        
        console.log(`✅ Mode switch complete. New mode: ${this.isRealTimeMode ? 'Real-Time' : 'Manual'}`);
    }

    /**
     * Start update timer
     */
    startUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        this.updateInterval = setInterval(() => {
            this.performUpdate();
        }, this.updateFrequency);
        
        console.log('⏰ Update timer started');
    }

    /**
     * Pause updates (when tab is hidden)
     */
    pauseUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
            console.log('⏸️ Updates paused (tab hidden)');
        }
    }

    /**
     * Resume updates (when tab becomes visible)
     */
    resumeUpdates() {
        if (!this.updateInterval) {
            // Perform immediate update when tab becomes visible
            this.performUpdate();
            // Restart the timer
            this.startUpdates();
            console.log('▶️ Updates resumed (tab visible)');
        }
    }

    /**
     * Perform update cycle (real-time or manual)
     */
    performUpdate() {
        try {
            // Always update clock
            const currentTimeWithSeconds = this.model.getCurrentRealTimeWithSeconds();
            this.view.updateClock(currentTimeWithSeconds);
            
            let hasChanged = false;
            
            if (this.isRealTimeMode) {
                // Real-time mode: follow actual schedule
                hasChanged = this.model.updateRealTimeEvent();
                
                // Check pre-event highlighting status
                this.checkPreEventHighlighting();
            } else {
                // Manual mode: use manually selected event
                const currentIndex = this.model.getCurrentEventIndex();
                if (currentIndex !== this.manualEventIndex) {
                    this.model.setCurrentEventIndex(this.manualEventIndex);
                    hasChanged = true;
                }
            }
            
            // Update display if event changed or this is the first update
            if (hasChanged || !this.lastUpdateTime) {
                this.updateDisplay();
                this.lastUpdateTime = new Date();
            }
            
            // Always update controls to reflect current mode
            this.updateControls();
            
            // Update debug information
            this.updateDebugInfo();
            
        } catch (error) {
            console.error('❌ Error during update:', error);
            this.view.showError('Update failed. System will retry automatically.');
        }
    }

    /**
     * Check and manage pre-event highlighting
     */
    checkPreEventHighlighting() {
        const isInPreEventMode = this.model.isInPreEventMode();
        
        // Handle transition to pre-event mode
        if (isInPreEventMode && !this.preEventHighlightActive) {
            console.log('🎯 Starting pre-event highlighting coordination');
            this.preEventHighlightActive = true;
            // The model handles the highlighting logic, view responds to it
        } 
        // Handle transition out of pre-event mode
        else if (!isInPreEventMode && this.preEventHighlightActive) {
            console.log('🎯 Stopping pre-event highlighting coordination');
            this.preEventHighlightActive = false;
        }
    }

    /**
     * Update all display elements
     */
    updateDisplay() {
        try {
            const agendaData = this.model.getAgendaData();
            const currentIndex = this.isRealTimeMode ? 
                this.model.getCurrentEventIndex() : 
                this.manualEventIndex;
            
            const currentEvent = currentIndex >= 0 ? agendaData[currentIndex] : null;
            const status = this.isRealTimeMode ? 
                this.model.getConferenceStatus() : 
                (currentIndex >= 0 ? 'active' : 'manual');
            
            const nextEvent = this.model.getNextEvent();
            const timeUntilNext = this.model.getTimeUntilNextEvent();
            
            // Update both screens
            this.view.renderAgendaList(agendaData, currentIndex);
            this.view.renderCurrentEvent(currentEvent, status, nextEvent, timeUntilNext);
            
        } catch (error) {
            console.error('❌ Error updating display:', error);
            this.view.showError('Display update failed. Please refresh the page.');
        }
    }

    /**
     * Update controls separately to ensure proper button states
     */
    updateControls() {
        try {
            const agendaData = this.model.getAgendaData();
            const currentIndex = this.isRealTimeMode ? 
                this.model.getCurrentEventIndex() : 
                this.manualEventIndex;
            
            // Update controls with current mode
            this.view.updateControls(currentIndex, agendaData.length, this.isRealTimeMode);
            
        } catch (error) {
            console.error('❌ Error updating controls:', error);
        }
    }

    /**
     * Update debug information panel
     */
    updateDebugInfo() {
        try {
            const currentIndex = this.isRealTimeMode ? 
                this.model.getCurrentEventIndex() : 
                this.manualEventIndex;
            
            const currentEvent = currentIndex >= 0 ? 
                this.model.getAgendaData()[currentIndex] : null;
            
            const status = this.isRealTimeMode ? 
                this.model.getConferenceStatus() : 
                'manual';
            
            const debugInfo = {
                systemTime: this.model.getCurrentRealTime() + ' (Sri Lankan)',
                displayTime: currentEvent ? currentEvent.displayTime : 'None',
                currentEvent: currentEvent ? currentEvent.title : 'None',
                mode: this.isRealTimeMode ? 'Real-Time' : 'Manual',
                status: status.charAt(0).toUpperCase() + status.slice(1),
                preEventMode: this.model.isInPreEventMode() ? 'Active' : 'Inactive'
            };
            
            this.view.updateDebugPanel(debugInfo);
            
        } catch (error) {
            console.error('❌ Error updating debug info:', error);
        }
    }

    /**
     * Handle previous button click
     */
    handlePrevious() {
        if (!this.isRealTimeMode) {
            const agendaData = this.model.getAgendaData();
            if (this.manualEventIndex > 0) {
                this.manualEventIndex--;
                this.performUpdate();
                console.log(`Manual navigation: Previous event (${this.manualEventIndex})`);
            }
        } else {
            console.log('⚠️ Previous button disabled in Real-Time mode');
        }
    }

    /**
     * Handle next button click
     */
    handleNext() {
        if (!this.isRealTimeMode) {
            const agendaData = this.model.getAgendaData();
            if (this.manualEventIndex < agendaData.length - 1) {
                this.manualEventIndex++;
                this.performUpdate();
                console.log(`Manual navigation: Next event (${this.manualEventIndex})`);
            }
        } else {
            console.log('⚠️ Next button disabled in Real-Time mode');
        }
    }

    /**
     * Handle agenda item click
     * @param {number} index Index of clicked item
     */
    handleItemClick(index) {
        if (!this.isRealTimeMode) {
            this.manualEventIndex = index;
            this.performUpdate();
            console.log(`Manual navigation: Jump to event ${index}`);
        } else {
            console.log('⚠️ Item click disabled in Real-Time mode');
        }
    }

    /**
     * Handle keyboard input
     * @param {KeyboardEvent} e Keyboard event
     */
    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.handlePrevious();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.handleNext();
                break;
            case 'r':
            case 'R':
                e.preventDefault();
                if (!this.isRealTimeMode) {
                    this.toggleRealTimeMode();
                }
                break;
            case 't':
            case 'T':
                e.preventDefault();
                this.toggleRealTimeMode();
                break;
            case 'h':
            case 'H':
                e.preventDefault();
                // Toggle control visibility
                if (this.view.controls && this.view.controls.classList.contains('hidden')) {
                    this.view.showControls();
                    console.log('👁️ Controls shown');
                } else {
                    this.view.hideControls();
                    console.log('🙈 Controls hidden');
                }
                break;
            case 'd':
            case 'D':
                e.preventDefault();
                // Toggle debug panel
                const debugPanel = document.getElementById('debugPanel');
                if (debugPanel) {
                    debugPanel.style.display = debugPanel.style.display === 'none' ? 'block' : 'none';
                    console.log('🛠️ Debug panel toggled');
                }
                break;
            case 'p':
            case 'P':
                e.preventDefault();
                // Toggle pre-event preview mode (for testing)
                if (this.model.isInPreEventMode()) {
                    this.model.stopPreEventHighlighting();
                    console.log('🔴 Pre-event highlighting stopped (manual)');
                } else {
                    this.model.startPreEventHighlighting();
                    console.log('🟢 Pre-event highlighting started (manual)');
                }
                break;
        }
    }

    /**
     * Hide control buttons (for production deployment)
     */
    hideControlButtons() {
        this.view.hideControls();
        console.log('🙈 Control buttons hidden for production mode');
    }

    /**
     * Show control buttons (for testing)
     */
    showControlButtons() {
        this.view.showControls();
        console.log('👁️ Control buttons shown for testing mode');
    }

    /**
     * Get current system status for external monitoring
     * @returns {Object} System status object
     */
    getSystemStatus() {
        const currentIndex = this.isRealTimeMode ? 
            this.model.getCurrentEventIndex() : 
            this.manualEventIndex;
        
        const currentEvent = currentIndex >= 0 ? 
            this.model.getAgendaData()[currentIndex] : null;
        
        return {
            isRunning: !!this.updateInterval,
            mode: this.isRealTimeMode ? 'real-time' : 'manual',
            currentTime: this.model.getCurrentRealTime(),
            currentEvent: currentEvent,
            currentIndex: currentIndex,
            conferenceStatus: this.isRealTimeMode ? 
                this.model.getConferenceStatus() : 'manual',
            nextEvent: this.model.getNextEvent(),
            timeUntilNext: this.model.getTimeUntilNextEvent(),
            preEventMode: this.model.isInPreEventMode(),
            currentDay: this.model.getCurrentDay()
        };
    }

    /**
     * Force update display (useful for debugging)
     */
    performRealTimeUpdate() {
        this.performUpdate();
    }

    /**
     * Cleanup resources when page unloads
     */
    cleanup() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        
        // Cleanup view resources
        if (this.view && this.view.cleanup) {
            this.view.cleanup();
        }
        
        console.log('🧹 Climate Symposium system cleanup completed');
    }

    /**
     * Restart the system (useful for error recovery)
     */
    restart() {
        console.log('🔄 Restarting Climate Symposium system...');
        this.cleanup();
        this.isRealTimeMode = true;
        this.manualEventIndex = -1;
        this.preEventHighlightActive = false;
        this.initialize();
    }

    /**
     * Force start pre-event highlighting (for testing)
     */
    startPreEventHighlighting() {
        this.model.startPreEventHighlighting();
        console.log('🎯 Pre-event highlighting force started');
    }

    /**
     * Force stop pre-event highlighting (for testing)
     */
    stopPreEventHighlighting() {
        this.model.stopPreEventHighlighting();
        console.log('🎯 Pre-event highlighting force stopped');
    }
}

// Global console functions for Climate Symposium
window.getClimateStatus = function() {
    if (window.conferenceApp) {
        const status = window.conferenceApp.getSystemStatus();
        console.log('🌱 Climate Symposium 2025 System Status:');
        console.log('====================================');
        console.log(`🕒 Current Time: ${status.currentTime} (Sri Lankan)`);
        console.log(`🎯 Conference Status: ${status.conferenceStatus}`);
        console.log(`📅 Current Day: ${status.currentDay}`);
        console.log(`📍 Current Event: ${status.currentEvent ? status.currentEvent.title : 'None'}`);
        console.log(`⭐ Next Event: ${status.nextEvent ? status.nextEvent.title : 'None'}`);
        console.log(`⏱️ Time Until Next: ${status.timeUntilNext > 0 ? status.timeUntilNext + ' minutes' : 'N/A'}`);
        console.log(`🔄 System Running: ${status.isRunning ? 'Yes' : 'No'}`);
        console.log(`🎨 Pre-Event Mode: ${status.preEventMode ? 'Active' : 'Inactive'}`);
        console.log('====================================');
        return status;
    } else {
        console.log('⚠️ Climate Symposium system not ready yet. Please wait for initialization.');
        return null;
    }
};

window.startClimatePreview = function() {
    if (window.conferenceApp) {
        window.conferenceApp.startPreEventHighlighting();
    } else {
        console.log('⚠️ System not ready yet.');
    }
};

window.stopClimatePreview = function() {
    if (window.conferenceApp) {
        window.conferenceApp.stopPreEventHighlighting();
    } else {
        console.log('⚠️ System not ready yet.');
    }
};

window.restartClimateSystem = function() {
    if (window.conferenceApp) {
        window.conferenceApp.restart();
    } else {
        console.log('🚀 Starting Climate Symposium system for the first time...');
        // Will be initialized by app.js
    }
};

window.setClimateDay = function(dayName) {
    if (window.conferenceApp) {
        window.conferenceApp.model.setCurrentDay(dayName);
        window.conferenceApp.view.updateConferenceDay(dayName);
        console.log(`📅 Climate Symposium day updated to: ${dayName}`);
    } else {
        console.log('⚠️ System not ready yet.');
    }
};

console.log('ConferenceController loaded for Climate Symposium 2025');
console.log('🎯 Pre-event highlighting: Automatic (2h before) + Manual controls');
console.log('⌨️ Keyboard shortcuts: P (preview toggle), H (controls), D (debug)');
console.log('💡 Console commands: getClimateStatus(), startClimatePreview(), stopClimatePreview()');