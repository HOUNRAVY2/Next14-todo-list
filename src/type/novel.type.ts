type Categories = {
  id: number;
  category_id: string;
  title: string;
  published_at: string;
  created_at: string;
  updated_at: string;
};

type Episodes = {
  id: number;
  episode_id: string;
  title: string;
  content: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  episode_name: string | null | any;
  view: number |null |any ;
};

type Novels = {
  id: number;
  novel_id: string;
  title: string;
  description: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  category: Categories;
  episodes: Episodes[];
  
};

export type { Categories, Episodes, Novels };
