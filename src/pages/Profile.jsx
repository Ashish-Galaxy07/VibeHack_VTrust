import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import ProfileHeader from '../components/profile/ProfileHeader';
import AboutSection from '../components/profile/AboutSection';
import InterestsSection from '../components/profile/InterestsSection';
import ActivitySection from '../components/profile/ActivitySection';
import SocialLinksSection from '../components/profile/SocialLinksSection';
import EditAboutModal from '../components/profile/EditAboutModal';
import EditInterestsModal from '../components/profile/EditInterestsModal';
import ShareProfileModal from '../components/profile/ShareProfileModal';
import AddSocialLinkModal from '../components/profile/AddSocialLinkModal';
import { useProfileData } from '../hooks/useProfileData';
import ResumeCard from "../components/profile/ResumeCard";


function Profile() {
  const {
    profileData,
    updateProfile,
    removeInterest,
    addSocialLink,
    removeSocialLink,
  } = useProfileData();

  const [editAboutOpen, setEditAboutOpen] = useState(false);
const [editInterestsOpen, setEditInterestsOpen] = useState(false);

  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [addSocialLinkDialogOpen, setAddSocialLinkDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState(profileData);

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setEditAboutOpen(false);
    setEditInterestsOpen(false);
    alert('Profile updated successfully!');
  };

  const handleRemoveInterest = (index) => {
    const removed = profileData.interests[index];
    removeInterest(index);
    alert(`Removed "${removed.name}" from your interests`);
  };

  const handleAddSocialLink = (socialForm) => {
    if (socialForm.url.trim() && socialForm.label.trim()) {
      addSocialLink(socialForm);
      setAddSocialLinkDialogOpen(false);
      alert('Social link added successfully!');
    }
  };

  const handleRemoveSocialLink = (index) => {
    const removed = profileData.socialLinks[index];
    removeSocialLink(index);
    alert(`Removed "${removed.label}" from your social links`);
  };

  useEffect(() => {
    setEditForm(profileData);
  }, [profileData]);

  return (
    <MainLayout>
      <div className="max-w-md lg:max-w-4xl xl:max-w-5xl mx-auto lg:ml-8 xl:ml-12 -mt-4 lg:-mt-6">

        <ProfileHeader
          name={profileData.name}
          email={profileData.email}
          onEditClick={() => {}}
          onShareClick={() => setShareDialogOpen(true)}
        />

        <div className="px-4 lg:px-8 py-6 lg:py-8 space-y-4 lg:space-y-6">
          <div className="bg-[var(--panel-accent-bg)] border border-border/40 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
            <ResumeCard />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <AboutSection
              bio={profileData.bio}
              onEdit={() => setEditAboutOpen(true)}
            />
            <InterestsSection
              interests={profileData.interests}
              onRemove={handleRemoveInterest}
              onEdit={() => setEditInterestsOpen(true)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <ActivitySection
              stats={profileData.activity}
            />
            <SocialLinksSection
              links={profileData.socialLinks}
              onAddClick={() => setAddSocialLinkDialogOpen(true)}
              onRemove={handleRemoveSocialLink}
            />
          </div>
        </div>

        <EditAboutModal
  isOpen={editAboutOpen}
  onClose={() => setEditAboutOpen(false)}
  editForm={editForm}
  setEditForm={setEditForm}
  onSave={handleSaveProfile}
/>

<EditInterestsModal
  isOpen={editInterestsOpen}
  onClose={() => setEditInterestsOpen(false)}
  editForm={editForm}
  setEditForm={setEditForm}
  onSave={handleSaveProfile}
/>

        <ShareProfileModal
          isOpen={shareDialogOpen}
          onClose={() => setShareDialogOpen(false)}
        />

        <AddSocialLinkModal
          isOpen={addSocialLinkDialogOpen}
          onClose={() => setAddSocialLinkDialogOpen(false)}
          onAdd={handleAddSocialLink}
        />
      </div>
    </MainLayout>
  );
}

export default Profile;