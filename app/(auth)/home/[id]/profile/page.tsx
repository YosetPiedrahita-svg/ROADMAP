import DataProfile from "@/components/home/id/profile/dataprofile-profile";
import FormUpdateProfile from "@/components/home/id/profile/form-updateProfile-profile";

const ProfilePage = () => {
  return (
    <main
      className=" min-h-screen min-w-screen flex flex-col items-center 
    bg-gray-50/50 gap-5 dark:bg-zinc-900"
    >
      <DataProfile />
      <FormUpdateProfile />
    </main>
  );
};

export default ProfilePage;
