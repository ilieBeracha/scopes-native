import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2a2a2a", "#1a1a1a", "#0f0f0f"]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.profileCircle}>
              <LinearGradient
                colors={["#ff6b4a", "#ff8866"]}
                style={styles.profileGradient}
              >
                <View style={styles.scopeIcon}>
                  <View style={styles.scopeDot} />
                  <View style={styles.scopeCrosshair} />
                  <View style={styles.scopeCrosshairH} />
                </View>
              </LinearGradient>
            </View>
            <Text style={styles.greeting}>Welcome to Scopes</Text>
            <Text style={styles.tagline}>Focus • Target • Connect</Text>
          </View>

          <View style={styles.centerContent}>
            <View style={styles.scopeCard}>
              <LinearGradient
                colors={["#3a3a3a", "#2a2a2a"]}
                style={styles.cardGradient}
              >
                <View style={styles.scopeVisual}>
                  <View style={styles.scopeRing}>
                    <View style={styles.scopeInner}>
                      <Text style={styles.scopeValue}>98</Text>
                      <Text style={styles.scopeUnit}>%</Text>
                    </View>
                    <View style={styles.progressRing}>
                      <View style={styles.progressFill} />
                    </View>
                  </View>
                  <Text style={styles.scopeMainLabel}>Targeting Accuracy</Text>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <View style={styles.statRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>2.4K</Text>
                    <Text style={styles.statLabel}>Active Users</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>89%</Text>
                    <Text style={styles.statLabel}>Avg. Accuracy</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>156</Text>
                    <Text style={styles.statLabel}>Targets Hit</Text>
                  </View>
                </View>
                <View style={styles.statIndicator} />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push("/login")}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={["#ff6b4a", "#ff8866"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.primaryButtonText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
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
    paddingHorizontal: 25,
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "flex-start",
  },
  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 20,
    overflow: "hidden",
  },
  profileGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scopeIcon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  scopeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ffffff",
    position: "absolute",
  },
  scopeCrosshair: {
    width: 20,
    height: 1,
    backgroundColor: "#ffffff",
    position: "absolute",
  },
  scopeCrosshairH: {
    width: 1,
    height: 20,
    backgroundColor: "#ffffff",
    position: "absolute",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "300",
    color: "#ffffff",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif-light",
  },
  tagline: {
    fontSize: 14,
    color: "#ff6b4a",
    fontWeight: "500",
    letterSpacing: 1,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scopeCard: {
    width: "100%",
    height: 280,
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 20,
  },
  cardGradient: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  scopeVisual: {
    alignItems: "center",
  },
  scopeRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 30,
  },
  scopeInner: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  scopeValue: {
    fontSize: 64,
    fontWeight: "200",
    color: "#ffffff",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif-thin",
  },
  scopeUnit: {
    fontSize: 32,
    fontWeight: "300",
    color: "rgba(255,255,255,0.6)",
    marginTop: 10,
  },
  progressRing: {
    position: "absolute",
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 83,
    borderWidth: 3,
    borderColor: "transparent",
    borderTopColor: "#ff6b4a",
    borderRightColor: "#ff6b4a",
    transform: [{ rotate: "-45deg" }],
  },
  progressFill: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "50%",
    height: "50%",
  },
  scopeControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  controlButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  controlButtonActive: {
    backgroundColor: "#ff6b4a",
  },
  controlMinus: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "300",
  },
  controlPlus: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "300",
  },
  scopeMainLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    marginTop: 20,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  statsContainer: {
    width: "100%",
    marginTop: 20,
  },
  statCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statIndicator: {
    width: 80,
    height: 3,
    backgroundColor: "#ff6b4a",
    borderRadius: 2,
  },
  buttonContainer: {
    alignItems: "center",
    gap: 20,
  },
  primaryButton: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
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
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },

  dotButton: {
    padding: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff6b4a",
  },
  dotInactive: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
});
