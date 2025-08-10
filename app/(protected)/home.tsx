import { ProfileMenu } from "@/components/ProfileMenu";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.title}>Dashboard</Text>
          </View>
          <ProfileMenu />
        </View>

        <View style={styles.statsGrid}>
          <LinearGradient
            colors={["rgba(255,107,74,0.15)", "rgba(255,107,74,0.05)"]}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.statIconContainer}>
              <View style={styles.statIcon}>
                <View style={styles.statIconBar1} />
                <View style={styles.statIconBar2} />
                <View style={styles.statIconBar3} />
              </View>
            </View>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Active</Text>
          </LinearGradient>

          <LinearGradient
            colors={["rgba(255,255,255,0.05)", "rgba(255,255,255,0.02)"]}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.statIconContainer}>
              <View style={styles.checkmark}>
                <View style={styles.checkmarkStem} />
                <View style={styles.checkmarkKick} />
              </View>
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Done</Text>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
            <LinearGradient
              colors={["rgba(255,255,255,0.02)", "rgba(255,255,255,0)"]}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.actionIcon}>
                <View style={styles.chartIcon}>
                  <View style={[styles.chartBar, styles.chartBar1]} />
                  <View style={[styles.chartBar, styles.chartBar2]} />
                  <View style={[styles.chartBar, styles.chartBar3]} />
                </View>
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Analytics</Text>
                <Text style={styles.actionDescription}>
                  Performance metrics
                </Text>
              </View>
              <Text style={styles.actionArrow}>→</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
            <LinearGradient
              colors={["rgba(255,255,255,0.02)", "rgba(255,255,255,0)"]}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.actionIcon}>
                <View style={styles.taskIcon}>
                  <View style={styles.taskLine} />
                  <View style={styles.taskLine} />
                  <View style={styles.taskLine} />
                </View>
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Tasks</Text>
                <Text style={styles.actionDescription}>Manage workflow</Text>
              </View>
              <Text style={styles.actionArrow}>→</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
            <LinearGradient
              colors={["rgba(255,255,255,0.02)", "rgba(255,255,255,0)"]}
              style={styles.actionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.actionIcon}>
                <View style={styles.settingsIconMin}>
                  <View style={styles.settingsDot} />
                  <View style={[styles.settingsDot, styles.settingsDot2]} />
                  <View style={[styles.settingsDot, styles.settingsDot3]} />
                </View>
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Settings</Text>
                <Text style={styles.actionDescription}>Preferences</Text>
              </View>
              <Text style={styles.actionArrow}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity</Text>

          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityIndicator}>
                <View style={styles.activityDot} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Project completed</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.activityIndicator}>
                <View style={[styles.activityDot, styles.activityDotActive]} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>New task assigned</Text>
                <Text style={styles.activityTime}>5 hours ago</Text>
              </View>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.activityIndicator}>
                <View style={styles.activityDot} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Report generated</Text>
                <Text style={styles.activityTime}>Yesterday</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  greeting: {
    fontSize: 13,
    color: "rgba(255,107,74,0.7)",
    marginBottom: 6,
    letterSpacing: 0.3,
    fontWeight: "400",
  },
  title: {
    fontSize: 32,
    fontWeight: Platform.OS === "ios" ? "700" : "bold",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 36,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    height: 140,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  statIconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  statIcon: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 16,
    gap: 3,
  },
  statIconBar1: {
    width: 3,
    height: 8,
    backgroundColor: "rgba(255,107,74,0.9)",
    borderRadius: 1.5,
  },
  statIconBar2: {
    width: 3,
    height: 16,
    backgroundColor: "rgba(255,107,74,0.9)",
    borderRadius: 1.5,
  },
  statIconBar3: {
    width: 3,
    height: 12,
    backgroundColor: "rgba(255,107,74,0.9)",
    borderRadius: 1.5,
  },
  checkmark: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkStem: {
    position: "absolute",
    width: 2,
    height: 10,
    backgroundColor: "#ffffff",
    borderRadius: 1,
    transform: [{ rotate: "45deg" }],
    right: 5,
    top: 2,
  },
  checkmarkKick: {
    position: "absolute",
    width: 2,
    height: 5,
    backgroundColor: "#ffffff",
    borderRadius: 1,
    transform: [{ rotate: "-45deg" }],
    left: 5,
    bottom: 3,
  },
  statValue: {
    fontSize: 36,
    fontWeight: Platform.OS === "ios" ? "700" : "bold",
    color: "#ffffff",
    letterSpacing: -1,
  },
  statValueLight: {
    color: "#ffffff",
  },
  statLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 0.2,
    fontWeight: "400",
  },
  statLabelLight: {
    color: "rgba(255,255,255,0.6)",
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 36,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    color: "#ffffff",
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  actionCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.02)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  actionGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.03)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  chartIcon: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 18,
    gap: 3,
  },
  chartBar: {
    width: 3,
    backgroundColor: "rgba(255,107,74,0.7)",
    borderRadius: 1.5,
  },
  chartBar1: {
    height: 10,
  },
  chartBar2: {
    height: 18,
  },
  chartBar3: {
    height: 14,
  },
  taskIcon: {
    width: 18,
    height: 18,
    justifyContent: "space-around",
  },
  taskLine: {
    height: 2,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 1,
  },
  settingsIconMin: {
    width: 18,
    height: 18,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsDot: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  settingsDot2: {
    left: -7,
  },
  settingsDot3: {
    right: -7,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    color: "#ffffff",
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  actionDescription: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    letterSpacing: 0.1,
  },
  actionArrow: {
    fontSize: 18,
    color: "rgba(255,107,74,0.5)",
    fontWeight: "300",
  },
  activityCard: {
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
  },
  activityIndicator: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  activityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  activityDotActive: {
    backgroundColor: "rgba(255,107,74,0.9)",
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 2,
    letterSpacing: 0.1,
    fontWeight: "400",
  },
  activityTime: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: 0.1,
  },
});
