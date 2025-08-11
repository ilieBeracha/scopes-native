import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/store/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useStore } from "zustand";
import { Toast } from "./Toast";

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toastVisible, toastConfig, showToast, hideToast } = useToast();

  const { loginProfile } = useStore(useAuthStore);

  const handleLogin = async () => {
    if (!email.trim()) {
      showToast({
        message: "Please enter your email",
        type: "error",
      });
      return;
    }
    if (!password) {
      showToast({
        message: "Please enter your password",
        type: "error",
      });
      return;
    }

    try {
      await loginProfile({ email: email.trim(), password });
      showToast({
        message: "Welcome back!",
        type: "success",
        duration: 1500,
      });
      setTimeout(() => {
        router.replace("/(protected)/home");
      }, 500);
    } catch (error: any) {
      console.error("Error logging in:", error);

      let errorMessage = "Failed to sign in";

      if (error?.message?.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password";
      } else if (error?.message?.includes("Email not confirmed")) {
        errorMessage = "Please verify your email first";
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
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Sign in to continue to your account
              </Text>
            </View>

            <View style={styles.form}>
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

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#ff6b4a", "#ff8866"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialButtons}>
                <TouchableOpacity
                  style={styles.socialButton}
                  activeOpacity={0.8}
                >
                  <View style={styles.socialIcon}>
                    <Text style={styles.googleIcon}>G</Text>
                  </View>
                  <Text style={styles.socialText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  activeOpacity={0.8}
                >
                  <View style={[styles.socialIcon, styles.appleIcon]}>
                    <Text style={styles.appleIconText}></Text>
                  </View>
                  <Text style={styles.socialText}>Continue with Apple</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.footerLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    justifyContent: "center",
    zIndex: 1,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 24,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  backText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "300",
  },
  header: {
    marginBottom: 40,
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
    marginBottom: 32,
  },
  inputContainer: {
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: "#ffffff",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#ff6b4a",
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    height: 54,
    borderRadius: 12,
    overflow: "hidden",
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
    paddingBottom: 40,
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
