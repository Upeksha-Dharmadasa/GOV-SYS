/* ============================================================================
   APPLICATION INITIALIZATION - DISPLAY 1 (AGENDA LIST) - CLIMATE SYMPOSIUM 2025
   ============================================================================ */

// Global controller instance
let conferenceApp = null;

/**
 * Initialize particles for display 1 only
 */
async function initializeParticles() {
    try {
        // Check if tsParticles is available
        if (typeof tsParticles === 'undefined') {
            throw new Error('tsParticles library not loaded');
        }

        // Slow-motion particles configuration - Climate theme
        const climateParticlesConfig = {
            particles: {
                color: {
                    value: ["#27ae60", "#2ecc71", "#ffffff"]
                },
                links: {
                    color: "#27ae60",
                    opacity: 0.4,
                    width: 1.5,
                    distance: 140
                },
                number: {
                    value: 60
                },
                opacity: {
                    value: 0.5,
                    random: {
                        enable: true,
                        minimumValue: 0.1
                    }
                },
                size: {
                    value: 3,
                    random: {
                        enable: true,
                        minimumValue: 1
                    }
                },
                move: {
                    enable: true,
                    speed: 0.3, // Slightly faster for environmental energy
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
                        distance: 120,
                        links: {
                            opacity: 0.8,
                            color: "#2ecc71"
                        }
                    }
                }
            },
            detectRetina: true,
            fpsLimit: 30
        };

        // Load particles for display 1 only
        await tsParticles.load("tsparticles-left", climateParticlesConfig);
        
        console.log('Climate-themed particles initialized successfully for Display 1');
        
        // Hide particle error message if it exists
        const particleError = document.getElementById('particleError');
        if (particleError) {
            particleError.style.display = 'none';
        }
        
    } catch (error) {
        console.error('Failed to initialize particles:', error.message);
        
        // Show error message in debug panel
        const particleError = document.getElementById('particleError');
        if (particleError) {
            particleError.style.display = 'block';
            particleError.textContent = `Particles failed: ${error.message}`;
        }
        
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
        console.log('Climate Symposium 2025 Real-Time Display System - DISPLAY 1 (AGENDA)');
        console.log('================================================');
        
        // Create the controller (which creates model and view)
        conferenceApp = new ConferenceController();
        
        // Set up cross-display synchronization
        setupCrossDisplaySync();
        
        // Initialize particles after a short delay to ensure DOM is ready
        setTimeout(() => {
            initializeParticles();
        }, 1000);
        
        // Log system information
        console.log('Location: Sri Lanka (UTC+5:30)');
        console.log('Event: Symposium on Climate Actions 2025');
        console.log('Schedule: Day 1 (Sep 30), Day 2 (Oct 1)');
        console.log('Mode: Real-Time Automatic with Pre-Event Highlighting');
        console.log('Design: Climate Action Theme with Enhanced Particles');
        console.log('Display: 1 - Agenda List with Pre-Event Preview');
        console.log('Highlight: 12-second intervals, 2 hours before event start');
        console.log('================================================');
        
        // Log available controls
        setTimeout(() => {
            logAvailableControls();
        }, 3000);
        
    } catch (error) {
        console.error('Critical error initializing Climate Symposium app:', error);
        
        // Show error in the UI if possible
        const errorContainer = document.getElementById('agendaList');
        if (errorContainer) {
            errorContainer.innerHTML = `
                <div style="color: white; text-align: center; padding: 50px;">
                    <h2>System Error</h2>
                    <p>Failed to initialize Climate Symposium 2025 display system</p>
                    <div style="margin-top: 20px;">
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
    // Broadcast current state for cross-display sync
    setInterval(() => {
        if (conferenceApp) {
            const status = conferenceApp.getSystemStatus();
            localStorage.setItem('climate2025_sync', JSON.stringify({
                currentEventIndex: status.currentEvent ? conferenceApp.model.getCurrentEventIndex() : -1,
                conferenceStatus: status.conferenceStatus,
                currentTime: status.currentTime,
                currentDay: status.currentDay,
                preEventMode: status.preEventMode,
                timestamp: Date.now()
            }));
        }
    }, 1000);
}

/**
 * Log available control functions to console
 */
function logAvailableControls() {
    console.log('\nAvailable Console Commands:');
    console.log('=====================================');
    console.log('hideButtons()         - Hide control buttons for production');
    console.log('showButtons()         - Show control buttons for testing');
    console.log('getClimateStatus()    - Get current system status');
    console.log('getSchedule()         - View full conference schedule');
    console.log('restartClimateSystem()- Restart the entire system');
    console.log('setClimateDay("Day 1")- Change conference day display');
    console.log('hideParticles()       - Hide particle effects');
    console.log('showParticles()       - Show particle effects');
    console.log('startClimatePreview() - Force start pre-event highlighting');
    console.log('stopClimatePreview()  - Force stop pre-event highlighting');
    console.log('');
    console.log('Keyboard Shortcuts:');
    console.log('H                     - Toggle control buttons');
    console.log('D                     - Toggle debug panel');
    console.log('P                     - Toggle pre-event highlighting');
    console.log('R/T                   - Reset to real-time mode');
    console.log('Left/Right Arrows     - Manual navigation (testing only)');
    console.log('');
    console.log('Climate Symposium Features:');
    console.log('- System automatically tracks real Sri Lankan time');
    console.log('- Pre-event highlighting starts 2 hours before first event');
    console.log('- Each agenda item highlighted for 12 seconds in sequence');
    console.log('- During event: highlights only current active item');
    console.log('- Manual overrides reset to real-time after 30 seconds');
    console.log('- Debug panel shows pre-event mode status');
    console.log('- Green climate-themed particle effects');
    console.log('- Cross-display sync enabled with Display 2');
    console.log('=====================================\n');
}

/**
 * Hide control buttons (for production deployment)
 */
function hideButtons() {
    if (conferenceApp) {
        conferenceApp.hideControlButtons();
        
        const debugPanel = document.getElementById('debugPanel');
        if (debugPanel) {
            debugPanel.style.display = 'none';
        }
        
        console.log('Production mode activated - controls hidden');
        console.log('Clean display ready for Climate Symposium presentation');
    } else {
        console.log('System not ready yet. Please wait for initialization.');
    }
}

/**
 * Show control buttons (for testing)
 */
function showButtons() {
    if (conferenceApp) {
        conferenceApp.showControlButtons();
        
        const debugPanel = document.getElementById('debugPanel');
        if (debugPanel) {
            debugPanel.style.display = 'block';
        }
        
        console.log('Testing mode activated - controls visible');
    } else {
        console.log('System not ready yet. Please wait for initialization.');
    }
}

/**
 * Hide particle effects
 */
function hideParticles() {
    const leftParticles = document.getElementById('tsparticles-left');
    if (leftParticles) leftParticles.style.display = 'none';
    console.log('Climate particles hidden');
}

/**
 * Show particle effects
 */
function showParticles() {
    const leftParticles = document.getElementById('tsparticles-left');
    if (leftParticles) leftParticles.style.display = 'block';
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
 * Test pre-event highlighting manually
 */
function testPreEventHighlighting() {
    if (conferenceApp && conferenceApp.view) {
        console.log('Testing pre-event highlighting for 30 seconds...');
        conferenceApp.view.startPreEventHighlights();
        
        // Stop after 30 seconds
        setTimeout(() => {
            conferenceApp.view.stopPreEventHighlights();
            console.log('Pre-event highlighting test completed');
        }, 30000);
    } else {
        console.log('System not ready yet. Please wait for initialization.');
    }
}

/**
 * Get pre-event mode status
 */
function getPreEventStatus() {
    if (conferenceApp && conferenceApp.model) {
        const isActive = conferenceApp.model.isInPreEventMode();
        const highlightIndex = conferenceApp.model.getCurrentHighlightIndex();
        console.log('Pre-Event Highlighting Status:');
        console.log('==============================');
        console.log(`Active: ${isActive ? 'Yes' : 'No'}`);
        console.log(`Current Highlight Index: ${highlightIndex}`);
        console.log(`Highlight Duration: 12 seconds per item`);
        console.log(`Trigger: 2 hours before first event`);
        console.log('==============================');
        return { isActive, highlightIndex };
    } else {
        console.log('System not ready yet.');
        return null;
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

// Expose global functions
window.hideButtons = hideButtons;
window.showButtons = showButtons;
window.getStatus = getStatus;
window.getSchedule = getSchedule;
window.restartSystem = restartSystem;
window.setDay = setDay;
window.hideParticles = hideParticles;
window.showParticles = showParticles;
window.testPreEventHighlighting = testPreEventHighlighting;
window.getPreEventStatus = getPreEventStatus;

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

// Log system startup completion
setTimeout(() => {
    if (conferenceApp) {
        console.log('Climate Symposium 2025 Display 1 is ready!');
        console.log('Type getClimateStatus() to see current status');
        console.log('Type hideButtons() for production mode');
        console.log('Type setClimateDay("Day 1") to change conference day');
        console.log('Type startClimatePreview() to test highlighting');
        console.log('Type getPreEventStatus() to check highlighting status');
        console.log('System is now tracking real Sri Lankan time automatically');
        console.log('Pre-event highlighting will begin 2 hours before first event');
    }
}, 5000);