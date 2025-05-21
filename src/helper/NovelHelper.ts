import { Novels } from "@/type/novel.type";


const fetchNovel = async (link: string, limit?: number) => {
  // Check if the CMS endpoint is provided
  if (
    !process.env.NEXT_PUBLIC_CMS_URL ||
    process.env.NEXT_PUBLIC_CMS_URL.trim() === ""
  ) {
    console.error("Please Provide CMS URL");
    return; // Exit the function early
  }
  const endPoint = limit
    ? process.env.NEXT_PUBLIC_CMS_URL + link + `&_limit=${limit}`
    : process.env.NEXT_PUBLIC_CMS_URL + link;
  if (!endPoint) {
    console.log("Please Provide a valid CMS ");
  }
  const novel = await fetch(endPoint.toString()).then(
    (res) => res.json()
  );

  return novel;
};

const fetchNovelByName = async (name: string) => {
  if (
    !process.env.NEXT_PUBLIC_CMS_URL ||
    process.env.NEXT_PUBLIC_CMS_URL.trim() === ""
  ) {
    console.error("Please Provide CMS URL");
    return; // Exit the function early
  }
  const endPoint = process.env.NEXT_PUBLIC_CMS_URL + "/novels?title=" + name ;
  if (!endPoint) {
    console.log("Please Provide a valid CMS ");
  }
  const novel: Novels[] = await fetch(endPoint.toString()).then((res) => res.json());

  return novel;
};

const fetchEpisodeByNovel = async (
  episodeTitle: string,
  novelTitle: string
) => {
  if (
    !process.env.NEXT_PUBLIC_CMS_URL ||
    process.env.NEXT_PUBLIC_CMS_URL.trim() === ""
  ) {
    console.error("Please provide CMS URL!!");
    return; // Exit the function early
  }

  const endPoint = process.env.NEXT_PUBLIC_CMS_URL + "/novels";
  if (!endPoint) {
    console.log("Please provide a valid CMS URL");
    return; // Exit the function early
  }

  try {
    const novels: Novels[] = await fetch(endPoint.toString()).then(
      (res) => res.json()
    );

    // Find the novel with the specified title
    const selectedNovel = novels.find((novel) => novel.title === novelTitle);

    if (!selectedNovel) {
      console.log("Novel not found");
      return; // Novel not found
    }

    // Find the episode with the specified title within the found novel
    const selectedEpisode = selectedNovel.episodes.find(
      (ep) => ep.title === episodeTitle
    );
    console.log("selectedNovel", selectedNovel);

    if (!selectedEpisode) {
      console.log("Episode not found");
      return; // Episode not found
    }

    return selectedEpisode;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchNextPage = async (start: number, end: number) => {
  if (
    !process.env.NEXT_PUBLIC_CMS_URL ||
    process.env.NEXT_PUBLIC_CMS_URL.trim() === ""
  ) {
    console.error("Please provide CMS URL");
    return; // Exit the function early
  }

  const endPoint =
    process.env.NEXT_PUBLIC_CMS_URL +
    `/novels?_sort=published_at:ASC&_start=${start}&_limit=${end}`;

  try {
    const response = await fetch(endPoint.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const nextPage: Novels[] | undefined = await response.json();
    return nextPage;
  } catch (error) {
    console.error("Error fetching data");
    return undefined;
  }
};

export { fetchNovel, fetchNovelByName, fetchEpisodeByNovel, fetchNextPage };
