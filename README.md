# GOV-SYS
# Climate Symposium 2025 - Real-Time Display System

A dual-screen real-time event display system for the Symposium on Climate Actions 2025, featuring automatic event tracking, pre-event highlighting, and cross-display synchronization.

## Overview

This system provides two synchronized displays for a multi-day climate conference:
- **Display 1**: Full agenda list with real-time event status (past/current/future)
- **Display 2**: Static informational screen with logo, event details, and QR code

## Features

### Display 1 (Agenda Screen)
- **Real-time event tracking** - Automatically detects current events based on Sri Lankan time (UTC+5:30)
- **Event status indicators**:
  - Past events: Grayed out with "Completed" tag
  - Current event: Highlighted in teal (#087F8D) with enlarged card
  - Future events: White cards
- **Pre-event highlighting** - Cycles through agenda items 2 hours before conference starts (12-second intervals)
- **Moving welcome banner** - Smooth scrolling text animation
- **Animated background** - Gradient flow effect
- **Fully responsive** - Scales from mobile to 11ft displays

### Display 2 (Information Screen)
- **Static display** - Shows throughout entire event
- **Conference branding** - Large centered logo
- **Event details** - Title, year, and tagline
- **QR code** - Links to climateaction.gov.lk
- **Background integration** - Blended bottom image overlay
- **Fully responsive** - Optimized for all screen sizes

### Technical Features
- **MVC Architecture** - Clean separation of concerns (Model, View, Controller)
- **Cross-display sync** - Display 2 automatically syncs with Display 1 via localStorage
- **Automatic day detection** - Switches between Day 1 and Day 2 based on real date
- **Real-time clock** - Updates every second with Sri Lankan time
- **Console debugging** - Built-in commands for testing and troubleshooting

## File Structure

```
├── display1.html          # Agenda display (full screen)
├── display2.html          # Information display (full screen)
├── styles.css             # Main stylesheet for Display 1
├── model.js               # Data layer - conference schedule & logic
├── view.js                # Presentation layer - DOM rendering
├── controller.js          # Business logic layer - event handlers
├── app-display1.js        # Display 1 initialization
├── app-display2.js        # Display 2 initialization
├── LOGO.png               # Conference logo
└── Background.PNG         # Bottom overlay image
```

## Setup & Installation

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs completely client-side
- Two displays (recommended) or single display setup

### Quick Start

1. **Clone or download** this repository
2. **Add your assets**:
   - Place `LOGO.png` in the root directory
   - Place `Background.PNG` in the root directory
3. **Open displays**:
   - Display 1: Open `display1.html` in browser
   - Display 2: Open `display2.html` in browser (on second screen)
4. **Full screen**: Press F11 (or Cmd+Ctrl+F on Mac) on each display

### Single Display Testing
Both displays can be viewed on one screen for testing:
- Open `display1.html` for agenda view
- Open `display2.html` in a separate window for info screen

## Configuration

### Update Conference Dates

Edit `model.js` to change conference dates:

```javascript
this.conferenceDates = {
    'Day 1': '2025-09-28',  // Update to your date (YYYY-MM-DD)
    'Day 2': '2025-09-29'   // Update to your date (YYYY-MM-DD)
};
```

### Update Event Schedule

Edit the `allAgendaData` object in `model.js`:

```javascript
'Day 1': [
    {
        time: "09:00",              // 24-hour format
        displayTime: "9:00 AM",     // Display format
        title: "Registration",      // Event name
        description: "...",         // Event description
        duration: 20                // Duration in minutes
    },
    // Add more events...
]
```

### Update QR Code Link

Edit `display2.html` line 295:

```javascript
text: "https://climateaction.gov.lk",  // Change to your URL
```

## Console Commands

Access these commands in the browser console for debugging:

### Display 1 Commands
```javascript
getClimateStatus()           // View current system status
getSchedule()                // Show full conference schedule
setClimateDay("Day 1")       // Switch between days
hideButtons()                // Hide control buttons (production mode)
showButtons()                // Show control buttons (testing mode)
startClimatePreview()        // Force start pre-event highlighting
stopClimatePreview()         // Stop pre-event highlighting
getPreEventStatus()          // Check highlighting status
restartClimateSystem()       // Restart the entire system
```

### Display 2 Commands
```javascript
getClimateStatus()           // View current system status
getSyncStatus()              // Check sync status with Display 1
restartClimateSystem()       // Restart the system
```

### Keyboard Shortcuts

**Display 1:**
- `H` - Toggle control buttons
- `D` - Toggle debug panel
- `P` - Toggle pre-event highlighting
- `R` or `T` - Reset to real-time mode

**Display 2:**
- `D` - Toggle debug panel
- `R` - Restart system

## Production Deployment

Before deploying to your event:

1. **Hide debug controls**:
   ```javascript
   hideButtons()  // Run in Display 1 console
   ```

2. **Test time tracking**: Verify events show correct status based on current time

3. **Test cross-display sync**: Ensure Display 2 updates when Display 1 changes

4. **Full screen both displays**: Press F11 on each screen

5. **Lock screens** (optional): Prevent accidental clicks/navigation

## Customization

### Colors
Edit colors in `styles.css`:
- Primary teal: `#20ADC1`
- Dark teal: `#087F8D`
- Light teal: `#7ED0DC`
- Completed tag gradient: `linear-gradient(135deg, #20ADC1 0%, #087F8D 100%)`

### Fonts
Currently uses **Poppins** font family. To change:
1. Update the `@import` in `styles.css`
2. Replace all `font-family: 'Poppins'` references

### Animation Speed
- Moving text: Edit `moveTextSlowly` animation (line 60 in styles.css) - currently 35s
- Background gradient: Edit `gradientFlow` animation (line 13 in styles.css) - currently 15s
- Pre-event highlight interval: Edit `highlightDuration` in view.js - currently 12000ms (12 seconds)

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Responsive Breakpoints

- **320px-479px**: Small phones
- **480px-767px**: Large phones
- **768px-1365px**: Tablets
- **1366px-1919px**: Laptops
- **1920px-2559px**: Desktops
- **2560px+**: 4K displays
- **2000px+ height**: 11ft tall displays

## Troubleshooting

### Events not showing as "Past"
Check the console for current time:
```javascript
conferenceApp.model.getCurrentRealTime()
```
Ensure time format matches event times.

### Display 2 not syncing
Check sync status:
```javascript
getSyncStatus()
```
Ensure localStorage is enabled in browser.

### QR code not generating
1. Check browser console for errors
2. Verify QR code library is loading from CDN
3. Ensure internet connection is active

### Background image not showing
1. Verify `Background.PNG` is in the root directory
2. Check file name matches exactly (case-sensitive)
3. Clear browser cache

## Credits

**Developed for:** Symposium on Climate Actions 2025  
**Location:** Sri Lanka  
**Time Zone:** UTC+5:30 (Sri Lankan Time)

## License

This project is provided as-is for conference display purposes.

## Support

For technical issues or questions, check the console debug commands first. Most issues can be resolved by:
1. Refreshing the page (Cmd+Shift+R or Ctrl+Shift+R)
2. Clearing browser cache
3. Checking console for error messages
4. Running `getClimateStatus()` for system diagnostics

---

**Last Updated:** September 29, 2025  
**Version:** 1.0.0