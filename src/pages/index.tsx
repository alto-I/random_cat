import { useState, useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";

type CatCategory = {
  id: number;
  name: string;
}

type SearchCatImage = {
  breeds: string[]
  categories: CatCategory[],
  id: string;
  url: string;
  width: number;
  height: number;
}

type SearchCatImageResponse = SearchCatImage[]

interface IndexPageProps {
  initialCatImageUrl: string;
}

const catImages: string[] = [
  "https://cdn2.thecatapi.com/images/bpc.jpg",
  "https://cdn2.thecatapi.com/images/eac.jpg",
  "https://cdn2.thecatapi.com/images/6qi.jpg",
];

const randomCatImage = () => {
  const index = Math.floor(Math.random() * catImages.length)
  return catImages[index];
}


const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch('https://api.thecatapi.com/v1/images/search')
  const result = (await res.json()) as SearchCatImageResponse
  return result[0]
}

const IndexPage: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);

  const handleClick = async () => {
    const image = await fetchCatImage()
    setCatImageUrl(image.url);
  };

  return (
    <div>
      <button onClick={handleClick}>今日のニャンコ</button>
      <div style={{ marginTop: 8 }}>
        <img src={catImageUrl} />
      </div>
    </div>
  )
};

export const GetServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const catImage = await fetchCatImage()
  return {
    props: {
      initialCatImageUrl: catImage.url
    }
  }
}

export default IndexPage;
