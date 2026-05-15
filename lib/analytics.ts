"use client";

import { sendGAEvent } from "@next/third-parties/google";

type EventValue = string | number | boolean | undefined;
type EventParameters = Record<string, EventValue>;

const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);

function sendEvent(eventName: string, parameters: EventParameters = {}) {
  if (!analyticsEnabled) {
    return;
  }

  try {
    sendGAEvent("event", eventName, parameters);
  } catch {
    // Analytics should never interrupt navigation or user actions.
  }
}

export function trackContactClick(location = "unknown", label = "contact") {
  sendEvent("contact_click", { location, label });
}

export function trackWhatsAppClick(location = "unknown", label = "whatsapp") {
  sendEvent("whatsapp_click", { location, label });
}

export function trackEmailClick(location = "unknown", label = "email") {
  sendEvent("email_click", { location, label });
}

export function trackProjectView(projectTitle: string, location = "unknown") {
  sendEvent("project_view", {
    location,
    label: projectTitle,
    project_title: projectTitle,
  });
}

export function trackProjectVisit(projectTitle: string, url: string, location = "project_detail") {
  sendEvent("project_visit", {
    location,
    label: projectTitle,
    project_title: projectTitle,
    url,
  });
}

export function trackBlogView(postTitle: string, location = "unknown") {
  sendEvent("blog_view", {
    location,
    label: postTitle,
    post_title: postTitle,
  });
}

export function trackExternalLinkClick(label: string, url: string, location = "unknown") {
  sendEvent("external_link_click", {
    location,
    label,
    url,
  });
}

export function trackResumeDownload(location = "unknown", label = "resume") {
  sendEvent("resume_download", { location, label });
}
