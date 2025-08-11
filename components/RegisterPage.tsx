import { useAuthStore } from "@/store/auth";
import { RegisterUserData } from "@/types/service/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useStore } from "zustand";
import { Toast } from "./Toast";
import { useToast } from "@/hooks/useToast";

export function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toastVisible, toastConfig, showToast, hideToast } = useToast();

  const { registerProfile } = useStore(useAuthStore);

  const handleRegister = async () => {
    if (!firstName.trim()) {
      showToast({
        message: "Please enter your first name",
        type: "error",
      });
      return;
    }
    if (!lastName.trim()) {
      showToast({
        message: "Please enter your last name",
        type: "error",
      });
      return;
    }
    if (!email.trim()) {
      showToast({
        message: "Please enter your email",
        type: "error",
      });
      return;
    }
    if (!password || password.length < 6) {
      showToast({
        message: "Password must be at least 6 characters",
        type: "error",
      });
      return;
    }

    try {
      const user: RegisterUserData = {
        email: email.trim(),
        password,
        avatar_url: "",
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        mfa_enabled: false,
      };

      await registerProfile(user);
      showToast({
        message: "Account created successfully!",
        type: "success",
        duration: 2000,
      });
      setTimeout(() => {
        router.replace("/(protected)/home");
      }, 500);
    } catch (error: any) {
      console.error("Registration error:", error);
      
      let errorMessage = "Failed to create account";
      
      if (error?.message?.includes("already registered")) {
        errorMessage = "This email is already registered";
      } else if (error?.message?.includes("Invalid email")) {
        errorMessage = "Please enter a valid email address";
      } else if (error?.message?.includes("Password")) {
        errorMessage = "Password is too weak";
      } else if (error?.message?.includes("Network")) {
        errorMessage = "Network error. Check your connection";
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      showToast({
        message: errorMessage,
        type: "error",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Toast
        visible={toastVisible}
        message={toastConfig.message}
        type={toastConfig.type}
        duration={toastConfig.duration}
        onHide={hideToast}
      />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Text style={styles.backText}>←</Text>
              </TouchableOpacity>

              <View style={styles.header}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>
                  Sign up to get started with your account
                </Text>
              </View>

              <View style={styles.form}>
                <View style={styles.inputRow}>
                  <View style={[styles.inputContainer, styles.halfInput]}>
                    <TextInput
                      style={styles.input}
                      placeholder="First name"
                      placeholderTextColor="#666666"
                      value={firstName}
                      onChangeText={setFirstName}
                      autoCorrect={false}
                    />
                  </View>
                  <View style={[styles.inputContainer, styles.halfInput]}>
                    <TextInput
                      style={styles.input}
                      placeholder="Last name"
                      placeholderTextColor="#666666"
                      value={lastName}
                      onChangeText={setLastName}
                      autoCorrect={false}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email address"
                    placeholderTextColor="#666666"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#666666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleRegister}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#ff6b4a", "#ff8866"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialButtons}>
                  <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                    <View style={styles.socialIcon}>
                      <Text style={styles.googleIcon}>G</Text>
                    </View>
                    <Text style={styles.socialText}>Continue with Google</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                    <View style={[styles.socialIcon, styles.appleIcon]}>
                      <Text style={styles.appleIconText}></Text>
                    </View>
                    <Text style={styles.socialText}>Continue with Apple</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.terms}>
                  By signing up, you agree to our{" "}
                  <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text style={styles.footerLink}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: "100%",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginBottom: 24,
  },
  backText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "300",
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#888888",
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  inputContainer: {
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
    marginBottom: 0,
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: "#ffffff",
  },
  button: {
    height: 54,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 8,
    marginBottom: 24,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  dividerText: {
    color: "#666666",
    fontSize: 14,
    marginHorizontal: 16,
  },
  socialButtons: {
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  appleIcon: {
    backgroundColor: "#ffffff",
    borderRadius: 3,
  },
  appleIconText: {
    fontSize: 16,
    color: "#000000",
  },
  socialText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
  },
  terms: {
    textAlign: "center",
    fontSize: 13,
    color: "#666666",
    lineHeight: 18,
    marginBottom: 32,
  },
  termsLink: {
    color: "#888888",
    textDecorationLine: "underline",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
  },
  footerText: {
    color: "#888888",
    fontSize: 15,
  },
  footerLink: {
    color: "#ff6b4a",
    fontSize: 15,
    fontWeight: "600",
  },
});