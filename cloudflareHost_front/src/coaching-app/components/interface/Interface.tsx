export type Course = {
  id: number;
  title: string;
  price: string;
  icon: string;
  color: string;
  description: string;
};

export interface OrderCourse {
  title: string;
  price: string;
};

export interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  courseTitle: string;
  coursePrice: string;
};
export interface OfferApiCombined {
  id: number;
  title?: string;
  title_ka?: string;
  title_en?: string;
  description?: string;
  description_ka?: string;
  description_en?: string;
  programDuration?: string;
  programDuration_ka?: string;
  programDuration_en?: string;
  totalHours?: string;
  totalHours_ka?: string;
  totalHours_en?: string;
  benefit?: string;
  benefit_ka?: string;
  benefit_en?: string;
  activities?: string;
  activities_ka?: string;
  activities_en?: string;
  results?: string;
  results_ka?: string;
  results_en?: string;
  activitiesParsed?: string[];
  resultsParsed?: string[];
  price?: string;
  image_url?: string;
  created_at?: string;
  Program?:string,
  Program_en?: string,
  Program_ka?:string,
}

export interface OrderResult {
  success: boolean;
  isRateLimit?: boolean;
};

export interface Exercise {
  id: number;
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  pdf_url: string;
  created_at: string;
}

export interface PaidPdf {
  id: number;
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  includes_ka?: string;
  includes_en?: string;
  price: string;
}

export interface Feedback {
  id: number;
  title_ka: string;
  title_en: string;
  image_url: string;
  isRead: number;
  created_at: string;
}

export interface Video {
  id: number;
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  video_url: string;
  image_url: string;
  youtube_id?: string;
  youtube_embed?: string;
  created_at: string;
}


export interface Article {
  id: number;
  title_ka: string;
  title_en: string;
  MagazineName_ka: string;
  MagazineName_en: string;
  subtitle_ka: string;
  subtitle_en: string;
  description_ka: string;
  description_en: string;
  article_url: string;
  image_url: string;
  created_at: string;
}



export interface SocialMedia {
  id: number;
  platform: string;
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  link: string;
  image_url: string;
  created_at: string;
}

export interface MyEvent {
  id: number;
  title_ka: string;
  title_en: string;
  description_ka?: string;
  description_en?: string;
  event_date: string;
  event_time: string;
  timezone: string;
  utcOffset: number;
  eventUtc: string;
  reminderMinutes: number;
  meeting_type: "online" | "offline";
  meeting_link?: string;
  platform?: string;
  city?: string;
  address?: string;
  notified: number;
  status: "upcoming" | "past";
  created_at: string;
}

export interface PartnerEvent {
  id: number;
  title_ka: string;
  title_en: string;
  description_ka?: string;
  description_en?: string;
  event_date: string;
  event_time: string;
  timezone: string;
  utcOffset: number;
  eventUtc: string;
  reminderMinutes: number;
  meeting_type: "online" | "offline";
  meeting_link?: string;
  platform?: string;
  notified: number;
  status: "upcoming" | "past";
  created_at: string;
}




export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  role: string;
  created_at?: string;
}

export interface AuthResponse {
  success: boolean;
  accessToken: string;
}


export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailInput {
  email: string;
  otp: string;
}

export interface ResendOtpInput {
  email: string;
}


export interface LoginInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface VerifyResetCodeInput {
  email: string;
  code: string;
}

export interface ResetPasswordInput {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}


export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
}


export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface MeResponse {
  success: boolean;
  user: User;
}
