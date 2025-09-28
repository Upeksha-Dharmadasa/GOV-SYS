/* ============================================================================
   APPLICATION INITIALIZATION - DISPLAY 2 (EVENT DETAILS) - CLIMATE SYMPOSIUM 2025
   ============================================================================ */

// Global controller instance
let conferenceApp = null;

/**
 * Initialize particles for display 2 only
 */
async function initializeParticles() {
    try {
        // Check if tsParticles is available
        if (typeof tsParticles === 'undefined') {
            throw new Error('tsParticles library not loaded');
        }

        // Climate-themed particles configuration for Display 2
        const climateParticlesConfig = {
            particles: {
                color: {
                    value: ["#27ae60", "#2ecc71", "#ffffff", "#3498db"]
                },
                links: {
                    color: "#27ae60",
                    opacity: 0.3,
                    width: 1.2,
                    distance: 130
                },
                number: {
                    value: 45
                },
                opacity: {
                    value: 0.4,
                    random: {
                        enable: true,
                        minimumValue: 0.1
                    }
                },
                size: {
                    value: 2.5,
                    random: {
                        enable: true,
                        minimumValue: 1
                    }
                },
                move: {
                    enable: true,
                    speed: 0.25, // Gentle movement for details view
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: {
                        default: "bounce"
                    }
                },
                shape: {
                    type: ["circle", "triangle"]
                }
            },
            background: {
                color: {
                    value: "transparent"
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab"
                    },
                    onClick: {
                        enable: false
                    }
                },
                modes: {
                    grab: {
                        distance: 100,
                        links: {
                            opacity: 0.6,
                            color: "#2ecc71"
                        }
                    }
                }
            },
            detectRetina: true,
            fpsLimit: 30
        };

        // Load particles for display 2 only
        await tsParticles.load("tsparticles-right", climateParticlesConfig);
        
        console.log('Climate-themed particles initialized successfully for Display 2');
        
    } catch (error) {
        console.error('Failed to initialize particles:', error.message);
        
        // Retry after 5 seconds
        setTimeout(() => {
            console.log('Retrying particle initialization...');
            initializeParticles();
        }, 5000);
    }
}

/**
 * Initialize the application when page loads
 */
function initializeConferenceApp() {
    try {
        console.log('Climate Symposium 2025 Real-Time Display System - DISPLAY 2 (EVENT DETAILS)');
        console.log('================================================');
        
        // Create the controller (which creates model and view)
        conferenceApp = new ConferenceController();
        
        // Set up cross-display synchronization listener
        setupCrossDisplaySync();
        
        // Initialize particles after a short delay to ensure DOM is ready
        setTimeout(() => {
            initializeParticles();
        }, 1000);
        
        // Log system information
        console.log('Location: Sri Lanka (UTC+5:30)');
        console.log('Event: Symposium on Climate Actions 2025');
        console.log('Schedule: Day 1 (Sep 30), Day 2 (Oct 1)');
        console.log('Mode: Real-Time Automatic (Synced with Display 1)');
        console.log('Design: Climate Action Theme with Enhanced Particles');
        console.log('Display: 2 - Event Details and Current Information');
        console.log('Sync: Automatic synchronization with Display 1');
        console.log('================================================');
        
        // Log available controls
        setTimeout(() => {
            logAvailableControls();
        }, 3000);
        
    } catch (error) {
        console.error('Critical error initializing Climate Symposium app:', error);
        
        // Show error in the UI if possible
        const errorContainer = document.getElementById('currentDetail');
        if (errorContainer) {
            errorContainer.innerHTML = `
                <div class="no-current-event">
                    <h2>System Error</h2>
                    <p>Failed to initialize Climate Symposium 2025 display system</p>
                    <div class="conference-info">
                        <h4>Error Details</h4>
                        <p>Please refresh the page</p>
                        <p>Check your internet connection</p>
                        <p>Contact technical support</p>
                        <p style="font-family: monospace; font-size: 0.8em; margin-top: 10px;">
                            Error: ${error.message}
                        </p>
                    </div>
                </div>
            `;
        }
    }
}

/**
 * Set up cross-display synchronization
 */
function setupCrossDisplaySync() {
    // Listen for sync updates from Display 1
    window.addEventListener('storage', (e) => {
        if (e.key === 'climate2025_sync' && e.newValue && conferenceApp) {
            try {
                const syncData = JSON.parse(e.newValue);
                // Only sync if data is recent (within 3 seconds)
                if (Date.now() - syncData.timestamp < 3000) {
                    console.log('Syncing with Display 1:', syncData);
                    
                    // Update our model to match Display 1
                    conferenceApp.model.setCurrentEventIndex(syncData.currentEventIndex);
                    conferenceApp.model.conferenceStatus = syncData.conferenceStatus;
                    
                    // Set current day if provided
                    if (syncData.currentDay) {
                        conferenceApp.model.setCurrentDay(syncData.currentDay);
                    }
                    
                    // Update display
                    conferenceApp.updateDisplay();
                    
                    // Update debug sync status
                    updateSyncStatus('Synced');
                }
            } catch (error) {
                console.error('Error processing sync data:', error);
                updateSyncStatus('Error');
            }
        }
    });

    // Also check localStorage periodically for initial sync
    setInterval(() => {
        const syncData = localStorage.getItem('climate2025_sync');
        if (syncData && conferenceApp) {
            try {
                const data = JSON.parse(syncData);
                if (Date.now() - data.timestamp < 3000) {
                    // Silent sync - update model state
                    conferenceApp.model.setCurrentEventIndex(data.currentEventIndex);
                    conferenceApp.model.conferenceStatus = data.conferenceStatus;
                    
                    if (data.currentDay) {
                        conferenceApp.model.setCurrentDay(data.currentDay);
                    }
                    
                    conferenceApp.updateDisplay();
                }
            } catch (error) {
                // Ignore errors in periodic sync
            }
        }
    }, 2000);
}

/**
 * Update sync status in debug panel
 */
function updateSyncStatus(status) {
    const debugSync = document.getElementById('debugSync');
    if (debugSync) {
        debugSync.textContent = status;
        debugSync.style.color = status === 'Synced' ? '#27ae60' : 
                                status === 'Error' ? '#e74c3c' : '#95a5a6';
    }
}

/**
 * Log available control functions to console
 */
function logAvailableControls() {
    console.log('\nAvailable Console Commands (Display 2):');
    console.log('=====================================');
    console.log('getClimateStatus()    - Get current system status');
    console.log('getSchedule()         - View full conference schedule');
    console.log('restartClimateSystem()- Restart the entire system');
    console.log('setClimateDay("Day 1")- Change conference day display');
    console.log('hideParticles()       - Hide particle effects');
    console.log('showParticles()       - Show particle effects');
    console.log('getSyncStatus()       - Check sync status with Display 1');
    console.log('');
    console.log('Keyboard Shortcuts:');
    console.log('D                     - Toggle debug panel');
    console.log('R                     - Restart system');
    console.log('');
    console.log('Climate Symposium Features (Display 2):');
    console.log('- Automatically syncs with Display 1');
    console.log('- Shows detailed event information');
    console.log('- Real-time tracking of Sri Lankan time');
    console.log('- Climate-themed particle effects');
    console.log('- Cross-display synchronization enabled');
    console.log('- No manual controls (follows Display 1)');
    console.log('=====================================\n');
}

/**
 * Hide particle effects
 */
function hideParticles() {
    const rightParticles = document.getElementById('tsparticles-right');
    if (rightParticles) rightParticles.style.display = 'none';
    console.log('Climate particles hidden');
}

/**
 * Show particle effects
 */
function showParticles() {
    const rightParticles = document.getElementById('tsparticles-right');
    if (rightParticles) rightParticles.style.display = 'block';
    console.log('Climate particles shown');
}

/**
 * Get current system status (alias for compatibility)
 */
function getStatus() {
    return getClimateStatus();
}

/**
 * Restart the entire system (alias for compatibility)
 */
function restartSystem() {
    return restartClimateSystem();
}

/**
 * Get conference schedule for reference
 */
function getSchedule() {
    if (conferenceApp) {
        const agenda = conferenceApp.model.getAgendaData();
        const currentDay = conferenceApp.model.getCurrentDay();
        console.log(`Climate Symposium 2025 Schedule - ${currentDay} (Sri Lankan Time):`);
        console.log('=================================================');
        agenda.forEach((item, index) => {
            const duration = item.duration ? ` (${item.duration} min)` : '';
            console.log(`${index + 1}. ${item.displayTime} - ${item.title}${duration}`);
        });
        console.log('=================================================');
        return agenda;
    } else {
        console.log('System not ready yet. Please wait for initialization.');
        return null;
    }
}

/**
 * Change conference day display
 */
function setDay(dayName) {
    return setClimateDay(dayName);
}

/**
 * Get synchronization status with Display 1
 */
function getSyncStatus() {
    const syncData = localStorage.getItem('climate2025_sync');
    if (syncData) {
        try {
            const data = JSON.parse(syncData);
            const timeDiff = Date.now() - data.timestamp;
            const isRecent = timeDiff < 3000;
            
            console.log('Cross-Display Sync Status:');
            console.log('==========================');
            console.log(`Last Sync: ${new Date(data.timestamp).toLocaleTimeString()}`);
            console.log(`Time Since: ${Math.round(timeDiff / 1000)} seconds ago`);
            console.log(`Status: ${isRecent ? 'Active' : 'Stale'}`);
            console.log(`Current Event Index: ${data.currentEventIndex}`);
            console.log(`Conference Status: ${data.conferenceStatus}`);
            console.log(`Current Day: ${data.currentDay || 'Not specified'}`);
            console.log(`Pre-Event Mode: ${data.preEventMode ? 'Active' : 'Inactive'}`);
            console.log('==========================');
            
            return {
                isRecent,
                timeDiff: Math.round(timeDiff / 1000),
                data: data
            };
        } catch (error) {
            console.log('Sync data parsing error:', error);
            return null;
        }
    } else {
        console.log('No sync data available from Display 1');
        return null;
    }
}

/**
 * Update debug panel with Display 2 specific information
 */
function updateDisplay2Debug() {
    if (conferenceApp) {
        const status = conferenceApp.getSystemStatus();
        const syncData = getSyncStatus();
        
        // Update debug elements
        const debugSystemTime = document.getElementById('debugSystemTime');
        const debugCurrentEvent = document.getElementById('debugCurrentEvent');
        const debugStatus = document.getElementById('debugStatus');
        const debugDay = document.getElementById('debugDay');
        
        if (debugSystemTime) debugSystemTime.textContent = status.currentTime;
        if (debugCurrentEvent) debugCurrentEvent.textContent = status.currentEvent ? status.currentEvent.title : 'None';
        if (debugStatus) debugStatus.textContent = status.conferenceStatus;
        if (debugDay) debugDay.textContent = status.currentDay;
        
        // Update sync status
        if (syncData) {
            updateSyncStatus(syncData.isRecent ? 'Synced' : 'Stale');
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeConferenceApp);
} else {
    initializeConferenceApp();
}

// Handle page errors
window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
});

// Keyboard event handlers for Display 2
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'd':
        case 'D':
            e.preventDefault();
            // Toggle debug panel
            const debugPanel = document.getElementById('debugPanel');
            if (debugPanel) {
                debugPanel.style.display = debugPanel.style.display === 'none' ? 'block' : 'none';
                console.log('Debug panel toggled');
            }
            break;
        case 'r':
        case 'R':
            e.preventDefault();
            // Restart system
            if (conferenceApp) {
                conferenceApp.restart();
                console.log('System restarted');
            }
            break;
    }
});

// Expose global functions
window.getStatus = getStatus;
window.getSchedule = getSchedule;
window.restartSystem = restartSystem;
window.setDay = setDay;
window.hideParticles = hideParticles;
window.showParticles = showParticles;
window.getSyncStatus = getSyncStatus;

// Expose the controller for advanced debugging
Object.defineProperty(window, 'conferenceApp', {
    get: () => conferenceApp,
    enumerable: true
});

// Monitor system health
setInterval(() => {
    if (conferenceApp) {
        const status = conferenceApp.getSystemStatus();
        if (!status.isRunning) {
            console.warn('System health check: Updates not running, attempting restart...');
            conferenceApp.restart();
        }
    }
}, 30000);

// Update debug panel periodically
setInterval(() => {
    updateDisplay2Debug();
}, 5000);

// Log system startup completion
setTimeout(() => {
    if (conferenceApp) {
        console.log('Climate Symposium 2025 Display 2 is ready!');
        console.log('Type getClimateStatus() to see current status');
        console.log('Type setClimateDay("Day 1") to change conference day');
        console.log('Type getSyncStatus() to check sync with Display 1');
        console.log('System is synced with Display 1 automatically');
        console.log('Shows detailed event information and descriptions');
    }
}, 5000);