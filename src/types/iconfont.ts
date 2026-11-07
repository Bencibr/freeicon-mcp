export interface IconfontCookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: string;
}

export interface CookieStoreData {
  cookies: IconfontCookie[];
  ctoken: string;
  updatedAt: string;
}

export interface IconSearchResult {
  id: number;
  name: string;
  unicode: string;
  show_svg: string;
  width: number;
  height: number;
  font_class: string;
  fills: number;
  user_id: number;
  preview_image: string;
  svg_hash?: string;
  created_at?: string;
  updated_at?: string;
  // 以下为旧字段，新 API 可能不返回，保留为可选以维持兼容
  svg_path?: string;
  colors?: string[];
  designer?: string;
  designer_id?: number;
  description?: string;
  categories?: string[];
  tags?: string[];
}

export interface IconSearchResponse {
  code: number;
  data: {
    icons: IconSearchResult[];
    count: number;
    page: number;
    pageSize: number;
  };
  error_code?: string;
  message?: string;
}

export interface IconDetail {
  id: number;
  name: string;
  unicode: string;
  show_svg: string;
  svg_path: string;
  colors: string[];
  designer: string;
  designer_id: number;
  description: string;
  categories: string[];
  tags: string[];
  is_collected: boolean;
  collection_count: number;
  download_count: number;
}

export interface IconDetailResponse {
  code: number;
  data: {
    icon: IconDetail;
  };
  error_code?: string;
  message?: string;
}

export interface CollectionItem {
  id: number;
  name: string;
  description: string;
  icons_count: number;
  all_count?: number;
  create_user_id?: number;
  User?: { id: number; nickname: string; avatar?: string };
  is_official?: number;
  preview_image?: string;
  // 以下为旧字段，保留为可选以维持兼容
  cover?: string;
  icon_count?: number;
  designer?: string;
  designer_id?: number;
}

export interface CollectionSearchResponse {
  code: number;
  data: {
    lists: CollectionItem[];
    count?: number;
    total?: number;
    collections?: CollectionItem[]; // 旧字段
  };
  error_code?: string;
  message?: string;
}

export interface LoginInfoResponse {
  code: number;
  data: {
    isLogin: boolean;
    user: {
      id: number;
      nickname: string;
      avatar: string;
    } | null;
  };
  error_code?: string;
  message?: string;
}

export interface SymbolIcon {
  id: string;
  viewBox: string;
  paths: Array<{
    d: string;
    fill?: string;
  }>;
}

export interface SymbolParseResult {
  icons: SymbolIcon[];
  totalCount: number;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}
