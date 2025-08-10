import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useStore } from "zustand";

export function ProfileMenu() {
  const router = useRouter();
  const { user } = useStore(useAuthStore);
  const [menuVisible, setMenuVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const openMenu = () => {
    setMenuVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 65,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMenuVisible(false);
    });
  };

  const handleLogout = async () => {
    closeMenu();
    await supabase.auth.signOut();
    router.replace("/");
  };

  const handleMenuOption = (action: string) => {
    closeMenu();
    switch (action) {
      case "profile":
        // Navigate to profile page
        break;
      case "settings":
        // Navigate to settings
        break;
      case "signout":
        handleLogout();
        break;
    }
  };

  const userInitial = user?.user_metadata?.first_name?.charAt(0) || 
                      user?.email?.charAt(0)?.toUpperCase() || 
                      "U";

  return (
    <>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={openMenu}
        activeOpacity={0.7}
      >
        <View style={styles.profileRing}>
          <Text style={styles.profileInitial}>{userInitial}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        transparent
        visible={menuVisible}
        animationType="none"
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
            <TouchableWithoutFeedback>
              <Animated.View 
                style={[
                  styles.dropdown,
                  {
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              >
                <View style={styles.dropdownHeader}>
                  <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{userInitial}</Text>
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>
                      {user?.user_metadata?.first_name || user?.email?.split('@')[0] || "User"}
                    </Text>
                    <Text style={styles.userEmail} numberOfLines={1}>
                      {user?.email}
                    </Text>
                  </View>
                </View>

                <View style={styles.menuSection}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleMenuOption("profile")}
                    activeOpacity={0.6}
                  >
                    <View style={styles.iconContainer}>
                      <View style={styles.profileIcon}>
                        <View style={styles.profileIconHead} />
                        <View style={styles.profileIconBody} />
                      </View>
                    </View>
                    <Text style={styles.menuText}>Profile</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleMenuOption("settings")}
                    activeOpacity={0.6}
                  >
                    <View style={styles.iconContainer}>
                      <View style={styles.settingsIcon}>
                        <View style={styles.settingsGear}>
                          <View style={styles.gearTooth} />
                          <View style={[styles.gearTooth, styles.gearTooth2]} />
                          <View style={[styles.gearTooth, styles.gearTooth3]} />
                          <View style={[styles.gearTooth, styles.gearTooth4]} />
                        </View>
                      </View>
                    </View>
                    <Text style={styles.menuText}>Settings</Text>
                  </TouchableOpacity>

                  <View style={styles.separator} />

                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleMenuOption("signout")}
                    activeOpacity={0.6}
                  >
                    <View style={styles.iconContainer}>
                      <View style={styles.logoutIcon}>
                        <View style={styles.logoutArrow} />
                        <View style={styles.logoutDoor} />
                      </View>
                    </View>
                    <Text style={[styles.menuText, styles.logoutText]}>Sign Out</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  profileButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  profileRing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitial: {
    fontSize: 14,
    fontWeight: "300",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 80,
    paddingRight: 20,
  },
  dropdown: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    minWidth: 240,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 15,
    overflow: "hidden",
  },
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  avatarContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  userEmail: {
    fontSize: 12,
    color: "rgba(0,0,0,0.5)",
    letterSpacing: 0.1,
  },
  menuSection: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 20,
    height: 20,
    marginRight: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  profileIcon: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  profileIconHead: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000000",
    marginBottom: 2,
  },
  profileIconBody: {
    width: 10,
    height: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "#000000",
  },
  settingsIcon: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsGear: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  gearTooth: {
    position: "absolute",
    width: 2,
    height: 4,
    backgroundColor: "#000000",
    top: -2,
  },
  gearTooth2: {
    transform: [{ rotate: "90deg" }],
    top: 5,
    left: -2,
  },
  gearTooth3: {
    transform: [{ rotate: "180deg" }],
    top: 12,
  },
  gearTooth4: {
    transform: [{ rotate: "270deg" }],
    top: 5,
    right: -2,
  },
  logoutIcon: {
    width: 16,
    height: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutArrow: {
    width: 8,
    height: 1.5,
    backgroundColor: "#000000",
    position: "absolute",
    left: 0,
  },
  logoutDoor: {
    width: 10,
    height: 14,
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 1,
    position: "absolute",
    right: 0,
  },
  menuText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "400",
    letterSpacing: 0.2,
  },
  logoutText: {
    color: "#000000",
    fontWeight: "400",
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
    marginHorizontal: 20,
    marginVertical: 4,
  },
});