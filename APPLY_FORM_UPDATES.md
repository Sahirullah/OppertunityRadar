# Apply Form Modal - Indeed-Style Updates

## Changes Made

### 1. Resume Options Display
- Updated to show resume options exactly like Indeed
- Each resume option displays:
  - PDF icon (red color like Indeed)
  - Resume file name
  - Upload date
  - "Recommended" badge for default CV
  - Checkmark when selected
  - Blue border and background when selected

### 2. Resume Preview
- Shows selected CV in a PDF-like document preview
- Displays:
  - File name with PDF icon in header
  - Checkmark icon in header
  - Full CV content (name, contact, summary, skills, experience, education)
  - Scrollable content area (max-height: 500px)
  - "CV options" button at the bottom

### 3. Design Improvements
- Red PDF icons (#d84a38) matching Indeed design
- Blue selection state (#0052cc) for selected resumes
- Proper spacing and padding
- Hover effects on resume options
- Professional typography using monospace font for resume content

### 4. Functionality
- Click any resume option to select it
- Preview updates immediately when selecting a different resume
- Form validation ensures a CV is selected before submission
- Selected CV ID is included in the application submission

## Resume Option Structure

```
┌─────────────────────────────────────────┐
│ 📄 MyResume-MS.pdf                  ✓   │
│    Uploaded Jan 27, 2026                │
│    Recommended                          │
└─────────────────────────────────────────┘
```

## Resume Preview Structure

```
┌─────────────────────────────────────────┐
│ 📄 MyResume-MS.pdf                  ✓   │
├─────────────────────────────────────────┤
│                                         │
│  S A H I R U L L A H                    │
│  Email: ... | Phone: ...                │
│                                         │
│  PROFESSIONAL SUMMARY                   │
│  [Content...]                           │
│                                         │
│  SKILLS                                 │
│  • Skill 1                              │
│  • Skill 2                              │
│                                         │
│  EXPERIENCE                             │
│  [Content...]                           │
│                                         │
│  EDUCATION                              │
│  [Content...]                           │
│                                         │
├─────────────────────────────────────────┤
│  ⚙️ CV options                          │
└─────────────────────────────────────────┘
```

## CSS Classes Updated

- `.resumeIconWrapper` - Red PDF icon styling
- `.resumePreview` - PDF-like document container
- `.previewHeader` - Header with file name and checkmark
- `.previewContent` - Scrollable content area
- `.cvOptionsBtn` - Bottom button for CV options
- `.resumeText` - Monospace font for resume content

## User Experience Flow

1. User clicks "Apply" on a job
2. Apply Form Modal opens
3. All user's CVs are displayed as options
4. User clicks a CV to select it
5. Preview updates to show the selected CV
6. User fills in form fields (auto-populated from profile)
7. User clicks "Continue" to submit application
8. Application is submitted with selected CV

## Notes

- CVs are stored in localStorage via CVContext
- Default CV is marked with "Recommended" badge
- Selected CV is highlighted with blue border and background
- Preview content is scrollable for long CVs
- All styling matches Indeed's design language
