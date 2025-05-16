# Profile Tracker App

This is a customizable profile tracking app built with React and Firebase. It supports uploading images, storing profile data in Firestore, and includes safety mechanisms like time-based data cleanup and rate-limiting.

## Features

- Add and view user profiles
- Automatically delete demo data after 7 days (TTL)
- Rate-limited writes to reduce abuse
- Easily adaptable for different use cases (BJJ, classes, teams, etc.)

## App Demo
https://angelsprofileapp.netlify.app/

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/ArcadioAlpuche/profile-app.git
cd your-public-repo
npm install
```
### 2. Set Up Firebase
```
You'll need to create your own Firebase project to use this app locally or in production.

a. Create a Firebase Project
Go to Firebase Console

Click "Add project" and follow the setup steps

b. Register a Web App
In Project Settings → General, scroll to Your Apps

Click the </> icon to create a Web app

Copy the config object provided

c. Create .env.local File
In the root of your project, create a file called .env.local:
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_app_id_here
```

### 3. Start the App
```
npm start
```

### Firebase Security Setup (Optional But Recommended)
```
To support rate limiting and automatic cleanup, update your Firestore rules:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /profiles/{profileId} {
      allow read: if true;
      allow write: if
        !exists(/databases/$(database)/documents/profiles/$(profileId)) ||
        request.time > resource.data.lastUpdated + duration.value(10, 's');
    }

    match /{document=**} {
      allow read: if true;
    }
  }
}
```
