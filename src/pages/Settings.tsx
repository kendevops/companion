import React, { useState } from "react";
import {
  //   User,
  Shield,
  CreditCard,
  //   Mail,
  //   Phone,
  //   Key,
  UserCircle,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PhoneVerificationModal from "@/components/PhoneVerificationModal";

const AccountSettings = () => {
  const { user } = useAuthStore();

  // State for different modals
  const [isLegalNameModalOpen, setIsLegalNameModalOpen] = useState(false);
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isEmergencyContactModalOpen, setIsEmergencyContactModalOpen] =
    useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPhoneVerificationModalOpen, setIsPhoneVerificationModalOpen] =
    useState(false);

  // State for form values
  const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.name?.split(" ")[1] || "");
  const [username, setUsername] = useState(user?.username || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("NG (+234)");
  const [phoneVerified, setPhoneVerified] = useState(false);

  // Emergency contact state
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactRelationship, setEmergencyContactRelationship] =
    useState("");
  const [emergencyContactEmail, setEmergencyContactEmail] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [emergencyContactCountryCode, setEmergencyContactCountryCode] =
    useState("NG (+234)");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle legal name update
  const handleLegalNameUpdate = () => {
    // In a real app, you would call an API here
    console.log("Updating legal name:", { firstName, lastName });
    setIsLegalNameModalOpen(false);
  };

  // Handle username update
  const handleUsernameUpdate = () => {
    // In a real app, you would call an API here
    console.log("Updating username:", username);
    setIsUsernameModalOpen(false);
  };

  // Handle phone number update
  const handlePhoneUpdate = () => {
    // Validate phone number
    if (!phoneNumber.trim()) {
      {
        /* Phone Verification Modal */
      }
      <PhoneVerificationModal
        isOpen={isPhoneVerificationModalOpen}
        onClose={() => setIsPhoneVerificationModalOpen(false)}
        onVerify={handlePhoneVerificationSuccess}
        phoneNumber={phoneNumber}
        countryCode={countryCode}
      />;
      alert("Please enter a valid phone number");
      return;
    }

    // In a real app, you would call an API to send a verification code
    console.log("Sending verification code to:", countryCode, phoneNumber);

    // Close phone modal and open verification modal
    setIsPhoneModalOpen(false);
    setIsPhoneVerificationModalOpen(true);
  };

  // Handle phone verification success
  const handlePhoneVerificationSuccess = () => {
    // In a real app, you would update the user's phone number in the database
    console.log("Phone verified successfully:", countryCode, phoneNumber);

    // Set phone as verified and close verification modal
    setPhoneVerified(true);
    setIsPhoneVerificationModalOpen(false);
  };

  // Handle emergency contact update
  const handleEmergencyContactUpdate = () => {
    // In a real app, you would call an API here
    console.log("Updating emergency contact:", {
      name: emergencyContactName,
      relationship: emergencyContactRelationship,
      email: emergencyContactEmail,
      phone: emergencyContactPhone,
      countryCode: emergencyContactCountryCode,
    });
    setIsEmergencyContactModalOpen(false);
  };

  // Handle password update
  const handlePasswordUpdate = () => {
    // Validate passwords
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // In a real app, you would call an API here
    console.log("Updating password");
    setIsPasswordModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-4">Account</h1>
      <p className="text-muted-foreground mb-8">
        {user?.name}, {user?.email}
      </p>

      <div className="space-y-8">
        {/* Personal Info Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
              <UserCircle className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Personal info</h2>
              <p className="text-muted-foreground">
                Provide personal details and how we can reach you
              </p>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Legal Name */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium">Legal name</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLegalNameModalOpen(true)}
              >
                Edit
              </Button>
            </div>
            <p className="text-muted-foreground">
              {user?.name || "Bright Mba"}
            </p>
          </div>

          {/* Username */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium">Username</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsUsernameModalOpen(true)}
              >
                {username ? "Edit" : "Add"}
              </Button>
            </div>
            <p className="text-muted-foreground">{username || "brightmac"}</p>
          </div>

          {/* Email Address */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium">Email address</h3>
              <Button variant="ghost" size="sm" disabled>
                Edit
              </Button>
            </div>
            <p className="text-muted-foreground">
              {user?.email || "mba***ght@gmail.com"}
            </p>
          </div>

          {/* Phone Numbers */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium">Phone numbers</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPhoneModalOpen(true)}
              >
                {phoneVerified ? "Edit" : "Add"}
              </Button>
            </div>
            <p className="text-muted-foreground">
              {phoneVerified
                ? `${countryCode} ${phoneNumber}`
                : "Add a number so confirmed guests and Companion can get in touch."}
            </p>
          </div>

          {/* Emergency Contact */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium">Emergency contact</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEmergencyContactModalOpen(true)}
              >
                {emergencyContactName ? "Edit" : "Add"}
              </Button>
            </div>
            <p className="text-muted-foreground">
              {emergencyContactName ? emergencyContactName : "Not provided"}
            </p>
          </div>
        </div>

        {/* Login & Security */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
              <Shield className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Login & security</h2>
              <p className="text-muted-foreground">
                Update your password and secure your account
              </p>
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium">Password</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Update
              </Button>
            </div>
            <p className="text-muted-foreground">Last updated 1 year ago</p>
          </div>
        </div>

        {/* Payment & Payouts */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
              <CreditCard className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Payment & payouts</h2>
              <p className="text-muted-foreground">
                Review payments, payouts, coupons, and gift cards
              </p>
            </div>
          </div>

          <Separator className="mb-6" />

          <p className="text-muted-foreground">
            Manage your payment methods and payout preferences.
          </p>
          <Button variant="outline" className="mt-4">
            View payment details
          </Button>
        </div>
      </div>

      {/* Legal Name Modal */}
      <Dialog
        open={isLegalNameModalOpen}
        onOpenChange={setIsLegalNameModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Legal name</DialogTitle>
            <DialogDescription>
              Make sure this matches the name on your government ID.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name on ID</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Bright"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name on ID</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Mba"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsLegalNameModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleLegalNameUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Username Modal */}
      <Dialog open={isUsernameModalOpen} onOpenChange={setIsUsernameModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Username</DialogTitle>
            <DialogDescription>
              This is how your first name will appear to everyone.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-4">
            <Label htmlFor="username">Preferred name</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="brightmac"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUsernameModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUsernameUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Phone Number Modal */}
      <Dialog open={isPhoneModalOpen} onOpenChange={setIsPhoneModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Phone number</DialogTitle>
            <DialogDescription>
              Add a number so confirmed guests and Companion can get in touch.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="country-code">Country/Region</Label>
              <Select defaultValue={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NG (+234)">Nigeria (+234)</SelectItem>
                  <SelectItem value="US (+1)">United States (+1)</SelectItem>
                  <SelectItem value="UK (+44)">United Kingdom (+44)</SelectItem>
                  <SelectItem value="CA (+1)">Canada (+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="phone-number">Phone number</Label>
              <Input
                id="phone-number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="808 123 4567"
              />
            </div>

            <p className="text-sm text-muted-foreground">
              We'll send you a code to verify your number. Standard message and
              data rates apply.
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPhoneModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handlePhoneUpdate}>Verify</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Emergency Contact Modal */}
      <Dialog
        open={isEmergencyContactModalOpen}
        onOpenChange={setIsEmergencyContactModalOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Emergency contact</DialogTitle>
            <DialogDescription>
              A trusted contact we can alert in an urgent situation.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="emergency-name">Full name</Label>
              <Input
                id="emergency-name"
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
                placeholder="Enter their full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency-relationship">Relationship</Label>
              <Input
                id="emergency-relationship"
                value={emergencyContactRelationship}
                onChange={(e) =>
                  setEmergencyContactRelationship(e.target.value)
                }
                placeholder="Enter their relationship to you"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency-email">Email</Label>
              <Input
                id="emergency-email"
                type="email"
                value={emergencyContactEmail}
                onChange={(e) => setEmergencyContactEmail(e.target.value)}
                placeholder="Enter their email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency-phone">Phone number</Label>
              <div className="flex space-x-2">
                <Select
                  defaultValue={emergencyContactCountryCode}
                  onValueChange={setEmergencyContactCountryCode}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NG (+234)">NG (+234)</SelectItem>
                    <SelectItem value="US (+1)">US (+1)</SelectItem>
                    <SelectItem value="UK (+44)">UK (+44)</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="emergency-phone"
                  value={emergencyContactPhone}
                  onChange={(e) => setEmergencyContactPhone(e.target.value)}
                  placeholder="Phone number"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEmergencyContactModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEmergencyContactUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Password Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create new password</DialogTitle>
            <DialogDescription>
              Create new password secure your account
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsPasswordModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handlePasswordUpdate}>Save Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountSettings;
