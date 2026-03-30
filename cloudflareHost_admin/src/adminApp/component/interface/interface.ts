export interface HeaderNavTupe {
  name: string
  url: string
}


export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "file" | "textarea";
  required?: boolean;
  placeholder?: string;
}

export interface IndividualeOfferType {
  id?: number;
  title?: string;
  description?: string;
  price?: string | number;
  programDuration?: string;
  totalHours?: string;
  image_url?: string;
  created_at?: string;
}

export interface CompanyOfferType {
  id?: number;
  title: string;                 
  price: string | number;        
  programDuration: string;       
  totalHours: string;           
  description?: string;          
  activities: string[];          
  image?: File | string;         
  image_url?: string;            
  created_at?: string;         
}

export interface CompanyOfferApi {
  id?: number;
  title: string;
  price: string | number;
  programDuration: string;
  totalHours: string;
  description?: string;
  activities: string;       
  image_url?: string;
  created_at?: string;
}


export interface OfferApi {
  id?: number;
  title: string;
  price: string | number;
  programDuration: string;
  totalHours: string;
  description?: string;
  activities: string;        
  image?: File | string;     
  image_url?: string;        
  created_at?: string;
}


export interface OfferApiCombined {
  id?: number;
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
  activities?: string;
  activities_ka?: string;
  activities_en?: string;
  results?: string;
  price?: string;
  image_url?: string; 
  Program?:string,
  Program_en?: string,
  Program_ka?:string,
  benefit?: string;
  benefit_ka?: string;
  benefit_en?: string;
}

export interface OrderData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  courseTitle: string;
  coursePrice: string;
  createdAt: string;
}

export interface Event {
  id?: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  reminderMinutes?: string; 
  notified?: boolean;
  eventUtc?: string; 
  displayText?: string;
  timezone: string; 
  notificationType?: "reminder" | "start";
}

export interface Exercise {
  id: number;
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  pdf_url?: string;
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

export interface ArticleProp {
  id: number
  name: string
  cover: string
  title: string
  subtitle: string
  date: string
  price: string
  description_ka: string
  link: string
  barcode: string
}



export interface SocialMedia {
  id: number;
  platform: string;
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  platform_name_ka: string;
  platform_name_en: string;
  link: string;
  image_url: string;
  created_at: string;
}



export interface Feedback {
  id: number;
  image_url: string;
  created_at: string;
}


export interface PaidPdf {
  id: number;
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  includes_ka: string;
  includes_en: string;
  price: string;
  code?: string; 
}

export interface FredPdf {
  id: number;
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string; 
  pdf_url: string;
}


export interface DownloadsPdf {
  id: number;
  pdf_title: string;
  firstName: string;
  lastName: string;
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


// hooks/events/types.ts

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

export interface MyEventPayload {
  title_ka: string;
  title_en: string;
  description_ka?: string;
  description_en?: string;
  event_date: string;
  event_time: string;
  timezone: string;
  utcOffset: number;
  reminderMinutes: number;
  meeting_type: "online" | "offline";
  meeting_link?: string;
  platform?: string;
  city?: string;
  address?: string;
}

export interface PartnerEventPayload {
  title_ka: string;
  title_en: string;
  description_ka?: string;
  description_en?: string;
  event_date: string;
  event_time: string;
  timezone: string;
  utcOffset: number;
  reminderMinutes: number;
  meeting_type: "online" | "offline";
  meeting_link?: string;
  platform?: string;
}

export interface ScheduledPostPayload {
  title_ka: string;
  title_en: string;
  content_ka?: string;
  content_en?: string;
  icon?: string;
  publish_date: string;
  publish_time: string;
  timezone: string;
  utcOffset?: number;
}



