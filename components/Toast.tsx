import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";

interface ToastProps {
  visible: boolean;
  message: string;
  type?: "error" | "success" | "info";
  duration?: number;
  onHide?: () => void;
}

export function Toast({ 
  visible, 
  message, 
  type = "error", 
  duration = 3000,
  onHide 
}: ToastProps) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  };

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case "error":
        return (
          <View style={styles.iconContainer}>
            <View style={[styles.icon, styles.errorIcon]}>
              <Text style={styles.iconText}>!</Text>
            </View>
          </View>
        );
      case "success":
        return (
          <View style={styles.iconContainer}>
            <View style={[styles.icon, styles.successIcon]}>
              <Text style={styles.iconText}>✓</Text>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.iconContainer}>
            <View style={[styles.icon, styles.infoIcon]}>
              <Text style={styles.iconText}>i</Text>
            </View>
          </View>
        );
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <BlurView intensity={80} tint="dark" style={styles.blurView}>
        <View style={styles.content}>
          {getIcon()}
          <Text style={styles.message} numberOfLines={2}>
            {message}
          </Text>
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 20,
    right: 20,
    zIndex: 9999,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  blurView: {
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.1)",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(20,20,20,0.7)",
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  errorIcon: {
    backgroundColor: "rgba(255,59,48,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,59,48,0.3)",
  },
  successIcon: {
    backgroundColor: "rgba(52,199,89,0.2)",
    borderWidth: 1,
    borderColor: "rgba(52,199,89,0.3)",
  },
  infoIcon: {
    backgroundColor: "rgba(0,122,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(0,122,255,0.3)",
  },
  iconText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  message: {
    flex: 1,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.2,
    lineHeight: 20,
  },
});