import { Button, InputField, ButtonSpinner, OrderHistory } from "../components";
import { useState, useRef } from "react";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineCamera,
} from "react-icons/ai";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  useUpdateUserProfileMutation,
  useUploadImageMutation,
} from "../features/userApiSlice";
import { setCredentials } from "../features/userSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { userInfo } = useSelector((state) => state.user);
  const isGoogleUser = userInfo?.isGoogleUser;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(userInfo?.picture || "");
  const [imageFile, setImageFile] = useState(null);

  const [updateUser, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, GIF)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    try {
      console.log("Starting image upload...");

      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error("Failed to read file"));
        reader.readAsDataURL(imageFile);
      });

      console.log("Base64 conversion complete, uploading to server...");

      const uploadResult = await uploadImage({ image: base64 }).unwrap();
      console.log("Upload successful:", uploadResult.image);

      return uploadResult.image;
    } catch (error) {
      console.error("Image upload error:", error);

      if (error.status === 413) {
        toast.error("Image file is too large. Please select a smaller image.");
      } else if (error.status === 400) {
        toast.error("Invalid image format. Please select a valid image file.");
      } else if (error.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Failed to upload image. Please try again.");
      }
      throw error;
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const isNameUnchanged = name.trim() === userInfo.name;
    const isEmailUnchanged = email.trim() === userInfo.email;
    const isPasswordEmpty = password.trim() === "";
    const hasImageChange = imageFile !== null;

    if (isGoogleUser && !hasImageChange) {
      toast.error("Please log in with email and password to use this feature.");
      return;
    }

    if (
      isNameUnchanged &&
      isEmailUnchanged &&
      isPasswordEmpty &&
      !hasImageChange
    ) {
      toast.error("You haven't changed anything yet");
      return;
    }

    if (!isGoogleUser && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      let uploadedImageUrl = userInfo.picture;
      if (hasImageChange) {
        uploadedImageUrl = await handleImageUpload();
      }
      const updateData = {
        _id: userInfo._id,
        picture: uploadedImageUrl,
      };

      if (!isGoogleUser) {
        updateData.name = name;
        updateData.email = email;
        if (!isPasswordEmpty) {
          updateData.password = password;
        }
      }

      const res = await updateUser(updateData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully!");
      setImageFile(null);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex min-h-screen flex-col font-ubuntu md:flex-row">
      <div className="w-full md:w-2/5">
        <div className="mx-auto flex h-full flex-col items-center justify-center rounded-b-3xl bg-primary/10 px-2 py-8 md:rounded-b-none md:rounded-e-3xl lg:py-0">
          <div className="relative mb-4">
            <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <AiOutlineUser className="h-full w-full text-secondary/20" />
              )}
            </div>
            <button
              type="button"
              onClick={handleProfileImageClick}
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white transition-colors hover:bg-secondary/90"
              aria-label="Change profile picture"
            >
              <AiOutlineCamera className="h-4 w-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          <div className="w-full rounded-lg sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <form onSubmit={handleUpdateProfile}>
                <InputField
                  type="text"
                  fieldName="name"
                  placeholder="Enter your name"
                  label="Name"
                  icon={AiOutlineUser}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="Name"
                  disabled={isGoogleUser}
                />
                <InputField
                  type="email"
                  fieldName="email"
                  placeholder="Enter your email"
                  label="Email"
                  icon={AiOutlineMail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="Email"
                  disabled
                />
                {!isGoogleUser && (
                  <>
                    <InputField
                      type={showPassword ? "text" : "password"}
                      fieldName="password"
                      placeholder="••••••••"
                      label="Password"
                      icon={AiOutlineLock}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                    <InputField
                      type={showConfirmPassword ? "text" : "password"}
                      fieldName="confirmPassword"
                      placeholder="••••••••"
                      label="Confirm Password"
                      icon={AiOutlineLock}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      showPassword={showConfirmPassword}
                      setShowPassword={setShowConfirmPassword}
                    />
                  </>
                )}

                <div className="pt-4">
                  <Button
                    className="mb-2 w-full text-sm font-medium"
                    type="submit"
                    disabled={isUpdating || isUploading}
                    ariaLabel="Update Profile"
                  >
                    {isUpdating || isUploading ? (
                      <>
                        <ButtonSpinner />
                        <span>Updating...</span>
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-secondary md:w-3/5">
        <OrderHistory />
      </div>
    </div>
  );
};

export default ProfilePage;
