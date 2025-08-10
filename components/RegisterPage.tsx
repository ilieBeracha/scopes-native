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
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useStore } from "zustand";

export function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [mfaEnabled, setMfaEnabled] = useState(false);

  const { registerProfile } = useStore(useAuthStore);

  const handleRegister = async () => {
    const user: RegisterUserData = {
      email,
      password,
      avatar_url: avatarUrl,
      first_name: firstName,
      last_name: lastName,
      mfa_enabled: mfaEnabled,
    };

    await registerProfile(user);
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0a0a0a", "#000000"]} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.content}>
                <View style={styles.scopeIcon}>
                  <LinearGradient
                    colors={["#ff6b4a", "#ff8866"]}
                    style={styles.iconGradient}
                  >
                    <View style={styles.scopeInner}>
                      <View style={styles.scopeDot} />
                      <View style={styles.scopeCrosshair} />
                      <View style={styles.scopeCrosshairH} />
                    </View>
                  </LinearGradient>
                </View>
                <View style={styles.header}>
                  <Text style={styles.title}>Create Account</Text>
                  <Text style={styles.subtitle}>Sign up to get started</Text>
                </View>

                <View style={styles.form}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="First Name"
                      placeholderTextColor="#636366"
                      value={firstName}
                      onChangeText={setFirstName}
                      autoCorrect={false}
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      placeholderTextColor="#636366"
                      value={lastName}
                      onChangeText={setLastName}
                      autoCorrect={false}
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#636366"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      autoCorrect={false}
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#636366"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>

                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Avatar URL (optional)"
                      placeholderTextColor="#636366"
                      value={avatarUrl}
                      onChangeText={setAvatarUrl}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>

                  <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>Enable MFA</Text>
                    <Switch
                      value={mfaEnabled}
                      onValueChange={setMfaEnabled}
                      thumbColor={mfaEnabled ? "#ff6b4a" : undefined}
                      trackColor={{ true: "#ff8866", false: "#767577" }}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegister}
                    activeOpacity={0.9}
                  >
                    <LinearGradient
                      colors={["#ff6b4a", "#ff8866"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.buttonGradient}
                    >
                      <Text style={styles.buttonText}>Sign Up</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <Text style={styles.terms}>
                    By signing up, you agree to our Terms & Privacy Policy
                  </Text>
                </View>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    Already have an account?{" "}
                  </Text>
                  <TouchableOpacity onPress={() => router.push("/login")}>
                    <Text style={styles.linkText}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scopeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 32,
    overflow: "hidden",
    alignSelf: "center",
  },
  iconGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scopeInner: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  scopeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ffffff",
    position: "absolute",
  },
  scopeCrosshair: {
    width: 26,
    height: 1.5,
    backgroundColor: "#ffffff",
    position: "absolute",
  },
  scopeCrosshairH: {
    width: 1.5,
    height: 26,
    backgroundColor: "#ffffff",
    position: "absolute",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 48,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "400",
  },
  form: {
    marginBottom: 32,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    fontSize: 17,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.2)",
    color: "#ffffff",
  },
  button: {
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    marginTop: 24,
    marginBottom: 16,
    shadowColor: "#ff6b4a",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  terms: {
    textAlign: "center",
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    marginTop: 8,
    lineHeight: 18,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  footerText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 15,
  },
  linkText: {
    color: "#ff6b4a",
    fontSize: 15,
    fontWeight: "500",
  },
  switchRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabel: {
    color: "#ffffff",
    fontSize: 16,
  },
});
