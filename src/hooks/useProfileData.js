import { useState, useEffect } from 'react';

const defaultData = {
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  bio: "Passionate second-year student exploring the intersections of Science and Programming. Always looking for new learning opportunities and mentors. Currently focused on full-stack development and data visualization.",
  interests: [
    { name: "Computer Science" },
    { name: "UI Design" },
    { name: "AI" },
    { name: "Robotics" }
  ],
  socialLinks: [
    { type: "website", url: "https://alexjohnson.dev", label: "alexjohnson.dev" },
    { type: "github", url: "https://github.com/alex-j", label: "GitHub / alex-j" }
  ],
  activity: [
    { value: 0, label: "Questions Asked" },
    { value: 0, label: "Questions Answered" }
  ]
};

export function useProfileData() {
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem('gdgc-profile-data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.activity) {
          parsed.activity = [
            { value: 0, label: "Questions Asked" },
            { value: 0, label: "Questions Answered" }
          ];
        }
        return parsed;
      }
      return defaultData;
    } catch {
      return defaultData;
    }
  });

  useEffect(() => {
    localStorage.setItem('gdgc-profile-data', JSON.stringify(profileData));
  }, [profileData]);

  const updateProfile = (updates) => {
    setProfileData(prev => ({ ...prev, ...updates }));
  };

  const addInterest = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: [...prev.interests, interest]
    }));
  };

  const removeInterest = (index) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const addSocialLink = (link) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, link]
    }));
  };

  const removeSocialLink = (index) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const updateActivity = (index, increment) => {
    setProfileData(prev => ({
      ...prev,
      activity: prev.activity.map((stat, i) => 
        i === index ? { ...stat, value: Math.max(0, stat.value + increment) } : stat
      )
    }));
  };

  return {
    profileData,
    updateProfile,
    addInterest,
    removeInterest,
    addSocialLink,
    removeSocialLink,
    updateActivity
  };
}