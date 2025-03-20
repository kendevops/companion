/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface PhoneVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  phoneNumber: string;
  countryCode: string;
}

const PhoneVerificationModal: React.FC<PhoneVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerify,
  phoneNumber,
  countryCode,
}) => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Focus the first input when modal opens
  useEffect(() => {
    if (isOpen && inputRefs[0].current) {
      setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle input change
  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;

    // Update the code
    const newCode = [...code];
    newCode[index] = value.slice(0, 1); // Only take the first digit
    setCode(newCode);

    // Auto focus next input if value is entered
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle key down for backspace
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        // If current input is empty and backspace is pressed, focus previous input
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  // Handle verify button click
  const handleVerify = () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== 4) {
      alert("Please enter the full 4-digit code");
      return;
    }

    // In a real app, you would verify the code with your API
    console.log("Verifying code:", verificationCode);

    // Call the onVerify callback
    onVerify();
  };

  // Handle resend code
  const handleResend = () => {
    // In a real app, you would call your API to resend the code
    console.log("Resending code to:", countryCode, phoneNumber);

    // Reset the input fields
    setCode(["", "", "", ""]);
    inputRefs[0].current?.focus();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-center">Confirm your number</DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <p className="text-center mb-6">
            We sent a 4 digit code to {countryCode} {phoneNumber}, enter code to
            verify your add phone number
          </p>

          <div className="flex justify-center space-x-2 mb-6">
            {[0, 1, 2, 3].map((index) => (
              <Input
                key={index}
                ref={inputRefs[index]}
                type="text"
                value={code[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-16 h-16 text-center text-2xl"
                maxLength={1}
              />
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="link"
              onClick={handleResend}
              className="p-0 h-auto text-sm"
            >
              Didn't get a code? Click to resend.
            </Button>
          </div>
        </div>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleVerify} className="flex-1">
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneVerificationModal;
