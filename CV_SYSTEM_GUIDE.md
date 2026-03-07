# CV System Guide

## Overview
The CV system allows users to create, manage, and use multiple CVs when applying for jobs. CVs are stored in the browser's localStorage and can be selected when submitting job applications.

## How It Works

### 1. Creating a CV
- Navigate to the **CV Maker** page from the header menu
- Click **"+ Create New CV"** button
- Fill in your information:
  - Full Name
  - Email
  - Phone
  - Professional Summary
  - Experience
  - Education
  - Skills
- Click **"Save CV"** to create the CV

### 2. Managing CVs
- View all your CVs on the CV Maker page
- **Edit**: Click the ✏️ Edit button to modify a CV
- **Delete**: Click the 🗑️ Delete button to remove a CV
- **Set Default**: Click the ⭐ Set Default button to mark a CV as your default (shown first in applications)

### 3. Applying with a CV
- When you click **"Apply"** on a job posting, the Apply Form Modal opens
- The modal shows:
  - Your available CVs
  - A preview of the selected CV
  - Application form fields (Full Name, Email, Phone)
- Select a CV from the list
- The preview updates to show the selected CV content
- Fill in the form fields
- Click **"Continue"** to submit your application

## Data Storage
- CVs are stored in browser localStorage under the key `userCVs`
- Each CV contains:
  - `id`: Unique identifier
  - `fileName`: Name of the CV file
  - `uploadedDate`: When the CV was created
  - `content`: The CV data (name, email, phone, summary, experience, education, skills)
  - `isDefault`: Whether this is the default CV

## CV Content Structure
```javascript
{
  name: "Your Name",
  email: "your@email.com",
  phone: "+1-234-567-8900",
  summary: "Professional summary text",
  skills: ["Skill 1", "Skill 2", "Skill 3"],
  experience: [
    {
      position: "Job Title",
      company: "Company Name",
      startDate: "2020",
      endDate: "2022",
      description: "Job description"
    }
  ],
  education: [
    {
      degree: "Bachelor of Science",
      school: "University Name",
      year: "2020"
    }
  ]
}
```

## Features
- ✅ Create multiple CVs
- ✅ Edit existing CVs
- ✅ Delete CVs
- ✅ Set default CV
- ✅ Preview CV before applying
- ✅ Auto-fill user information from profile
- ✅ Persistent storage (localStorage)
- ✅ Real-time preview updates

## Integration Points
- **CVContext**: Manages CV state and operations
- **ApplyFormModal**: Displays CVs and allows selection
- **CV Maker Page**: UI for creating and managing CVs
- **AuthContext**: Provides user information for pre-filling forms

## Future Enhancements
- PDF export functionality
- CV templates
- Cloud storage integration
- CV versioning
- Automatic CV selection based on job match
