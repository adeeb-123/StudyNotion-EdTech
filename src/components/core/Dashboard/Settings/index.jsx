import ChangePassword from "./ChangePassword";
import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteProfile from "./DeleteProfile";
import EditProfile from "./EditProfile";

export default function Settings() {
  return (
    <div className="w-11/12 h-fit min-h-screen flex flex-col gap-8  pt-12 pl-10">
      <h2 className="text-2xl font-semibold text-richblack-5 text-left w-[80%]  mx-auto">
        Edit Profile
      </h2>
      {/* Change Profile Picture Section  */}
      <ChangeProfilePicture/>
      {/* Edit Profile Section */}
      <EditProfile/>
      {/* ChangePAsswordSection  */}
      <ChangePassword/>
      {/* {deleteProfile } */}
      <DeleteProfile/>
    </div>
  );
}
