import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height, width } = Dimensions.get("window");

export function LandingPage() {
  const router = useRouter();
  const [fadeAnimation, setFadeAnimation] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeAnimation(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#0a0a0a", "#000000"]} style={styles.gradient}>
        <View style={[styles.content, { opacity: fadeAnimation }]}>
          <View style={styles.headerSection}>
            <Text style={styles.brandWord1}>SCOPE</Text>
            <Text style={styles.brandWord2}>STATS</Text>
          </View>

          <View style={styles.centerpiece}>
            <View style={styles.scopeContainer}>
              <View style={styles.scopeOuter}>
                <View style={styles.scopeInner}>
                  <View style={styles.crosshairVertical} />
                  <View style={styles.crosshairHorizontal} />
                  <View style={styles.centerPoint} />
                </View>
              </View>
              <View style={styles.orbitDot1} />
              <View style={styles.orbitDot2} />
              <View style={styles.orbitDot3} />
            </View>

            <View style={styles.statsPreview}>
              <View style={styles.statLine}>
                <View style={[styles.statBar, { width: "85%" }]} />
                <Text style={styles.statText}>85%</Text>
              </View>
              <View style={styles.statLine}>
                <View style={[styles.statBar, { width: "92%" }]} />
                <Text style={styles.statText}>92%</Text>
              </View>
              <View style={styles.statLine}>
                <View style={[styles.statBar, { width: "78%" }]} />
                <Text style={styles.statText}>78%</Text>
              </View>
            </View>
          </View>

          <View style={styles.bottomSection}>
            <Text style={styles.tagline}>Analytics Refined</Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push("/register")}
                activeOpacity={0.7}
              >
                <Text style={styles.primaryButtonText}>Start</Text>
              </TouchableOpacity>

              <View style={styles.dividerVertical} />

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push("/login")}
                activeOpacity={0.7}
              >
                <Text style={styles.secondaryButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: height * 0.12,
    paddingBottom: height * 0.08,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  brandWord1: {
    fontSize: 42,
    fontWeight: "100",
    color: "#ffffff",
    letterSpacing: 10,
    marginBottom: -5,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif-thin",
  },
  brandWord2: {
    fontSize: 42,
    fontWeight: "100",
    color: "rgba(255,107,74,0.9)",
    letterSpacing: 10,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif-thin",
  },
  centerpiece: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  scopeContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    position: "relative",
  },
  scopeOuter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  scopeInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  crosshairVertical: {
    position: "absolute",
    width: 0.5,
    height: 100,
    backgroundColor: "rgba(255,107,74,0.3)",
  },
  crosshairHorizontal: {
    position: "absolute",
    width: 100,
    height: 0.5,
    backgroundColor: "rgba(255,107,74,0.5)",
  },
  centerPoint: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,107,74,0.8)",
  },
  orbitDot1: {
    position: "absolute",
    top: 10,
    right: 30,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  orbitDot2: {
    position: "absolute",
    bottom: 20,
    left: 25,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  orbitDot3: {
    position: "absolute",
    top: 80,
    right: 5,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  statsPreview: {
    width: width - 80,
    paddingHorizontal: 20,
  },
  statLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statBar: {
    height: 1,
    backgroundColor: "rgba(255,107,74,0.8)",
    flex: 1,
    marginRight: 12,
  },
  statText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "300",
    width: 30,
    textAlign: "right",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif-light",
  },
  bottomSection: {
    alignItems: "center",
  },
  tagline: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 40,
    fontWeight: "200",
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    width: 200,
    justifyContent: "center",
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "rgba(255,107,74,0.9)",
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  dividerVertical: {
    width: 0.5,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginHorizontal: 20,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
