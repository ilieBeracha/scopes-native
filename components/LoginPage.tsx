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

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginProfile } = useStore(useAuthStore);

  const handleLogin = async () => {
    try {
      await loginProfile({ email, password });
      router.replace("/(protected)/home");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0a0a0a", "#000000"]} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                <Text style={styles.title}>Welcome back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>
              </View>

              <View style={styles.form}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#636366"
                    value={email}
                    onChangeText={(e) => setEmail(e)}
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
                    onChangeText={(e) => setPassword(e)}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleLogin}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={["#ff6b4a", "#ff8866"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Sign In</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/register")}>
                  <Text style={styles.linkText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: "center",
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
  forgotPassword: {
    alignItems: "center",
    paddingVertical: 8,
  },
  forgotPasswordText: {
    color: "#ff6b4a",
    fontSize: 15,
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
});
