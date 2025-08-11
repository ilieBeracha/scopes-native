import { useToast } from "@/hooks/useToast";
import { authService } from "@/service/auth";
import { useAuthStore } from "@/store/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
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

const { height, width } = Dimensions.get("window");

type AuthState = "initial" | "email" | "password" | "register";

export function UnifiedAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>("initial");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const { toastVisible, toastConfig, showToast, hideToast } = useToast();
  const { loginProfile, registerProfile } = useStore(useAuthStore);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scopeRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous scope rotation
    Animated.loop(
      Animated.timing(scopeRotation, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const animateTransition = (callback: () => void) => {
    callback();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleEmailContinue = async () => {
    if (!email.trim()) {
      showToast({ message: "Please enter your email", type: "error" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      showToast({ message: "Please enter a valid email", type: "error" });
      return;
    }

    setIsChecking(true);
    try {
      const exists = await authService.checkEmailExists(email.trim());
      console.log("Email exists:", exists);
      setIsNewUser(!exists);
      animateTransition(() => {
        setAuthState("password");
      });
    } catch (error) {
      console.error("Error checking email:", error);
      // If check fails, default to login mode
      setIsNewUser(false);
      animateTransition(() => {
        setAuthState("password");
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleLogin = async () => {
    if (!password) {
      showToast({ message: "Please enter your password", type: "error" });
      return;
    }

    try {
      await loginProfile({ email: email.trim(), password });
      showToast({ message: "Welcome back!", type: "success", duration: 1500 });
      setTimeout(() => router.replace("/(protected)/home"), 500);
    } catch (error: any) {
      let errorMessage = "Failed to sign in";
      if (error?.message?.includes("Invalid login credentials")) {
        errorMessage = "Incorrect password";
      }
      showToast({ message: errorMessage, type: "error" });
    }
  };

  const handleRegister = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      showToast({ message: "Please enter your full name", type: "error" });
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
      await registerProfile({
        email: email.trim(),
        password,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        avatar_url: "",
        mfa_enabled: false,
      });
      showToast({
        message: "Account created!",
        type: "success",
        duration: 1500,
      });
      setTimeout(() => router.replace("/(protected)/home"), 500);
    } catch (error: any) {
      showToast({
        message: error?.message || "Failed to create account",
        type: "error",
      });
    }
  };

  const spin = scopeRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const renderInitial = () => (
    <Animated.View style={[styles.centerContent, { opacity: fadeAnim }]}>
      <Animated.View
        style={[styles.scopeContainer, { transform: [{ rotate: spin }] }]}
      >
        <View style={styles.scopeOuter}>
          <View style={styles.scopeInner}>
            <View style={styles.crosshairVertical} />
            <View style={styles.crosshairHorizontal} />
            <View style={styles.centerPoint} />
          </View>
        </View>
      </Animated.View>

      <View style={styles.brandContainer}>
        <Text style={styles.brandWord1}>SCOPE</Text>
        <Text style={styles.brandWord2}>STATS</Text>
      </View>

      <Text style={styles.tagline}>Analytics Refined</Text>

      <View style={styles.authOptions}>
        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => animateTransition(() => setAuthState("email"))}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#ff6b4a", "#ff8866"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.emailButtonGradient}
          >
            <Text style={styles.emailButtonText}>Continue with Email</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Text style={styles.socialIcon}>G</Text>
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Text style={styles.socialIcon}></Text>
            <Text style={styles.socialText}>Apple</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );

  const renderEmailInput = () => (
    <Animated.View style={[styles.formContent, { opacity: fadeAnim }]}>
      <TouchableOpacity
        style={styles.backButtonTop}
        onPress={() => animateTransition(() => setAuthState("initial"))}
      >
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <View style={styles.miniScope}>
        <View style={styles.miniScopeInner}>
          <View style={styles.miniCrosshair} />
          <View style={[styles.miniCrosshair, styles.miniCrosshairH]} />
        </View>
      </View>

      <Text style={styles.formTitle}>What's your email?</Text>
      <Text style={styles.formSubtitle}>
        We'll check if you have an account
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="rgba(255,255,255,0.5)"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
          autoFocus
        />
      </View>

      <TouchableOpacity
        style={[styles.continueButton, isChecking && styles.buttonDisabled]}
        onPress={handleEmailContinue}
        activeOpacity={0.8}
        disabled={isChecking}
      >
        <LinearGradient
          colors={["#ff6b4a", "#ff8866"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.continueButtonGradient}
        >
          <Text style={styles.continueButtonText}>
            {isChecking ? "Checking..." : "Continue"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderPassword = () => (
    <Animated.View style={[styles.formContent, { opacity: fadeAnim }]}>
      <TouchableOpacity
        style={styles.backButtonTop}
        onPress={() => animateTransition(() => setAuthState("email"))}
      >
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <View style={styles.miniScope}>
        <View style={styles.miniScopeInner}>
          <View style={styles.miniCrosshair} />
          <View style={[styles.miniCrosshair, styles.miniCrosshairH]} />
        </View>
      </View>

      <Text style={styles.formTitle}>
        {isNewUser ? "Create Account" : "Welcome back!"}
      </Text>
      <Text style={styles.formSubtitle}>{email}</Text>
      {!isNewUser && (
        <Text style={styles.existingUserHint}>Great to see you again!</Text>
      )}

      {isNewUser && (
        <View style={styles.inputRow}>
          <View style={[styles.inputContainer, styles.halfInput]}>
            <TextInput
              style={styles.input}
              placeholder="First name"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={firstName}
              onChangeText={setFirstName}
              autoCorrect={false}
            />
          </View>
          <View style={[styles.inputContainer, styles.halfInput]}>
            <TextInput
              style={styles.input}
              placeholder="Last name"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={lastName}
              onChangeText={setLastName}
              autoCorrect={false}
            />
          </View>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={isNewUser ? "Create a password" : "Enter your password"}
          placeholderTextColor="rgba(255,255,255,0.5)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={!isNewUser}
        />
      </View>

      {!isNewUser && (
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.continueButton}
        onPress={isNewUser ? handleRegister : handleLogin}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#ff6b4a", "#ff8866"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.continueButtonGradient}
        >
          <Text style={styles.continueButtonText}>
            {isNewUser ? "Create Account" : "Sign In"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

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
            {authState === "initial" && renderInitial()}
            {authState === "email" && renderEmailInput()}
            {authState === "password" && renderPassword()}
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
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scopeContainer: {
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  scopeOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  scopeInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  crosshairVertical: {
    position: "absolute",
    width: 0.5,
    height: 80,
    backgroundColor: "rgba(255,107,74,0.3)",
  },
  crosshairHorizontal: {
    position: "absolute",
    width: 80,
    height: 0.5,
    backgroundColor: "rgba(255,107,74,0.3)",
  },
  centerPoint: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,107,74,0.8)",
  },
  brandContainer: {
    marginBottom: 20,
  },
  brandWord1: {
    fontSize: 36,
    fontWeight: "100",
    color: "#ffffff",
    letterSpacing: 8,
    textAlign: "center",
    marginBottom: -5,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif-thin",
  },
  brandWord2: {
    fontSize: 36,
    fontWeight: "100",
    color: "rgba(255,107,74,0.9)",
    letterSpacing: 8,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif-thin",
  },
  tagline: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 60,
    fontWeight: "200",
  },
  authOptions: {
    width: "100%",
  },
  emailButton: {
    height: 54,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  emailButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emailButtonText: {
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
    height: 0.5,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  dividerText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 12,
    marginHorizontal: 16,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  socialIcon: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    marginRight: 8,
  },
  socialText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    fontWeight: "500",
  },
  formContent: {
    flex: 1,
    width: "100%",
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginBottom: 32,
  },
  backButtonTop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    justifyContent: "center",
    zIndex: 10,
  },
  backText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "300",
  },
  miniScope: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "rgba(255,107,74,0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 40,
    alignSelf: "center",
  },
  miniScopeInner: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  miniCrosshair: {
    position: "absolute",
    width: 30,
    height: 0.5,
    backgroundColor: "rgba(255,107,74,0.5)",
  },
  miniCrosshairH: {
    width: 0.5,
    height: 30,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  formSubtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 32,
  },
  inputContainer: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
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
  continueButton: {
    height: 54,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 8,
  },
  continueButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
    marginTop: -8,
  },
  forgotPasswordText: {
    color: "rgba(255,107,74,0.8)",
    fontSize: 14,
    fontWeight: "500",
  },
  passwordHint: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    marginTop: -8,
    marginBottom: 24,
  },
  switchMode: {
    marginTop: 24,
    alignItems: "center",
  },
  switchModeText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
  },
  switchModeLink: {
    color: "rgba(255,107,74,0.9)",
    fontWeight: "600",
  },
  newUserHint: {
    fontSize: 13,
    color: "rgba(76, 217, 100, 0.8)",
    marginTop: -20,
    marginBottom: 24,
    textAlign: "center",
  },
  existingUserHint: {
    fontSize: 13,
    color: "rgba(255,107,74,0.6)",
    marginTop: -20,
    marginBottom: 24,
    textAlign: "center",
  },
});
